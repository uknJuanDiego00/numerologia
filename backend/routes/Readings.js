import { Router } from "express";
import {
    crearLectura,
    obtenerLecturas,
    obtenerLecturaPorId,
    eliminarLectura
} from "../controllers/Readings.js";

const router = Router();

router.post("/", crearLectura);
router.get("/", obtenerLecturas);
router.get("/:id", obtenerLecturaPorId);
router.delete("/:id", eliminarLectura);

export default router;
