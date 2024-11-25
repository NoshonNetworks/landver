import { LandList } from "@/app/components/LandsList";
import React from "react";
import Button from "@/app/components/Button/Button";
import P from '@/app/components/P/P'
const page = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <P size="h3" classname="font-bold">Overview</P>
        <Button>Register New Land</Button>
      </div>

      <LandList />
    </div>
  );
};

export default page;
