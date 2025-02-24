"use client";

import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface User {
  userId: string;
  email: string;
  role: string;
  username: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Read token from storage on app load
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const decodedUser = storedToken ? jwtDecode<User>(storedToken) : null;

  return {
    user: decodedUser,
    token: storedToken,

    login: async (email, password) => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          const decoded: User = jwtDecode(data.token);
          console.log("Decoded user: ", decoded);
          set({ user: decoded, token: data.token });
          localStorage.setItem("token", data.token);
        } else {
          console.error("Login failed:", data.error);
        }
      } catch (error) {
        console.error("Login request failed:", error);
      }
    },

    logout: () => {
      set({ user: null, token: null });
      localStorage.removeItem("token");
    },

    checkAuth: () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decoded: User = jwtDecode(token);
            set({ user: decoded, token }); // Ensure Zustand triggers re-render
          } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("token");
            set({ user: null, token: null });
          }
        } else {
          console.log("No token found in storage.");
          set({ user: null, token: null });
        }
      }
    },
  };
});

useAuthStore.subscribe((state) => console.log("Updated Auth State:", state));
