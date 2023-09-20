import { Request,Response,NextFunction } from "express";
import {Order} from "@App/interfaces/models/order";
import { OrderModel } from "@App/interfaces/models/order";

class CreateOrder{
    public static async perform(req:Request,res:Response, next:NextFunction){
        try{
            const {title, product, createdAt} = req.body;
            const orderNumber = 1;
            const newOrder =await OrderModel.create({
                orderNumber:orderNumber,
                title:title,
                payment:{
                    paymentMethod:null,
                    transactionId:null,
                    status:"unpayed"
                },
                product:{
                    productId: product._id,
                    serviceId:product.serviceId,
                    name:product.name,
                    price:product.price,
                    amount: product.amount
                },
                createdAt:createdAt
            });
            const orderInstance = await OrderModel.findById(newOrder._id);
            if(!newOrder){
                res.status(400).json({msg:"could not create order"});
            }
            //@ts-ignore
            return res.json({ ...orderInstance._doc }).status(200);
        }catch(e){
            return next(e);
        }
    }
}

export default CreateOrder;