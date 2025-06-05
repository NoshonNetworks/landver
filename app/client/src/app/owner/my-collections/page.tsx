import React from "react";
import Button from "@/app/components/Button/Button";
import P from "@/app/components/P/P";
import InfoCard from "@/app/components/InfoCard";
import SearchBar from "@/app/components/SearchBar";
import CollectionsTable from "./components/CollectionsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LayersIcon from "@/app/svg/LayersIcon";
const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-[21px]">
        <P size="h5" classname="font-semibold text-[#090914]">
          Collections
        </P>
        <button className="bg-[#6E62E5] hover:bg-[#5353c5] disabled:bg-[#a0a0d8] px-6 py-2 text-base text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed">
          Register New Land
        </button>
      </div>
      <div className="flex gap-x-6 items-center mb-6">
        <InfoCard
          icon={<LayersIcon fill="#5B93FF" />}
          iconBg="#EFF5FF"
          value="24"
          description="Total Land Owned"
        />
        <InfoCard
          icon={<LayersIcon fill="#FFC327" />}
          iconBg="#FFF7E1"
          value="10"
          description="Total Land Registered"
        />
        <InfoCard
          icon={<LayersIcon fill="#FF8F6B" />}
          iconBg="#FFF4F1"
          value="04"
          description="Total Land Bought"
        />
        <InfoCard
          icon={<LayersIcon fill="#605BFF" />}
          iconBg="#F0EFFF"
          value="02"
          description="Total Land Unapproved"
        />
      </div>

      <div className="bg-white p-6 rounded-xl">
        <div className="flex items-center gap-x-[42px] mb-8">
          <SearchBar />
          <div className="flex items-center gap-x-4 text-sm text-[#7E8299] font-bold">
            <div className="py-[11px] px-[26px] bg-[#F9F9F9] rounded-lg gap-x-2 flex items-center">
              Status
            </div>
            <div className="py-[10px] px-3 bg-[#F9F9F9] rounded-lg gap-x-2 flex items-center">
              <img src="/icons/calendarIcon.svg" alt="" />
              Nov 11 - Nov 24
            </div>
          </div>
        </div>

        <CollectionsTable />

        {/* Pagination */}
        <div className="flex justify-end mt-[56px]">
          <div className="flex gap-x-4 items-center">
            <span>
              <ChevronLeft size={24} />
            </span>
            <div className="flex gap-x-1 text-[13px] font-semibold text-white">
              <div className="w-[25px] h-[25px] bg-[#6E62E5] rounded-full flex items-center justify-center text-center">
                1
              </div>
              <div className="w-[25px] h-[25px] rounded-full text-[#7E8299] flex items-center justify-center text-center">
                2
              </div>
              <div className="w-[25px] h-[25px] rounded-full text-[#7E8299] flex items-center justify-center text-center">
                3
              </div>
              <div className="w-[25px] h-[25px] rounded-full text-[#7E8299] flex items-center justify-center text-center">
                4
              </div>
            </div>
            <span>
              <ChevronRight size={24} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
