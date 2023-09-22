import {Router} from "express";
import {Stripe} from "stripe";
import PaymentIntent from '@App/controllers/Payment/stripePayment'
import passport from "@App/services/passport/strategies/PassportJWT";


export const paymentRouter = Router();
//  
