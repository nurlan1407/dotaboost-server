import {app} from './index';
import env from 'endpoints.config';
import { Database } from './providers/database';

const port = env.port || 3000

app.listen(port, async()=>{
    Database.init();
})