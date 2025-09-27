import { Router } from "express";
const router = Router();
import { sendOtp, signup, login } from "../controllers/auth.controller";



router.post("/send-otp", sendOtp);
router.post("/signup",  signup);
router.post("/login", login);

export default router;