"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      toast.success("Signed in successfully!");
      setTimeout(() => {
        window.location.href = "https://demo.landver.net";
      }, 1000);
    } catch (error) {
      console.error(error);
      console.log(error instanceof Error ? error.message : "Failed to sign in");
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
