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
import { validatePassword, TPasswordValidationResult } from "../lib/utils/RegEx";
import { useRouter } from "next/navigation";
import { api } from "../lib/axios";
import { setCookie } from 'cookies-next/client';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface SignupError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
    role: "",
  });
  const [passwordValidation, setPasswordValidation] = useState<TPasswordValidationResult>({
    isValid: false,
    unmetRequirements: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!passwordValidation.isValid) {
      toast.error("Password does not meet requirements");
      setLoading(false);
      return;
    }

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



      // localStorage.setItem("token", response.data.token);

      setCookie('landver_token', response.data.data.token);

      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("https://demo.landver.net")
      }, 1000);
    } catch (err: unknown) {
      const error = err as SignupError;
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      setPasswordValidation(validatePassword(e.target.value));
    }
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
          <h1 className="text-2xl font-semibold">Let&apos;s set up</h1>
          <p className="mt-2 text-sm font-light text-gray-600">
            Hey, enter your details to sign up for an account!
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
            placeholder="Password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
          />

          <ul className="text-sm text-red-500">
            {passwordValidation.unmetRequirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>

          <Input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-sm font-medium"
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
            placeholder="Account Address"
          />

          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="landowner" className="text-sm">Land owner</SelectItem>
                <SelectItem value="inspector" className="text-sm">Inspector</SelectItem>
                <SelectItem value="landbuyer" className="text-sm">Land buyer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="text-sm font-medium">
            <span className="text-[#797979]">Already have an account? </span>
            <a href="/signin" className="text-[#000000]">
              Sign in!
            </a>
          </div>

          <Button
            classname="w-full text-sm font-semibold"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
}