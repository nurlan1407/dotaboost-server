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
import orderRouter from './routes/order';
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
app.use("/order", orderRouter); 



app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
}); 


// app.listen(port, () => {
//    Database.init()
//   console.log(`Server is Fire at http://localhost:${port}`);
// });

