import { Request, Response } from 'express';
import userModel from '../models/userModel';

// add to user cart
const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId as string;
    const itemId = req.body.itemId as string;

    let userData = await userModel.findUserById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.updateUserCart(userId, cartData);
    res.json({ success: true, message: 'Added To Cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

// remove food from user cart
const removeFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId as string;
    const itemId = req.body.itemId as string;

    let userData = await userModel.findUserById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.updateUserCart(userId, cartData);
    res.json({ success: true, message: 'Removed From Cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

// get user cart
const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId as string;

    let userData = await userModel.findUserById(userId);
    if (!userData) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error' });
  }
};

export { addToCart, removeFromCart, getCart };
