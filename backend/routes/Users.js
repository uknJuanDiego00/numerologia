import { Router } from "express"; 

const router = Router();

router.post("/register", crearUsuario);
router.post("/login", verficarUsuario);

export default router;
