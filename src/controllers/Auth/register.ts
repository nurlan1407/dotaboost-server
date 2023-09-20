import { Request, Response, NextFunction } from "express";
import { UserDoc, UserModel } from "@App/interfaces/models/user";
import {tokenService}    from "@App/services/tokenService/tokenService";
import {validationResult } from "express-validator";
import userService from "@App/services/user/userService";

class Register{
    public static async perform(req:Request, res:Response, next:NextFunction){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({msg: "Invalid credentials"});
            }
            const email:string = req.body.email;
            const password:string = req.body.password;
            const confirmationPassword = req.body.confirmationPassword;
            if(password!==confirmationPassword){
                return res.status(400).json({msg:"Passwords are not matching"});
            }
            if(await userService.findUser(email)){
                return res.status(400).json({msg:"User already exists"});
            }
            const user = await UserModel.findOne({email:email});
            if(user != null){
                return res.status(400).json({msg:`user ${user.email} already exists`});
            }else{
                const newUser =await userService.insertUser(email,password);
                // console.log(newUser);
                if(newUser){
                    const tokens = tokenService.signTokens(newUser._id, newUser.email);
                    newUser.refreshToken = tokens.refreshToken;
                    await userService.setRefreshToken(newUser);
                    return res.json({msg:"user registered", user:newUser, accessToken:tokens.accessToken});
                }else{
                    return res.json({msg:"invalid credentials"}).status(400)
                }
            }
        }catch (e){
            return next(e)
        }
    }
}


export default Register;