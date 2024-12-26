import React from "react";
import P from './P/P'
import Link from "next/link";
const Hero = () => {
  return (
    <div className="grid place-items-center gap-6 p-6">
      <div className="grid place-items-start gap-4">
        <P classname="font-bold text-3xl md:text-5xl text-[#282828]">Own Land With Confidence <br /> <span className="font-[400]">Track, Verify, Transfer</span></P>
        <div className="flex gap-4">
          <Link href='/signin' className="px-12 py-[0.65rem] text-white rounded text-xs bg-[#6364d5]">Sign In</Link>
          <Link href='/signup' className="bg-[#828282] px-12 py-[0.65rem] text-white rounded text-xs" >Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
