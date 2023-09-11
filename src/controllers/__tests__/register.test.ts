import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import app from '@App/index';
import {userInput} from "@App/controllers/__tests__/fixtures/authFixtures";
import {body} from "express-validator";

describe("Register", () => {
    beforeEach(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
    describe("user registration", async () => {
        describe("given username and paswords are valid", async () => {
            it("should return 200 code", async () => {
                const response = await supertest(app)
                    .post('/user/register')
                    .send(userInput)
                const {statusCode, body, ok} = response;
                expect(statusCode).toEqual(200);
                expect(ok).toEqual(true);
                expect(body.msg).toEqual("user registered");
            })
        });
       describe("given password do not match", async()=>{
           
       })
    });
});

