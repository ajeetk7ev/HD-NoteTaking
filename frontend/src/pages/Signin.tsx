import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo (1).png";
import authImage from '../assets/right-column.png';
import EmailNote from "@/components/auth/EmailNote";

const Signin: React.FC = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const { sendOtp, login, authIsLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleGetOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await sendOtp(email);
        if (result.success) {
            toast.success(result.message || "OTP sent successfully");
            setIsOtpSent(true);
            setResendCooldown(300); // 5 minutes cooldown
        } else {
            toast.error(result.error || "Failed to send OTP");
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        
        const result = await sendOtp(email);
        if (result.success) {
            toast.success("OTP resent successfully");
            setResendCooldown(300); // 5 minutes cooldown
        } else {
            toast.error(result.error || "Failed to resend OTP");
        }
    };

    // Countdown timer effect
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(email, otp);
        if (result.success) {
            toast.success(result.message || "Signed in successfully");
            setOtp("");
            navigate("/dashboard");
        } else {
            toast.error(result.error || "Signin failed");
        }
    };

    return (
        <div className="h-screen md:flex bg-gradient-to-r from-blue-50 via-white to-blue-100 overflow-hidden">
            {/* Logo - Top Left on Large Devices */}
            <div className="absolute top-6 left-6 z-10 hidden md:block">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-8 mr-2" />
                </div>
            </div>

           

            {/* Left Section (Form) */}
            <div className="w-full md:w-1/2 mt-[120px] md:mt-0 flex flex-col justify-center items-center p-4 md:p-6 md:pr-0 sm:px-6">
                <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6">
                    {/* Logo - Mobile Only */}
                    <div className="flex items-center justify-center mb-6 md:hidden">
                        <img src={logo} alt="Logo" className="h-8 mr-2" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Sign in</h2>
                    <p className="text-gray-500 mb-4 text-center">Sign in to enjoy the feature of HD</p>

                     {
                        isOtpSent && <EmailNote />
                     }

                    {/* Form */}
                    <form onSubmit={isOtpSent ? handleSignin : handleGetOtp} className="space-y-3">
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                disabled={isOtpSent}
                            />
                        </div>

                        {/* OTP */}
                        {isOtpSent && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Enter OTP</label>
                                <div className="relative">
                                    <input
                                        type={showOtp ? "text" : "password"}
                                        placeholder="6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOtp(!showOtp)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showOtp ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {/* Resend OTP */}
                                <div className="mt-2 ">
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={resendCooldown > 0}
                                        className={`text-sm ${
                                            resendCooldown > 0
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-blue-500 hover:text-blue-700 hover:underline"
                                        }`}
                                    >
                                        {resendCooldown > 0
                                            ? `Resend OTP in ${Math.floor(resendCooldown / 60)}m ${resendCooldown % 60}s`
                                            : "Resend OTP"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={authIsLoading}
                            className={`w-full py-2 rounded-lg font-medium flex items-center justify-center transition ${isOtpSent
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                                } ${authIsLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {authIsLoading ? (
                                <Loader2 className="animate-spin h-5 w-5 text-white" />
                            ) : isOtpSent ? (
                                "Signin"
                            ) : (
                                "Get OTP"
                            )}
                        </button>
                    </form>

                    {/* Redirect to signup */}
                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Section (Image / Illustration) */}
            <div className="w-1/2 hidden md:flex items-center justify-center md:pl-0">
                <img
                    src={authImage}
                    alt="Signin background"
                    className="h-[80%] object-contain animate-fadeIn"
                />
            </div>
        </div>
    );
};

export default Signin;
