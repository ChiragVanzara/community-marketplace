import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { sendBuyNotification, fetchAllNotificationByUser } from "../controllers/notification.controllers.js";

const router = Router();

router.route('/get-all-by-user').get(verifyJWT, fetchAllNotificationByUser)
router.route('/notify-buy/:id').post(verifyJWT, sendBuyNotification);

export default router;