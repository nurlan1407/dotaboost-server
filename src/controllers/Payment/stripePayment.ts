import { Request,Response,NextFunction } from "express";
import stripe from '@App/providers/stripe'
class StripePayment{
    public static async perform(req:Request,res:Response,next:NextFunction){
        try{
            const { items } = req.body;
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 1,
                currency: "eur",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            return res.json({
                clientSecret:paymentIntent.client_secret
            }).status(200);
        }catch (e){
            return next(e);
        }
    }
}

export default StripePayment;