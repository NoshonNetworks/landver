import React from "react";
import P from "./P/P";
import Image from "next/image";
const Benefits = () => {
  const benefits = [
    {
      url: "/images/tick-square.svg",
      header: "Immutable Ownership",
      alt: "ticked square",
      description:
        "Each verified land parcel is represented by an NFT, providing undeniable proof of ownership",
      bColor: "#6E62E5",
      color: "white",
    },
    {
      url: "/images/user-tick.svg",
      header: "Inspector Backed Verification",
      alt: "user ticked",
      description:
        "Approved by trusted inspectors, ensuring every land record is authentic and secure. ",
      bColor: "#e9f3f1",
      color: "black",
    },
    {
      url: "/images/arrow.svg",
      header: "Effortless Transfer",
      alt: "arrows",
      description:
        "Ownership transfers are quick, transparent, and recorded on-chain, keeping your assets safe",
      bColor: "#e9f3f1",
      color: "black",
    },
    {
      url: "images/people.svg",
      header: "Transparent Management",
      alt: "people",
      description:
        "All land details, from registration to transfer, are visible on a decentralized ledger, promoting trust and accountability.",
      bColor: "#6E62E5",
      color: "white",
    },
  ];
  return (
    <div className="mb-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <P classname="capitalize text-center  mt-10" size="h4">
          Experience The Unique Benefits of Landver
        </P>
        <P classname="w-[100%] md:w-[40%] text-center p-5">
          LandVer offers secure, NFT-backed land ownership that’s easy to
          register, verify, and transfer on the blockchain. Trust in
          transparent, immutable records for seamless land management.
        </P>
      </div>
      <div className="grid justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center w-fit place-content-center place-items-center">
          {benefits.map((benefit, i: number) => {
            return (
              <div
                className="w-full max-w-[400px] h-[250px] flex flex-col justify-center p-3 items-center gap-3"
                key={benefit.header + i}
                style={{
                  background: benefit.bColor,
                  color: benefit.color,
                }}
              >
                <Image
                  src={benefit.url}
                  alt={benefit.alt}
                  height={30}
                  width={30}
                />
                <P size="h6">{benefit.header}</P>
                <P classname="text-center leading-relaxed">
                  {benefit.description}
                </P>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
