import mongoose, { Schema } from "mongoose";

export interface Product extends mongoose.Document{
    serviceId:number,
    name:string,
    price:number,
    imgUrl:string|null,
    amount:number
};

const ProductSchema:mongoose.Schema<Product> = new Schema({
    serviceId:{type:Number},
    name:{type:String},
    price:{type:Number},
    imgUrl:{
        type:String,
        required:false,
        default:null
    },
    amount:{
        type:Number,
        required:false,
        default:1
    }
});

export const ProductModel = mongoose.model<Product>("Products", ProductSchema);