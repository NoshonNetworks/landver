"use client";
import Card from "../../../../app/components/ui/overviewcard";
import { PlusCircle } from "lucide-react";
import React from "react";
import OverviewSvg from "./overviewsvg";
import { useAppContext } from "../../../../app/context/appContext";
import { useReadContract } from "@starknet-react/core";
import { ABI } from "../../../../app/abis/landRegistry.abi";

const Overview = () => {
  const { contactAddress, address } = useAppContext();
  const { balance } = useAppContext();
  const contract = useReadContract({
    abi: ABI,
    functionName: "get_lands_by_owner",
    address: contactAddress as "0x",
    args: [address as string],
  });

  // Use 'const' instead of 'let' since landCount is never reassigned
  const landCount = contract.data ? contract.data.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 w-full">
      {/* Discover Now Card with SVG */}
      <Card
        title="Discover, transfer and register your lands!"
        buttonText="Discover Now"
        className="bg-primary text-white flex flex-col items-start"
        image={<OverviewSvg />}
        onButtonClick={() => alert("Discover Now Clicked")}
      />

      {/* Owned Land Card */}
      <Card
        title="Total Owned Land"
        value={landCount}
        buttonText="View Details"
        className="bg-white"
        badges={landCount}
        onButtonClick={() => alert("View Details Clicked")}
        svgColor="bg-green-100"
      />

      {/* Balance Card */}
      <Card
        title="My balance"
        value={balance}
        buttonText="Top Up Balance"
        className="bg-white"
        icon={<PlusCircle className="w-6 h-6 text-primary" />}
        onButtonClick={() => alert("Top Up Balance Clicked")}
        svgColor="bg-blue-100"
      />
    </div>
  );
};

export default Overview;
