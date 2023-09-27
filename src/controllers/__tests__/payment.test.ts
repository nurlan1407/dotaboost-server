import { app } from "@App/index";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {tokenService}  from "@App/services/tokenService/tokenService";
import { tokenPayload } from "@App/services/tokenService/tokenFixtures";
import supertest from "supertest";
import { UserModel } from "@App/interfaces/models/user";
import userService from "@App/services/user/userService";
import { userInput } from "../fixtures/authFixtures";


describe("creating order", ()=>{
    it("should return 200", async()=>{
        
    })
})