"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { ToastContainer } from "react-toastify";
import { api } from "../lib/axios";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/login", { email, passcode });

      toast.success("Signed in successfully!");
      setTimeout(() => {
        window.location.href = "https://demo.landver.net";
      }, 1000);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-[#1f1f1f] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-[40px] font-bold">Sign in</h1>
          <p className="mt-2 text-[22px] font-[300] text-gray-600">
            Hey, Enter your details to login to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter Email / Phone No"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=""
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />
          <div className="text-xs font-[500]">
            <span className="text-[#797979]">
              Don&apos;t have an account yet?{" "}
            </span>
            <a href="/signup" className="text-[#000000]">
              Register now!
            </a>
          </div>

          <Button classname="w-full !text-lg !font-[600]" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <ToastContainer theme="colored" />
      </div>
    </div>
  );
}
