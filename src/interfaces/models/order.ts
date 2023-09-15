import mongoose, { Schema } from "mongoose";
import { Product } from "./product";
export type PaymentStatus = "Payed"|"Unpayed";
export type OrderStatus = "Idle"|"Process"|"Finished"|"Deleted";

export type Payment={
    paymentMethod: String,     // Payment method used, e.g., "PayPal", "Credit Card"
    transactionId: String,     // Payment transaction ID or reference
    status: PaymentStatus  
};

export interface Order extends mongoose.Document{
    orderNumber:number,
    title:string,
    price:number,
    payment:Payment,
    items:Product[],
    createdAt:number
};

const OrderSchema:mongoose.Schema<Order> = new Schema({
    orderNumber:{
        type:Number
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    payment:{
        paymentMethod: String,     // Payment method used, e.g., "PayPal", "Credit Card"
        transactionId: String,     // Payment transaction ID or reference
        status: String  
    },
    items:[{
        productId: mongoose.Schema.Types.ObjectId,
        serviceId:Number,
        name: String,
        price: Number,
    }],
    createdAt:Number
});

export const ServiceModel = mongoose.model<Order>("Orders", OrderSchema);