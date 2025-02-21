"use client";
import React, { useState } from "react";
import Image from "next/image";
import P from "./P/P";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "../utils/animations";

const RegisterCTA = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const imagesArray = [
    {
      url: "/images/image 4.png",
      description: "Land For Sale",
      alt: "image of a field",
    },
    {
      url: "/images/image 1.png",
      description: "Ranch For Lease",
      alt: "image of a ranch",
    },
    {
      url: "/images/image 2.png",
      description: "Farmland For Lease",
      alt: "image of a farmland",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === imagesArray.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? imagesArray.length - 1 : prev - 1));
  };

  return (
    <motion.section
      className="px-4 py-8 flex justify-center"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <motion.div
        className="bg-[#e9f3f1] rounded-lg border p-4 md:p-6 w-full max-w-6xl"
        variants={fadeInUp}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div className="flex flex-col md:w-1/3" variants={fadeInUp}>
            <P size="h6" classname="capitalize font-semibold mb-3 text-xl">
              Register Your land with Ease
            </P>
            <P classname="leading-[1.7] mb-6 text-base">
              LandVer simplifies land registration. Enter essential details
              -like location, area and use - and submit securely on our
              blockchain based platform
            </P>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="w-fit md:w-fit bg-[#6364d5] text-white px-6 py-2 rounded text-sm"
                href="https://demo.landver.net"
                target="_blank"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>

          <div className="hidden md:flex gap-4 flex-grow justify-center items-start">
            {imagesArray.map((image, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="relative w-[180px] h-[180px] border"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </motion.div>
                <P classname="mt-2 text-center text-sm">{image.description}</P>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="relative h-[250px] w-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imagesArray[currentSlide].url}
                  alt={imagesArray[currentSlide].alt}
                  fill
                  className="object-cover rounded-lg"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <P classname="absolute bottom-4 left-0 right-0 text-center bg-black/50 text-white py-2 text-sm">
                    {imagesArray[currentSlide].description}
                  </P>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2">
              <motion.button
                onClick={prevSlide}
                className="bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {imagesArray.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-gray-800" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default RegisterCTA;
