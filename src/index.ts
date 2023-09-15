import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import expressValidator from 'express-validator';
dotenv.config();
import env from '../endpoints.config'
import { Database } from './providers/database';
import userRouter from './routes/user';
import bodyParser from 'body-parser';
import passport from './services/passport/strategies/PassportJWT';
import Stripe from 'stripe';
import {paymentRouter} from "./routes/payment";
import path from "path";
import serviceRouter from './routes/services';
import { ServiceModel } from './interfaces/models/service';
import { ProductModel } from './interfaces/models/product';
//For env File 

export const app: Application = express();

const host = "0.0.0.0";
const port = env.port || 8000;
const DbUrl = env.dbUrl || "";


const allowedOrigins = ['http://localhost:5000'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};
var dir = path.join(__dirname, 'public');

app.use('/static', express.static(dir, { 
  fallthrough: false 
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsOptions));
app.use(passport.initialize());
// parse application/json
app.use(bodyParser.json());

//routes
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/services", serviceRouter);


app.get('/', (req: Request, res: Response) => {
    ProductModel.insertMany([
        {
            serviceId:1,
            name:"Herald",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/herald.png",
            price: 36
        },
        {
            serviceId:1,
            name:"Guardian",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/guardian.png",
            price: 36
        },
        {
            serviceId:1,
            name:"Crusader",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/crusader.png",
            price:40
        },
        {
            serviceId:1,
            name:"Archon",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/archon.png",
            price:42.5
        },
        {
            serviceId:1,
            name:"Legend",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/legend.png",
            price:90
        },
        {
            serviceId:1,
            name:"Ancient",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/ancient.png",
            price:205
        },
        {
            serviceId:1,
            name:"Divine",
            imgUrl:"http://localhost:8080/static/assets/dota2/ranks/divine.png",
            price:700
        },

    ])
  res.send('Welcome to Express & TypeScript Server');
}); 


// app.listen(port, () => {
//    Database.init()
//   console.log(`Server is Fire at http://localhost:${port}`);
// });

