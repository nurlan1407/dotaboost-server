import PaypalPayment from "@App/controllers/Payment/MMRBoost/paypal/paypalPayment";
import CreateOrder from "@App/controllers/order/Create";
import GetOrder from "@App/controllers/order/GetOrder";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/get/:orderId", GetOrder.perform);
orderRouter.post("/create", CreateOrder.perform);
orderRouter.post("/payment/create",PaypalPayment.createOrder);

export default orderRouter;