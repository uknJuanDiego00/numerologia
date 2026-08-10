import express from 'express';
import dotenv from 'dotenv';
import {Data} from "./backend/database/BaseMongoDB.js";


dotenv.config();

const server = express();
Data();
const port = process.env.PORT

server.use(express.json()); //midelware

server.listen(port, () => {
    console.log(`Escuchando por el puerto: ${port}`);
});