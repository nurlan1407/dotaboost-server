import { Request,Response, NextFunction } from "express";
import { OrderModel } from "@App/interfaces/models/order";

class GetOrder{
    public static async perform(req:Request,res:Response, next:NextFunction){
        try{
            console.log("REQUEST");
            
            const orderId = req.params.orderId;
            const order = await OrderModel.findOne({_id:orderId});
            if(!order){
                return res.status(404).json({msg:"Order not found.."});
            }
            //@ts-ignore
            return res.status(200).json({...order._doc});
        }catch(e){
            return next(e);
        }
    }
}

export default GetOrder;