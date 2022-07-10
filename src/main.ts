import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import { Connection } from 'mongoose'

import mongoose from './model/db';
import CustomerRouter from './routes/customer'

dotenv.config();

const app: express.Express = express();
const port: number = 5000;
const databaseConnectionStatus: Connection = mongoose.connection;


databaseConnectionStatus.once("open", () => {
	console.log("[Log] Successfully connected to mongo database...")
})

databaseConnectionStatus.on("error", () => {
	console.log("[Error] while connecting to database....")
})

app.use(bodyParser.json());
app.use("/api/v1/customer", CustomerRouter);




// defining port
app.listen(port, () => {
	console.log(`[Log] Application is running on port ---> ${port}`);
})