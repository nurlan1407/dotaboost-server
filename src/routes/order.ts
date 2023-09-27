import PaypalPayment from "@App/controllers/Payment/paypalPayment";
import CreateOrder from "@App/controllers/order/Create";
import GetOrder from "@App/controllers/order/GetOrder";
import { Router } from "express";
import { body } from "express-validator";
import StripePayment from "@App/controllers/Payment/stripePayment";
import AddCredentials from "@App/controllers/order/AddCredentials";
const orderRouter = Router();

orderRouter.get("/get/:orderId", GetOrder.perform);
orderRouter.post("/create", CreateOrder.perform);

orderRouter.post("/addCredentials", AddCredentials.perform);

orderRouter.post("/payment/create/:orderId",
    PaypalPayment.createOrder
    );

orderRouter.post("/payment/capture/:orderId",
    PaypalPayment.paymentComplete
);

orderRouter.post("/payment/stripe/create",
    StripePayment.InitiateStripePayment
);

orderRouter.get("/payment/stripe/catch/:orderId", StripePayment.CatchPayment);

export default orderRouter;