import express from 'express';
import cors from 'cors';
import foodRouter from '../routes/foodRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));

export default app;
