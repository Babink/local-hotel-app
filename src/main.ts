import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import {dbConnectionLog} from './model/db';
import CustomerRouter from './routes/customer'
import OwnerRouter from './routes/owner'


dotenv.config();
const app: express.Express = express();
const port: number | any = process.env.SERVER_PORT;
dbConnectionLog();

app.use(bodyParser.json());
app.use("/api/v1/customer", CustomerRouter);
app.use("/api/v1/owner", OwnerRouter);


app.listen(port, () => {
	console.log(`[Log] Application is running on port ---> ${port}`);
})