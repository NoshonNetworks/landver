"use client";
import React from "react";

const features = [
  "Effortless land registration with unique property IDs.",
  "Streamlined land inspection and verification for trusted records.",
  "Immutable, blockchain security for ownership and transactions.",
];

const FeatureList: React.FC = () => {
  return (
    <div className="space-y-4">
      {features.map((text, index) => (
        <div key={index} className="flex items-center gap-3 text-[#1F1F1F]">
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#E9E7F9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              strokeWidth={2}
              stroke="#6E62E5"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-base">{text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;