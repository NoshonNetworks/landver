import React, { useState } from "react";
import Image from "next/image";
import P from "./P/P";

const NewsLetterCTA = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage(data.message || "Subscription failed. Try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section
      className="flex flex-col justify-center items-center gap-3 relative py-6 px-4 sm:px-8 bg-[#eae8fb]"
      id="contact"
    >
      <div className="w-full max-w-[500px] relative flex justify-center items-center gap-3">
        <P classname="text-[#6e62e5] text-center text-base text-[30px] font-bold ">
          Newsletter
        </P>

        <div className="flex items-center justify-between bg-white border-2 rounded-full p-2 w-full">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-none p-4 rounded-full w-full focus:outline-none text-sm"
            placeholder="Enter your email"
          />
          <button
            onClick={handleSubscribe}
            className="bg-[#6e62e5] rounded-full p-3 ml-2 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "..." : (
            <Image
              src="/images/Path.svg"
              alt="paper airplane"
              height={23}
              width={25}
            />
          )}
          </button>
        </div>
      </div>
      {message && (
        <p className="text-sm text-center text-gray-700 mt-2">{message}</p>
      )}
    </section>
  );
};

export default NewsLetterCTA;