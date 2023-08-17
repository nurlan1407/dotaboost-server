import { Request, Response, NextFunction } from "express";
import { UserDoc, UserModel } from "@App/interfaces/models/user";
import {tokenService}    from "@App/services/tokenService/tokenService";

class Register{
    public static async perform(req:Request, res:Response, next:NextFunction){
        const email:string = req.body.email;
        const password:string = req.body.password;
        const user = await UserModel.findOne({email:email});
        if(user != null){
            return res.json({msg:`user ${user} already exists`}).status(400);
        }else{
            const user = new UserModel({email:email,password:password});
            user.save().then((insertedUser:UserDoc)=>{
                const tokens = tokenService.signTokens(insertedUser._id, insertedUser.email);
                insertedUser.refreshToken = tokens.refreshToken;
                insertedUser.save().then(()=>{
                    return res.status(200).json({msg:"user registered", user:insertedUser, accessToken:tokens.accessToken});
                }).catch((err)=>next(err))
             }).catch((err)=>{
                 return next(err);
             })
        }
    }
}


export default Register;