import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userModel = {
  findUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  findUserById: async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  updateUserCart: async (userId: string, cartData: Prisma.JsonValue) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { cartData },
    });
  },

  createUser: async (name: string, email: string, password: string) => {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        cartData: {}, // Usando el campo JSON por defecto
      },
    });
  },

  // Aquí podrías añadir más funciones relacionadas con el usuario en el futuro
};

export default userModel;

