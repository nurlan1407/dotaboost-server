import mongoose, { Schema } from "mongoose";
import { Product } from "./product";

export type PaymentStatus = "Payed"|"Unpayed";
export type OrderStatus = "Idle"|"Process"|"Finished"|"Deleted";
export type PaymentMethod = "Paypal"|"Stripe"

export type Payment={
    paymentMethod: PaymentMethod,     // Payment method used, e.g., "PayPal", "Credit Card"
    transactionId: String,     // Payment transaction ID or reference
    status: PaymentStatus  
};

export type AccountCredentials={
    email:string,
    steamId:string,
    password:string,
};

export interface Order extends mongoose.Document{
    _id:string,
    orderNumber:number,
    title:string,
    price:number,
    payment:Payment,
    product:Product,
    amount?:number,
    createdAt:number,
    accountCredentials:AccountCredentials|null
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
        paymentMethod: {type:String, required:false, default:null},     // Payment method used, e.g., "PayPal", "Credit Card"
        transactionId: String,     // Payment transaction ID or reference
        status: String  
    },
    product:{
        productId: mongoose.Schema.Types.ObjectId,
        serviceId:Number,
        name: String,
        price: Number,
        amount:Number
    },
    
    accountCredentials:{
        email:String,
        steamId:String,
        password:String,
    },
    // amount:{
    //     type:Number,
    //     required:false,
    //     default:null
    // },
    createdAt:Number
});



OrderSchema.post("save", async function(doc) {
    const count = await OrderModel.count();
    await OrderModel.findByIdAndUpdate({_id: doc._id}, {$set: { orderNumber: count + 1} });
});


export const OrderModel = mongoose.model<Order>("Orders", OrderSchema);
