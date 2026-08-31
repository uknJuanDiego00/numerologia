<<<<<<< HEAD
import express from 'express';
import dotenv from 'dotenv';
import {Data} from "./backend/database/BaseMongoDB.js";
import userRouter from "./backend/routes/Users.js"


dotenv.config();

const server = express();
Data();
const port = process.env.PORT

server.use(express.json()); //midelware

server.use("/api/v1",userRouter)

server.listen(port, () => {
    console.log(`Escuchando por el puerto: ${port}`);
=======
import express from 'express';
import dotenv from 'dotenv';
import {Data} from './database/BaseMongoDB.js'

dotenv.config();

const server = express();
Data();
const port = process.env.PORT

server.use(express.json());

server.listen(port, () => {
    console.log(`Escuchando por el puerto: ${port}`);
>>>>>>> 232809a430657f200e8a3264167fce124bb453f8
});