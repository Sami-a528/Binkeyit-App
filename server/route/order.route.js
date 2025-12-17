import { Router } from "express"
import auth from "../middleware/auth.middleware.js"
import { cashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookPayment } from "../controllers/order.controller.js"

const orderRouter = Router()

orderRouter.post("/cash-on-delivery", auth, cashOnDeliveryOrderController);
orderRouter.post("/checkout", auth, paymentController);
orderRouter.post("/webhook", webhookPayment);
orderRouter.get("/order-list", auth, getOrderDetailsController)

export default orderRouter