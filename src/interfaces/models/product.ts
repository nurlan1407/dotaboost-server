import mongoose, { Schema } from "mongoose";

export interface Product extends mongoose.Document{
    productId:mongoose.Schema.Types.ObjectId,
    serviceId:number,
    name:string,
    price:number,
    imgUrl:string|null
};

const ProductSchema:mongoose.Schema<Product> = new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId},
    serviceId:{type:Number},
    name:{type:String},
    price:{type:Number},
    imgUrl:{
        type:String,
        required:false,
        default:null
    }
});

export const ProductModel = mongoose.model<Product>("Products", ProductSchema);