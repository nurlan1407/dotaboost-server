import { Request,Response,NextFunction } from "express";
import { ProductModel } from "@App/interfaces/models/product";
import productService from "@App/services/productService/productService";


class GetProductList{
    public static async perform(req:Request,res:Response, next:NextFunction){
        try{
            const serviceType = req.params.serviceId;   
            const productList = await productService.getProducts(parseInt(serviceType));
            if(!productList){
                return res.json({msg:"does not found any"}).status(404);
            }
            // console.log(productList);
            
            return res.json(productList).status(200);
        }catch(e){
            return next(e)
        }
    }
}

export default GetProductList;