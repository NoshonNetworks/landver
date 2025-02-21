"use client";
import React from "react";
import P from "./P/P";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

const Hero = () => {
  return (
    <motion.div
      className="grid place-items-center gap-6 p-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="grid justify-center items-center place-items-center gap-4"
        variants={fadeInUp}
      >
        <P size="h4" classname="font-bold text-[#282828] text-2xl">
          Own Land With Confidence
        </P>
        <P size="h4" classname="font-bold text-[#282828] text-2xl">
          Track, Verify, Transfer
        </P>
      </motion.div>
      <motion.div className="flex gap-4" variants={fadeInUp}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/signin"
            className="px-12 py-[0.65rem] text-white rounded text-sm bg-[#6364d5]"
          >
            Sign In
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/signup"
            className="bg-[#828282] px-12 py-[0.65rem] text-white rounded text-sm"
          >
            Sign Up
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
