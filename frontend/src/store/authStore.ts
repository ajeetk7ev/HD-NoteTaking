import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/constants/api";
import type { User } from "@/types";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/localstorage";


interface AuthState {
    user: User | null;
    token: string | null;
    authIsLoading: boolean;
    sendOtp: (email: string) => Promise<any>;
    register: (
        name: string,
        dob: string,
        email: string,
        otp: string
    ) => Promise<any>;
    login: (email: string, otp: string) => Promise<any>;
    loadUser: () => void;
    logout: () => void;
}



export const useAuthStore = create<AuthState>((set) => ({
    user: getFromLocalStorage('user') ? getFromLocalStorage('user') : null,
    token: getFromLocalStorage('token') ? getFromLocalStorage('token') : null,
    authIsLoading: false,

    sendOtp: async (email: string) => {
        set({ authIsLoading: true });
        try {
            const res = await axios.post(`${API_URL}/auth/send-otp`, { email });
            
            if (res.data.success) {
                return { success: true, message: res.data.message || "OTP sent successfully" };
            }
        } catch (error: any) {
            console.log("Signup error:", error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || error.message };
        } finally {
            set({ authIsLoading: false });
        }
    },

    register: async (name, dob, email, otp) => {
        set({ authIsLoading: true });
        try {
            const res = await axios.post(`${API_URL}/auth/signup`, {
                name,
                dob,
                email,
                otp,
            });

            if (res.status === 201 && res.data.success) {
                const { token, user } = res.data;
                setToLocalStorage("user", user);
                setToLocalStorage("token", token);

                set({ token, user });
                return { success: true, message: res.data.message || "Registered successfully" };
            }

        } catch (error: any) {
            console.error("Signup error:", error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || error.message };
        } finally {
            set({ authIsLoading: false });
        }
    },

    login: async (email, otp) => {
        set({ authIsLoading: true });
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, otp });

            if (res.status === 200 && res.data.success) {
                const { token, user, message } = res.data;
                setToLocalStorage("user", user);
                setToLocalStorage("token", token);

                set({ token, user });
                return { success: true, message:message || "Logged in successfully" };
            } else {
                return { success: false, error: res.data.message || "Invalid credentials" };
            }

        } catch (error: any) {
            console.error("Login error:", error.response?.data || error.message);
            return { success: false, error: error.response?.data.message || error.message };
        } finally {
            set({ authIsLoading: false });
        }
    },


    loadUser: () => {

        try {
            const storedUser = getFromLocalStorage("user");
            const storedToken = getFromLocalStorage("token");
            // console.log("STORESD USER IS ", storedUser);
            if (storedUser && storedToken) {
                set({
                    user: storedUser,
                    token: storedToken
                });
            }
            return;
        } catch (error) {
            console.error("Error loading user from storage:", error);
        }
    },


    logout: () => {
        removeFromLocalStorage("user");
        removeFromLocalStorage("token");
        set({ user: null, token: null });
    },
}));