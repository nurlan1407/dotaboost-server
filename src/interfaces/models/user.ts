import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import mongoose from '@App/providers/database'
const saltRounds = 5;

export interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    refreshToken:string
};

const UserSchema: mongoose.Schema<UserDoc> = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
    refreshToken: {type:String }
});

UserSchema.pre('save', async function (next:mongoose.CallbackWithoutResultAndOptionalError) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }   
    next();
   });

export const UserModel = mongoose.model<UserDoc>('User', UserSchema);
