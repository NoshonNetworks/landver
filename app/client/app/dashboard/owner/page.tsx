"use client";
import React from "react";
// import Sidebar from "@/app/components/layout/Sidebar";
// import Header from "@/app/components/layout/Header";
import RegisterLandForm from "../../../app/components/sections/registerLandForm";
import Overview from "./components/overview";
import Button from "../../../app/components/ui/button";
import { X } from "lucide-react";

//import Overview from '@/app/components/dashboard/Overview';

const OwnerDashboard = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    React.useState<boolean>(false);
  async function handleRegisterButtonCLick() {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  }

  if (isRegisterModalOpen)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
          <button
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => setIsRegisterModalOpen(false)}
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Register New Land
          </h2>
          <RegisterLandForm />
        </div>
      </div>
    );

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between">
          <p className="text-bold text-2xl">Overview</p>
          <Button onClick={handleRegisterButtonCLick}>Register New Land</Button>
        </div>
        <Overview />
      </main>
    </div>
  );
};

export default OwnerDashboard;
