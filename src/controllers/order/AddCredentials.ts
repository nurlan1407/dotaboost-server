import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AccountCredentials } from "@App/interfaces/models/order";
import { OrderModel } from "@App/interfaces/models/order";


class AddCredentials{
    public static async perform(req: Request, res: Response, next: NextFunction){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({msg:"invalid credentials"});
            }
            const {orderId, email, steamId ,password} = req.body; 
            const accountCredentials:AccountCredentials ={
                email:email,
                steamId:steamId,
                password:password
            };
            const order = await OrderModel.findById(orderId);
            if(!order){
                return res.json({msg:"no order found"}).status(400);
            }
            order.accountCredentials = accountCredentials;
            order.orderNumber = order.orderNumber -1;
            await order.save();
            //@ts-ignore
            return res.json({...order._doc});
        }catch(e){
            return next(e)
        }
    }
}


export default AddCredentials;