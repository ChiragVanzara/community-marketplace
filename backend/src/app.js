import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

//Import routes
import userRoutes from './routes/user.routers.js';
import sellRoutes from './routes/sell.routers.js';

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sell', sellRoutes);

export { app };
