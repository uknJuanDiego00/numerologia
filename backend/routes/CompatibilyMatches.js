import { Router } from "express";
import {
    crearCompatibilidad,
    obtenerCompatividades,
    obtenerCompatibilidadPorId,
    eliminarCompatibilidad
} from "../controllers/CompatibilyMatches.js";

const router = Router();

router.post("/", crearCompatibilidad);
router.get("/", obtenerCompatividades);
router.get("/:id", obtenerCompatibilidadPorId);
router.delete("/:id", eliminarCompatibilidad);

export default router;
