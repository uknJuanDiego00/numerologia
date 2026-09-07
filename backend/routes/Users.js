import { Router } from "express";
import{ crearUsuario, verificarUsuario } from "../controllers/Users.js"

const router = Router();

router.post('/register', crearUsuario);
router.post('/login', verificarUsuario);

export default router;
