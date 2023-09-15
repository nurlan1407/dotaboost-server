import GetDotaServices from "@App/controllers/Services/getDotaServices";
import { Router } from "express";
import passport from "passport";

const serviceRouter = Router();

serviceRouter.get("/get",GetDotaServices.perform);

export default serviceRouter;
