import { Request, Response } from "express";
import User from "../models/User";
import Otp from "../models/Otp";
import { generateOtp } from "../utils/generateOtp";
import { generateToken } from "../utils/generateToken";
import { sendVerificationEmail } from "../utils/mailSender";
import uploadFileToCloudinary from "../utils/uploadFileToCloudinary";

// Step 1: Send OTP (for both signup & login)
export const sendOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const otp = generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        const emailSent = await sendVerificationEmail(email, otp);
        if (!emailSent) return res.status(500).json({ success: false, message: "Failed to send OTP email" });

        await Otp.create({ email, otp, expiresAt });

        console.log(`OTP for ${email}: ${otp}`);

        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.log("Error sending OTP: ", error);
        res.status(500).json({success:false, message: "Failed to send OTP", error });
    }
};

// Step 2: Signup (verify OTP + create user)
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, dob, avatar, otp } = req.body;

        if (!name || !email || !dob || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({
            success: false,
            message: "User already exists"
        });

        const validOtp = await Otp.findOne({ email, otp });
        if (!validOtp) return res.status(400).json({
            success:false,
            message: "Invalid or expired OTP" });

        //upload file to cloudinary
        let avatarUrl = "";
        if ((req as any).files && (req as any).files.avatar) {
            const result = await uploadFileToCloudinary((req as any).files.avatar, "avatars", 150);
            avatarUrl = result.secure_url;
        }
        const user = await User.create({
            name,
            email,
            dob,
            avatar,
        });

        const token = generateToken((user._id as any).toString());

        return res.status(201).json({ success: true, message: "Signup successful", user, token });
    } catch (error) {
        console.log("Error during signup: ", error);
        res.status(500).json({success:false, message: "Signup failed" });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) return res.status(400).json({ message: "Email & OTP required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({
             success:false,
             message: "User not found" });

        const validOtp = await Otp.findOne({ email, otp }).sort({ createdAt: -1 });
        if (!validOtp) return res.status(400).json({
            success:false,
             message: "Invalid or expired OTP" });

        const token = generateToken((user._id as any).toString());

        res.status(200).json({
            success:true, 
            message: "Login successful", 
            user, 
            token 
        });
    } catch (error) {
        console.log("Error during login: ", error);
        res.status(500).json({success:false, message: "Login failed" });
    }
};
