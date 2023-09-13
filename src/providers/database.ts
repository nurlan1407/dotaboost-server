import env from '../../endpoints.config';
import mongoose, { mongo } from "mongoose";
import { MongoError } from "mongodb"



export class Database {
    public static init() {
        const dbUrl = env.dbUrl ;
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoose.connect(dbUrl!!)
            .then(() => {
                console.log('connected to mongo server at: ' + dbUrl);
            }).catch((error: MongoError) => {
                console.log('Failed to connect to the Mongo server!!');
                console.log(error);
                throw error;
            });
    }
}

export default mongoose;