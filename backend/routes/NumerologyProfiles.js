import { Router } from "express";
import { calculate, profile } from "../controllers/NumerologyProfiles.js";

const router = Router();

router.post("/calculate", [validarJWT],calculate);
router.get("/profile", [validarJWT], profile);

export default router;

