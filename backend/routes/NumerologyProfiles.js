import { Router } from "express";
import { calcular, perfil } from "../controllers/NumerologyProfiles.js";
import { validarJWT } from "../middelwares/validarToken.js";


const router = Router();

router.post("/calcular", [validarJWT],calcular);
router.get("/perfil", [validarJWT], perfil);

export default router;

