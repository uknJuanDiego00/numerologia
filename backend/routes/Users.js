import { Router } from "express";
import{ crearUsuario } from "../controllers/Users.js"

const router = Router();

router.post("/register", crearUsuario);
router.post("/login", verficarUsuario);

export default router;
