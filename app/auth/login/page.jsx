"use client";
import React, { useState } from "react";
import {
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../Firebase/config";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";
import LoadingSpinner from "../../Components/Utils/LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsServerValidated, setIsSuperAdmin } = useAuth();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");

    // -------------------------------------------------------
    // DEV ONLY: superadmin bypass — skips Firebase entirely
    // Credentials are set in .env.local and never committed
    // -------------------------------------------------------
    if (process.env.NODE_ENV === "development") {
      const devUser = process.env.NEXT_PUBLIC_DEV_SUPERADMIN_USER;
      const devPass = process.env.NEXT_PUBLIC_DEV_SUPERADMIN_PASS;
      const isDevUserMatch =
        email.trim().toLowerCase() === devUser?.trim().toLowerCase() ||
        email.trim().toLowerCase() === "superadmin" ||
        email.trim().toLowerCase() === "superadmin@dev.local";

      if (isDevUserMatch && password === devPass) {
        setIsSuperAdmin(true);
        router.push("/");
        return;
      }
    }

    try {
      // Set session persistence
      await setPersistence(auth, browserSessionPersistence);
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
      const token = await auth.currentUser.getIdToken();

      const response = await axios.post(
        "/api/auth/login",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsServerValidated(true);
        router.push("/");
      } 
    } catch (error) {
      setErrorMessage("Login error, please try again.");
      setIsSigningIn(false);
      console.error("Login error:", error);
    }
  };

  if (isSigningIn)
    return <LoadingSpinner message="Signing In, Please Wait ..." />;
  return (
    <div>
      <main className="w-full h-screen flex self-center place-content-center place-items-center bg-gray-50 dark:bg-gray-900">
        <div className="w-96 text-gray-600 dark:text-gray-200 space-y-5 p-6 shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
              Govt. of Sri Lanka
            </span>
            <h3 className="text-gray-900 dark:text-white text-xl font-bold sm:text-2xl mt-0.5">
              MEL — NLD Portal
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              National Languages Division • Ministry of Public Administration
            </p>
          </div>

          {/* Quick Demo Hint */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs space-y-1">
            <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span>Demo / Portfolio Mode</span>
              <button
                type="button"
                onClick={() => {
                  setEmail("superadmin");
                  setPassword("admin");
                }}
                className="underline hover:text-emerald-600 text-[11px]"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-emerald-700 dark:text-emerald-400">
              User: <code className="bg-emerald-100 dark:bg-emerald-900 px-1 rounded">superadmin</code> | Pass: <code className="bg-emerald-100 dark:bg-emerald-900 px-1 rounded">admin</code>
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 font-medium">Username or Email</label>
              <input
                type="text"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin or email"
                className="w-full mt-1.5 px-3 py-2 text-gray-700 dark:text-gray-200 bg-transparent outline-none border border-gray-300 dark:border-gray-600 focus:border-emerald-500 dark:focus:border-emerald-400 shadow-sm rounded-lg transition duration-300 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 font-bold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-gray-300 focus:border-primary shadow-sm rounded-lg transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary hover:shadow-xl transition duration-300"
              }`}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="text-center w-100 mt-4 ">
            <a className="text-green-800" href="/auth/register">
              Create account
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
