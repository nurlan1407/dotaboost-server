import { Express , Router, Request,Response} from "express";
import passport from "passport";
import Login from "@App/controllers/Auth/login";
import Register from "@App/controllers/Auth/register";
export const userRouter = Router();

userRouter.get("/getMe", passport.authenticate("jwt-strategy", {session:false}) , (req,res,next)=>{res.send("me")});
userRouter.post("/login", Login.perform );
userRouter.post("/register",Register.perform );

export default userRouter

    