import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { verifyJWT } from "./middlewares/auth.middlewares.js";

const PORT = process.env.PORT || 8000;

// configDotenv({
//     path: './.env'
// });

config();

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error in MongoDB connectoion: ", err);
    });
