import { Request, Response, NextFunction } from "express";
import paypal from '@paypal/checkout-server-sdk';
import env from 'endpoints.config';
import { AccountCredentials } from "@App/interfaces/models/order";
import { OrderModel } from "@App/interfaces/models/order";
import { ProductModel } from "@App/interfaces/models/product";
import { Payment } from "@App/interfaces/models/order";
import { validationResult } from "express-validator";

const clientSecret = env.paypalSecretKey || "";
const clientId = env.paypalClientId || "";
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

class PaypalPayment {
    public static async createOrder(req: Request, res: Response, next: NextFunction) {
        try{    
            const {orderId} = req.params; 
            const order = await OrderModel.findById(orderId);            
            if(!order){
                return res.json({msg:"No order found"}).status(400);
            }
            //@ts-ignore
            const product = await ProductModel.findOne(order.product.productId);
            if(!product){
                return res.json({msg:"no product, try later"}).status(400);
            }
            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer("return=representation");
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: `${product.price*order.product.amount}`
                        },        
                    },
                ],
            });
            const PaypalOrder = await client.execute(request);
            // console.log(order);
            // console.log(PaypalOrder.result.id);

            const payment:Payment={
                transactionId:PaypalOrder.result.id,
                paymentMethod:"Paypal",
                status:"Unpayed"
            };
            order.payment = payment;
            order.orderNumber = order.orderNumber - 1;
            const updatedOrder = await order.save();
            if(!updatedOrder){
                return res.json({msg:"could not create paypal order,try later"}).status(400);
            }
            //@ts-ignore
            return res.json({...updatedOrder._doc}).status(200);
        }catch(e){
            return next(e);
        }
    }

    public static async paymentComplete(req: Request, res: Response, next: NextFunction){
      
        const {orderId} = req.params;
        console.log(orderId);
        
        const order = await OrderModel.findById(orderId);
        console.log(order);
        
        if(!order){
            return res.json({msg:"could not pay sorry"}).status(404);
        }
        if(order.payment.status=="Payed"){
            return res.json({msg:"Order already payed"}).status(404);
        }
        console.log(order);
        
        order.orderNumber = order.orderNumber - 1 ;//because i have middleware that increments orderNumber when i save()
        order.payment.status = "Payed";
        await order.save();
        return res.json({msg:"success"}).status(200);
    }

    // public static async paymentRejects(req: Request, res: Response, next: NextFunction){
    //     return res.
    // }
}

export default PaypalPayment;