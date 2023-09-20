import GetDotaServices from "@App/controllers/Services/getDotaServices";
import GetProductList from "@App/controllers/Services/getProductList";
import { Router } from "express";
import passport from "passport";

const serviceRouter = Router();

serviceRouter.get("/get",GetDotaServices.perform);
serviceRouter.get("/products/:serviceId", GetProductList.perform);

export default serviceRouter;
