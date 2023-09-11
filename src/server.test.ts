import app from './index';
import request from 'supertest';
import mongoose from "mongoose";
import env from '../endpoints.config';

describe("GET", ()=>{
    it("should check if server works", async ()=>{
        const res = await request(app).get(
            "/user/getMe"
        );
        expect(res.statusCode).toEqual(401);
    })
})
