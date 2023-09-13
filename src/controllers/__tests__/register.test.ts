import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import {app} from '@App/index';
import {userInput} from "@App/controllers/fixtures/authFixtures";
import userService from "@App/services/user/userService";


describe("Register", () => {

    beforeEach(async () => {
        const mongoServer =await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    afterEach(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("given username and paswords are valid",  () => {
        it("should return 200 code", async () => {
            const response = await supertest(app)
                .post('/user/register')
                .send(userInput)
            const {statusCode, body, ok} = response;
            expect(statusCode).toEqual(200);
            expect(ok).toEqual(true);
            expect(body.msg).toEqual("user registered");
        });
    });
    describe("given password do not match",  () => {
        it("should return 400 code", async () => {
            const userCreationMock = jest
                .spyOn(userService, "insertUser");
            const tempUserInput = userInput;
            tempUserInput.confirmationPassword = "differentPassword";
            const {statusCode} = await supertest(app)
                .post('/user/register')
                .send({...tempUserInput})
            expect(statusCode).toBe(400);
            expect(userCreationMock).not.toHaveBeenCalled();
        });
    });

    describe("given email already exists", ()=>{
        it("should return code 400", async()=>{
            const existingUser = await userService.findUser(userInput.email);
            const response = await supertest(app)
                .post("/user/register")
                .send(userInput);
            const {ok,statusCode} = response;
            expect(ok).toBe(false);
            expect(statusCode).toBe(400);
            expect(existingUser).toBeNull;
        })
    })  

});

