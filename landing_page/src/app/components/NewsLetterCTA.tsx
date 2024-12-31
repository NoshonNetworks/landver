import React from "react";
import Image from "next/image";
import P from "./P/P";

const NewsLetterCTA = () => {
  return (
    <section 
      className="flex justify-center items-center gap-3 relative py-6 px-4 sm:px-8 bg-[#eae8fb]" 
      id="contact"
    >
      <div className="w-full max-w-[500px] relative flex justify-center items-center gap-3">
        <P classname="text-[#6e62e5] text-center text-base text-[30px] font-bold ">
          Newsletter
        </P>

        <div className="flex items-center justify-between bg-white border-2 rounded-full p-2 w-full">
          <input
            type="text"
            name="email"
            id="email"
            className="bg-white border-none p-4 rounded-full w-full focus:outline-none text-sm"
            placeholder="Enter your email"
          />
          <button className="bg-[#6e62e5] rounded-full p-3 ml-2 flex items-center justify-center">
            <Image
              src="/images/Path.svg"
              alt="paper airplane"
              height={23}
              width={25}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterCTA;