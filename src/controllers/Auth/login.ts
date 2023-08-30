import { Request, Response, NextFunction } from "express";
import { UserDoc, UserModel } from "@App/interfaces/models/user";
import {tokenService} from "@App/services/tokenService/tokenService";
import bcrypt from 'bcrypt';

class Login{
    public static async perform(req:Request, res:Response, next:NextFunction){
        const email:string = req.body.email;
        const password:string = req.body.password;
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(400).json({msg:"no such user"});
        }else{
            const isValidPassword =await bcrypt.compare(password , user.password);
            if(isValidPassword==false){
                return res.status(400).json({msg:"password Incorrect"});
            }
            const tokens = tokenService.signTokens(user._id, user.email);
            user.refreshToken = tokens.refreshToken;
            await user.save();
            return res.status(200).json({msg:"user logined", accessToken:tokens.accessToken, user:user});
        }
    }
}

export default Login;