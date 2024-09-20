import React from "react";
import lanverHeader from "../assets/landver_body.jpg";
import starknetLogo from "../assets/SN-Symbol-Flat colour-On dark bg.png";
const Header: React.FC = () => {
  return (
    <div>
      <div className=" ">
        <img
          src={lanverHeader}
          alt=""
          className="w-full object-contain  bg-[#510001] sm:h-[20dvh] md:h-[70dvh] m-0 "
        />
        <div className="bg-[#510001]">
          <h1 className=" text-center text-[20px] md:text-[50px] text-white">
            LANDVER
          </h1>
          <div className="w-full flex items-center justify-center">
            <h2 className="md:text-[20px] sm:text-[10px] text-center m-0 py-2 text-white inline">
              Land Management Library Built on Starknet
            </h2>
            <img
              src={starknetLogo}
              alt=""
              className=" ml-2 inline w-[30px] h-[30px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
