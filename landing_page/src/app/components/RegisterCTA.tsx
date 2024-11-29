"use client";
import React, { useState } from "react";
import Image from "next/image";
import P from "./P/P";
// import Button from "./Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
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
    <section className="px-4 py-8 flex justify-center">
      <div className="bg-[#e9f3f1] rounded-lg border p-4 md:p-6 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col md:w-1/3">
            <P size="h6" classname="capitalize font-bold mb-3">
              Register Your land with Ease
            </P>
            <P classname="leading-[1.7] mb-6">
              LandVer simplifies land registration. Enter essential details
              -like location, area and use - and submit securely on our
              blockchain based platform
            </P>
            <Link
              className="w-full md:w-fit bg-[#6364d5] text-white px-6 py-2 rounded text-xs"
              href="https://demo.landver.net"
              target="_blank"
            >
              Get Started
            </Link>
          </div>

          <div className="hidden md:flex gap-4 flex-grow justify-center items-start">
            {imagesArray.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-[180px] h-[180px] border">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <P classname="mt-2 text-center">{image.description}</P>
              </div>
            ))}
          </div>

          <div className="md:hidden relative">
            <div className="relative h-[250px] w-full">
              <Image
                src={imagesArray[currentSlide].url}
                alt={imagesArray[currentSlide].alt}
                fill
                className="object-cover rounded-lg"
              />
              <P classname="absolute bottom-4 left-0 right-0 text-center bg-black/50 text-white py-2">
                {imagesArray[currentSlide].description}
              </P>
            </div>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2">
              <button
                onClick={prevSlide}
                className="bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {imagesArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-gray-800" : "bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterCTA;
