import { app } from "@App/index";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {tokenService}  from "@App/services/tokenService/tokenService";
import { tokenPayload } from "@App/services/tokenService/tokenFixtures";
import supertest from "supertest";
import { UserModel } from "@App/interfaces/models/user";
import userService from "@App/services/user/userService";
import { userInput } from "../fixtures/authFixtures";

describe("Login unit tests", ()=>{

    beforeEach(async () => {
        const mongoServer =await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("get user credentials by token", ()=>{
        it("should be good", async () =>{
            const newUser = await userService.insertUser(tokenPayload.email,"password");
            const {accessToken} = tokenService.signTokens(newUser._id,tokenPayload.email);
            const response = await supertest(app)
                .get("/user/getMe")
                .set("Authorization", `Bearer ${accessToken}`);            
            const {ok, statusCode, body} = response;
            expect(ok).toBe(true);
            expect(statusCode).toEqual(200);
            expect(body).toEqual({_id:newUser.id,email:newUser.email});
        });
        it("it should not be good", async()=>{
            const response = await supertest(app)
                .get("/user/getMe")
                .set("Authorization", `Bearer suka`);
            const {ok, statusCode, body} = response; 
            expect(statusCode).toEqual(401);
            expect(ok).toEqual(false);
        })
    })
    describe("Login api unit tests", ()=>{
        describe("user password incorrect", ()=>{
            it("should return error ", async()=>{
                await userService.insertUser(userInput.email, userInput.password);
                const response = await supertest(app)
                    .post("/user/login")
                    .send({
                        email:userInput.email,
                        password:userInput.password
                    });
                expect(response.statusCode).toEqual(400);
            })
        })
    })
})