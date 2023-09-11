import { Express , Router, Request,Response} from "express";
import passport from "passport";
import Login from "../controllers/Auth/login";
import Register from "@App/controllers/Auth/register";
import {body ,check} from 'express-validator';
export const userRouter = Router();

userRouter.get("/getMe", passport.authenticate("jwt-strategy", {session:false}) , (req,res,next)=>{res.send("me")});
userRouter.post("/register",body("email").isEmail(),body("password").isLength({min:6}),Register.perform );
userRouter.post("/login", Login.perform);

export default userRouter

    