"use client";
import React from "react";
import P from "./P/P";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../utils/animations";

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
    <motion.div
      className="mb-10"
      id="experience"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div
        className="flex flex-col justify-center items-center gap-1"
        variants={fadeInUp}
      >
        <P classname="capitalize text-center mt-10 text-2xl font-semibold">
          Experience The Unique Benefits of Landver
        </P>
        <P classname="w-[100%] md:w-[40%] text-center p-5 text-base">
          LandVer offers secure, NFT-backed land ownership that&apos;s easy to
          register, verify, and transfer on the blockchain. Trust in
          transparent, immutable records for seamless land management.
        </P>
      </motion.div>
      <div className="grid justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center w-fit place-content-center place-items-center">
          {benefits.map((benefit, i) => {
            return (
              <motion.div
                key={benefit.header + i}
                className="w-full max-w-[400px] h-[250px] flex flex-col justify-center p-3 items-center gap-3"
                style={{
                  background: benefit.bColor,
                  color: benefit.color,
                }}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={benefit.url}
                  alt={benefit.alt}
                  height={30}
                  width={30}
                />
                <P classname="text-lg font-medium">{benefit.header}</P>
                <P classname="text-center leading-relaxed text-sm">
                  {benefit.description}
                </P>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Benefits;
