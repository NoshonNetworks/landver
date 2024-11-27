import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import WhyChooseLandVer from "./components/WhyChooseLandver";
import Footer from "./components/Footer";
import RegisterCTA from "./components/RegisterCTA";
import Benefits from "./components/Benefits";
import NewsLetterCTA from "./components/NewsLetterCTA";
export default function Home() {
  return (
    <div className="bg-[#f5f5f5] text-[#1f1f1f]">
      <Navbar />
      <Hero />
      <RegisterCTA />
      <WhyChooseLandVer />
      <Benefits />
      <NewsLetterCTA/>
      <Footer />
    </div>
  );
}
