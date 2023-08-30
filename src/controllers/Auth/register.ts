import { Request, Response, NextFunction } from "express";
import { UserDoc, UserModel } from "@App/interfaces/models/user";
import {tokenService}    from "@App/services/tokenService/tokenService";
import {validationResult } from "express-validator";
class Register{
    public static async perform(req:Request, res:Response, next:NextFunction){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        const email:string = req.body.email;
        const password:string = req.body.password;
        const user = await UserModel.findOne({email:email});
        if(user != null){
            return res.status(400).json({msg:`user ${user.email} already exists`});
        }else{
            const user = new UserModel({email:email,password:password});
            user.save().then((insertedUser:UserDoc)=>{
                const tokens = tokenService.signTokens(insertedUser._id, insertedUser.email);
                insertedUser.refreshToken = tokens.refreshToken;
                insertedUser.save().then(()=>{
                    return res.status(200).json({msg:"user registered", user:insertedUser, accessToken:tokens.accessToken});
                }).catch((err)=>res.status(400).json({msg:"invalid credentials"}))
             }).catch((err)=>{
                console.log(err);
                 return next(err);
             })
        }
    }
}


export default Register;