import { Request,Response,NextFunction } from "express";
import stripe from '@App/providers/stripe'
import { validationResult } from "express-validator";
import { AccountCredentials } from "@App/interfaces/models/order";
import { OrderModel } from "@App/interfaces/models/order";
import { Payment } from "@App/interfaces/models/order";
import { ProductModel } from "@App/interfaces/models/product";
import env from "../../../endpoints.config";


class StripePayment{
    public static async InitiateStripePayment(req:Request,res:Response,next:NextFunction){
        try{
            const SERVER_URL = env.serverUrl;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({msg:"invalid credentials"});
            };
            const { fromMMR, toMMR } = req.body;
            const {orderId, email, steamId ,password} = req.body; 
            
            const accountCredentials:AccountCredentials ={
                email:email,
                steamId:steamId,
                password:password
            };
            const order = await OrderModel.findById(orderId);            
            if(!order){
                return res.json({msg:"No order found"}).status(400);
            }
            //@ts-ignore
            const product = await ProductModel.findOne(order.product.productId);
            if(!product){
                return res.json({msg:"no product, try later"}).status(400);
            };
            console.log(order);
            
            const session = await stripe.checkout.sessions.create({
                payment_method_types:["card"],
                mode:"payment",
                line_items:[
                    {
                        price_data:{
                            currency:"usd",
                            product_data:{
                                name:product.name
                            },
                            unit_amount: (order.product.amount * product.price) * 1000
                        },
                        quantity:order.product.amount       
                    }
                ],
                success_url:`${SERVER_URL}/order/payment/stripe/catch/${orderId}`, //change the payment status of order
                cancel_url:SERVER_URL, 
            });
            
            const payment:Payment={
                transactionId:session.id,
                paymentMethod:"Stripe",
                status:"Unpayed"
            }
            order.payment = payment;
            order.accountCredentials = accountCredentials;
            order.orderNumber = order.orderNumber - 1;
            await order.save();
            //@ts-ignore
            return res.json({order:{...order._doc},url:session.url}).status(200);
        }catch (e){
            return next(e);
        }
    }
    
    public static async CatchPayment(req:Request,res:Response,next:NextFunction){
        try{
            const orderId = req.params;
            const order = await OrderModel.findByIdAndUpdate(orderId,{
                payment:{
                    status:"Payed"
                }
            });
            if(!order){
                return res.json({msg:"no order found"}).status(400);
            }
            return res.json({msg:"success"}).status(200);
        }catch(e){
            return next(e);
        }
    }
}

export default StripePayment;