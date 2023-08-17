import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import env from '../endpoints.config'
import { Database } from './providers/database';
import userRouter from './routes/user';
import bodyParser from 'body-parser';
import passport from '@App/services/passport/strategies/PassportJWT';
//For env File 

const app: Application = express();

const port = env.port || 8000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
// parse application/json
app.use(bodyParser.json())
//routes    
app.use("/user", userRouter)


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
}); 



app.listen(port, () => {
  Database.init()
  console.log(`Server is Fire at http://localhost:${port}`);
});


