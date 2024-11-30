import React from "react";
import Button from "./Button/Button";
import P from './P/P'
const Hero = () => {
  return (
    <div className="grid place-items-center gap-6 p-6">
      <div className="grid justify-center items-center place-items-center gap-4">
        <P size="h4" classname="font-bold text-[#282828]">Own Land With Confidence</P>
        <P size="h4" classname="font-bold text-[#282828]">Track, Verify, Transfer</P>
      </div>
      <div className="flex gap-4">
        <Button size="full">Sign In</Button>
        <Button variant="gray" size="full">Sign Up</Button>
      </div>
    </div>
  );
};

export default Hero;
