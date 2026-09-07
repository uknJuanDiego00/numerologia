import { Router } from "express";
import {
    crearCompatibilidad,
    obtenerCompatividades,
    obtenerCompatibilidadPorId,
    eliminarCompatibilidad
} from "../controllers/CompatibilyMatches.js";
import { validarJWT } from "../middelwares/validarToken.js";


const router = Router();

router.post("/", crearCompatibilidad);
router.get("/", [validarJWT], obtenerCompatividades);
router.get("/:id", [validarJWT], obtenerCompatibilidadPorId);
router.delete("/:id", [validarJWT],eliminarCompatibilidad);

export default router;
