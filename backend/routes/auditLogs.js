import { Router } from "express";
import {
    crearLog,
    obtenerLogs,
    obtenerLogPorId
} from "../controllers/auditLogs.js";

const router = Router();

router.post("/", crearLog);
router.get("/", obtenerLogs);
router.get("/:id", obtenerLogPorId);

export default router;
