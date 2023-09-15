import { Request, Response, NextFunction } from "express";
import paypal from '@paypal/checkout-server-sdk';
import env from 'endpoints.config';

const clientSecret = env.paypalSecretKey || "";
const clientId = env.paypalClientId || "";
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

class PaypalPayment {
    public static async createOrder(req: Request, res: Response, next: NextFunction) {
        const { fromMMR, toMMR } = req.body;
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100"
                    }
                }
            ]
        });
        try {
            const order = await client.execute(request);
            console.log(order);
            return res.json({ orderId: order.result.id });
        } catch (e) {
            return next(e);
        }
    }
}

export default PaypalPayment;