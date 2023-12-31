
import mongoose from "mongoose";

export const userId = new mongoose.Types.ObjectId().toString();
export const differentUserId = new mongoose.Types.ObjectId().toString();

export const userInput = {
    email: "test@example.com",
    password: "Asdf123$",
    confirmationPassword: "Asdf123$",
};

export const credInput = {
    email: "test@example.com",
    password: "Asdf123$",
};

export const userPayload = {
    _id: userId,
    email: "test@example.com",
};

export const differentUserPayload = {
    _id: differentUserId,
    email: "differenttest@example.com",
    name: "Different Test User",
};