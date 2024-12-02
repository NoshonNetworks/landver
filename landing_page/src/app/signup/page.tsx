"use client";

import { useState } from "react";
import Button from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select/Select";
import { api } from "../lib/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        email: formData.email,
        passcode: formData.password,
        walletAddress: formData.walletAddress,
        userType: formData.role,
      });

      localStorage.setItem("token", response.data.token);
      toast.success("Registration successful!");
      setTimeout(() => {
        window.location.href = "https://demo.landver.net";
      }, 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-[#1f1f1f] px-4">
      <ToastContainer theme="colored" />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-[40px] font-bold">Let&apos;s set up</h1>
          <p className="mt-2 text-[22px] font-[300] text-gray-600">
            Hey, Enter your details to login to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter Email / Phone No"
          />

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Passcode"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <Input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm passcode"
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <Input
            name="walletAddress"
            type="text"
            value={formData.walletAddress}
            onChange={handleChange}
            required
            placeholder="Wallet address"
          />

          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="landowner">Land owner</SelectItem>
                <SelectItem value="inspector">Inspector</SelectItem>
                <SelectItem value="landbuyer">Land buyer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-xs font-[500]">
            <span className="text-[#797979]">Already have an account? </span>
            <a href="/signin" className="text-[#000000]">
              Sign in!
            </a>
          </div>

          <Button
            classname={`w-full !text-lg !font-[600] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
}
