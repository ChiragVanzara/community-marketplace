import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

config();

const app = express();
const ORIGIN = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Import routes
import userRoutes from './routes/user.routers.js';
import productsRoutes from './routes/products.routers.js';
import notificationRoutes from './routes/notification.routers.js'; 

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/notifications', notificationRoutes);

export { app };
