import React, { useState } from "react";
import Image from "next/image";
import P from "./P/P";

const NewsLetterCTA = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage("");

  try {
    console.log('Sending email:', email);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log('API response:', data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }
    
      setMessage("Subscription successful! 🎉");
      setEmail("");
    } catch (error: unknown) {
      console.error('Subscription error:', error);
    
      if (error instanceof Error) {
        setMessage(error.message || "Something went wrong. Please try again.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }    
};

  return (
    <section
      className="flex justify-center items-center gap-3 relative py-6 px-4 sm:px-8 bg-[#eae8fb]"
      id="contact"
    >
      <div className="w-full max-w-[500px] relative flex flex-col justify-center items-center gap-3">
        <P classname="text-[#6e62e5] text-center text-base text-[30px] font-bold ">
          Newsletter
        </P>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between bg-white border-2 rounded-full p-2 w-full"
        >
          <input
            type="email"
            name="email"
            id="email"
            className="bg-white border-none p-4 rounded-full w-full focus:outline-none text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-[#6e62e5] rounded-full p-3 ml-2 flex items-center justify-center ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5b50c7]"
            } transition-colors`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <Image
                src="/images/Path.svg"
                alt="Submit newsletter"
                height={23}
                width={25}
              />
            )}
          </button>
        </form>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("🎉") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsLetterCTA;