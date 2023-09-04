import {Router} from "express";
import {Stripe} from "stripe";
import PaymentIntent from '@App/controllers/Payment/stripePayment'
import passport from "@App/services/passport/strategies/PassportJWT";


export const paymentRouter = Router();
paymentRouter.post("/create-payment-intent",passport.authenticate("jwt-strategy", {session:false}), PaymentIntent.perform);
