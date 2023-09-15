import mongoose, { Schema } from "mongoose";

export interface Service extends mongoose.Document{
    id:number ,
    title:string,
    price:number,
    multiplier:number,
    imgLink:string,
    link:string
};

const ServiceSchema:mongoose.Schema<Service> = new Schema({
    id:{type: Number, unique:true},
    title:{type:String},
    price:{type:Number},
    multiplier:{type:Number},
    imgLink:{type:String},
    link:{type:String},
});

export const ServiceModel = mongoose.model<Service>("Services", ServiceSchema);