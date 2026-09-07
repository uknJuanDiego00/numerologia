import express from 'express';
import dotenv from 'dotenv';
import { Data } from "./backend/database/BaseMongoDB.js";
import userRouter from "./backend/routes/Users.js";
import numerologyRouter from "./backend/routes/NumerologyProfiles.js";
import readingRouter from "./backend/routes/Readings.js";
import compatibilityRouter from "./backend/routes/CompatibilyMatches.js";
import auditLogRouter from "./backend/routes/auditLogs.js";

dotenv.config();

const server = express();
Data();

const port = process.env.PORT || 3000;

server.use(express.json());

server.use("/api/v1/users", userRouter);
server.use("/api/v1/profiles", numerologyRouter);
server.use("/api/v1/readings", readingRouter);
server.use("/api/v1/compatibility", compatibilityRouter);
server.use("/api/v1/logs", auditLogRouter);

server.listen(port, () => {
    console.log(`Escuchando por el puerto: ${port}`);
});