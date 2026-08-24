import { Router } from "express";
import router from "./Users";
import { calculate, profile } from "../controllers/NumerologyProfiles";

const router = Router();


router.post("/calculate", calculate);
router.get("/profile", profile);

export default router;
