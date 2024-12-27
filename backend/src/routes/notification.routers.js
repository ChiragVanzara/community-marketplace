import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { sendBuyNotification } from "../controllers/notification.controllers.js";

const router = Router();

router.route('/notify-buy/:notificationId').post(verifyJWT, sendBuyNotification);

export default router;