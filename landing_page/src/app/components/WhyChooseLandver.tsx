"use client";
import React, { useState, useEffect } from "react";
import P from "./P/P";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

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
    <motion.div
      className="grid justify-center place-content-center place-items-center gap-4 p-4"
      id="about"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <P size="h4" classname="text-center text-2xl font-semibold">
          Our Unique Offerings
        </P>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <P classname="text-center w-full md:w-[80%] lg:w-[60%] leading-relaxed text-base">
          Our Unique Offerings LandVer offers secure, NFT-backed land ownership
          that&apos;s easy to register, verify, and transfer on the blockchain.
          Trust in transparent, immutable records for seamless land management.
        </P>
      </motion.div>

      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
        {uniqueOfferings.map((offering, index) => (
          <motion.div
            key={index}
            className="w-[250px] p-4 border bg-[#e9f3f1] rounded-lg flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={offering.url}
                alt={offering.alt}
                height={250}
                width={250}
                className="object-cover rounded"
              />
            </motion.div>
            <motion.p
              className="text-purple-800 font-semibold mt-2 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {offering.heading}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <P classname="leading-relaxed mt-1 text-sm">
                {offering.description}
              </P>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="md:hidden w-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="flex"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {uniqueOfferings.map((offering, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 p-4 border bg-[#e9f3f1] rounded-lg flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src={offering.url}
                  alt={offering.alt}
                  height={150}
                  width={150}
                  className="object-cover rounded"
                />
                <p className="text-purple-800 font-semibold mt-2 text-lg">
                  {offering.heading}
                </p>
                <P classname="leading-relaxed text-center mt-1 text-sm">
                  {offering.description}
                </P>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WhyChooseLandver;
