import { Request, Response, NextFunction } from "express";
import { ServiceModel } from "@App/interfaces/models/service";


class GetDotaServices{
    public static async perform(req:Request, res:Response, next:NextFunction){
        const dota2ServiceList = await ServiceModel.find();
        if(!dota2ServiceList){
            return res.json({msg:"services not found"}).status(404);
        }
        return res.json(dota2ServiceList).status(200);
    }
}

export default GetDotaServices;