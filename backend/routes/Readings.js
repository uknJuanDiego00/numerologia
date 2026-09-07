import { Router } from "express";
import {
    crearLectura,
    obtenerLecturas,
    obtenerLecturaPorId,
    eliminarLectura
} from "../controllers/Readings.js";
import { validarJWT } from "../middelwares/validarToken.js";


const router = Router();

router.post("/", [validarJWT],crearLectura);
router.get("/", [validarJWT],obtenerLecturas);
router.get("/:id", [validarJWT],obtenerLecturaPorId);
router.delete("/:id", [validarJWT],eliminarLectura);

export default router;
