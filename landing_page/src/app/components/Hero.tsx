import React from "react";
import P from './P/P'
import Link from "next/link";
const Hero = () => {
  return (
    <div className="grid place-items-center gap-6 p-6">
      <div className="grid justify-center items-center place-items-center gap-4">
        <P size="h4" classname="font-bold text-[#282828]">Own Land With Confidence</P>
        <P size="h4" classname="font-bold text-[#282828]">Track, Verify, Transfer</P>
      </div>
      <div className="flex gap-4">
        <Link href='/signin' className="px-12 py-[0.65rem] text-white rounded text-xs bg-[#6364d5]">Sign In</Link>
        <Link href='/signup' className="bg-[#828282] px-12 py-[0.65rem] text-white rounded text-xs" >Sign Up</Link>
      </div>
    </div>
  );
};

export default Hero;
