'use client'
import React, { useState, useEffect } from "react";
import P from "./P/P";
import Image from "next/image";

const WhyChooseLandver = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const uniqueOfferings = [
    {
      url: "/images/image 5.png",
      alt: "farm land",
      heading: "Land Registration",
      description:
        "Every land registration goes through a thorough verification process. Designated inspectors assess each submission, ensuring authenticity and compliance with all standards. ",
    },
    {
      url: "/images/image 6.png",
      alt: "open field",
      heading: "Land Verification",
      description:
        "Once verified, the land receives official approval, and a digital certificate of ownership is minted as an NFT. This NFT represents an unchangeable record of ownership.",
    },
    {
      url: "/images/image 7.png",
      alt: "location info in a field",
      heading: "NFT Representation",
      description:
        "Each verified land parcel is minted as a unique NFT, embedding key details like location, area, usage, and ID within its metadata. These NFTs act as digital certificates of ownership.",
    },
    {
      url: "/images/image 5.png",
      alt: "farm land",
      heading: "Inspector Management",
      description:
        "Every land registration goes through a thorough verification process. Designated inspectors assess each submission, ensuring authenticity and compliance with all standards.",
    },
  ];

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === uniqueOfferings.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(slider);
  });

  return (
    <div className="grid justify-center place-content-center place-items-center gap-4 p-4 ">
      <P size="h4" classname="text-center">
        Our Unique Offerings
      </P>
      <P classname="text-center w-full md:w-[80%] lg:w-[60%] leading-relaxed">
        Our Unique Offerings LandVer offers secure, NFT-backed land ownership
        that’s easy to register, verify, and transfer on the blockchain. Trust
        in transparent, immutable records for seamless land management.
      </P>

      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3 ">
        {uniqueOfferings.map((offering, index) => (
          <div
            key={index}
            className="w-[250px] p-4 border bg-[#e9f3f1] rounded-lg flex flex-col "
          >
            <Image
              src={offering.url}
              alt={offering.alt}
              height={250}
              width={250}
              className="object-cover rounded"
            />
            <p className="text-purple-800 font-semibold mt-2">
              {offering.heading}
            </p>
            <P classname="leading-relaxed mt-1">{offering.description}</P>
          </div>
        ))}
      </div>

      <div className="md:hidden w-full relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {uniqueOfferings.map((offering, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-4 border bg-[#e9f3f1] rounded-lg flex flex-col items-center"
            >
              <Image
                src={offering.url}
                alt={offering.alt}
                height={150}
                width={150}
                className="object-cover rounded"
              />
              <p className="text-purple-800 font-semibold mt-2">
                {offering.heading}
              </p>
              <P classname="leading-relaxed text-center mt-1">
                {offering.description}
              </P>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseLandver;
