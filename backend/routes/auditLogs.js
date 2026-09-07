import { Router } from "express";
import {
    crearLog,
    obtenerLogs,
    obtenerLogPorId
} from "../controllers/auditLogs.js";
import { validarJWT } from "../middelwares/validarToken.js";


const router = Router();

router.post("/", crearLog);
router.get("/", [validarJWT], obtenerLogs);
router.get("/:id", [validarJWT], obtenerLogPorId);

export default router;
