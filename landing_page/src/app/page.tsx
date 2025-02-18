"use client";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import WhyChooseLandVer from "./components/WhyChooseLandver";
import Footer from "./components/Footer";
import RegisterCTA from "./components/RegisterCTA";
import Benefits from "./components/Benefits";
import NewsLetterCTA from "./components/NewsLetterCTA";
// import { getCookie } from "cookies-next/server";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();


  // useEffect(() => {
  //   const isLoggedIn = getCookie("landver_token");

  //   if (isLoggedIn) {
  //     router.push("https://demo.landver.net/");
  //   }
  // }, [router]);

  return (
    <div className="bg-[#f5f5f5] text-[#1f1f1f]">
      <Navbar />
      <Hero />
      <RegisterCTA />
      <WhyChooseLandVer />
      <Benefits />
      <NewsLetterCTA />
      <Footer />
    </div>
  );
}
