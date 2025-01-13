import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { ApiError } from "./utils/ApiError.js";

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

// Static files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Import routes
import userRoutes from "./routes/user.routers.js";
import productsRoutes from "./routes/products.routers.js";
import notificationRoutes from "./routes/notification.routers.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/notification", notificationRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
});

// Serve static files (Frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export { app };
