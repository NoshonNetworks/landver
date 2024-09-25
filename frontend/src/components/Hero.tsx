import React from "react";
import { ArrowRight, Globe, Code, Package } from "lucide-react";
import LandverLogo from "./../assets/LANDVER_BLACK.jpg";
import StarknetLogo from "../assets/SN-Symbol-Flat colour-On dark bg.png";
const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-4 lg:py-8 xl:py-8 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="flex items-center space-x-4">
            <img
              src={LandverLogo}
              alt="Landver Logo"
              className="w-20 h-20 rounded-md"
            />
            <h1 className="text-3xl font-thin tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Landver
            </h1>
          </div>

          <p className="mx-auto max-w-[700px] text-gray-900 md:text-xl">
            Revolutionize land management with blockchain technology. Secure,
            transparent, and efficient property management at your fingertips.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 w-full">
              <img
                src={StarknetLogo}
                alt="StarkNet Logo"
                className="w-10 h-10 rounded-md"
              />
              <div className="text-left h-auto md:p-2 lg:p-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Powered by StarkNet
                </h2>
                <p className="text-sm text-gray-600">
                  Unparalleled security and scalability
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 w-full">
              <Code className="h-10 w-10 text-green-600" />
              <div className="text-left h-auto">
                <h2 className="text-xl font-semibold text-gray-800">
                  Developer-Friendly SDKs
                </h2>
                <p className="text-sm text-gray-600 ">
                  Integrate Landver into your applications
                </p>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-150"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-white transition-colors duration-150"
            >
              Learn More
            </a>
          </div>

          <div className="flex items-center justify-center space-x-2 pt-4">
            <Globe className="h-5 w-5 text-green-500" />
            <p className="text-sm text-gray-900">
              Starknet's first Land Management Library
            </p>
          </div>
        </div>
      </div>

      {/* future use */}
      {/* <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-xl">
            <img
              src="/path-to-platform-interface.png"
              alt="Landver Platform Interface"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-semibold mb-1">
                Intuitive Dashboard
              </h3>
              <p className="text-sm">
                Manage your properties with ease using our StarkNet-powered
                platform
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 md:px-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Available SDKs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {["TypeScript", "Python", "Rust", "Go"].map((lang) => (
              <div
                key={lang}
                className="flex items-center space-x-2 p-3 border rounded-md"
              >
                <Package className="h-6 w-6 text-green-600" />
                <span>{lang} SDK</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
