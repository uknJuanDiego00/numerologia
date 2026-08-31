import { Router } from "express";
import { calculate, profile } from "../controllers/NumerologyProfiles.js";

const router = Router();

router.post("/calculate", calculate);
router.get("/profile", profile);

export default router;

