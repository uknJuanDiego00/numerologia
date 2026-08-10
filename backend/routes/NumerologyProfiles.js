import { Router } from "express";
import router from "./Users";

const router = Router();


router.post("/calculate", calculoNumerico);
router.get("/profile", retornoNumerico);

export default router;
