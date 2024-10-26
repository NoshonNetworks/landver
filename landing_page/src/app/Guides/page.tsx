"use client"
import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";
import ThemeSwitch from "../components/ThemeSwitcher";
import React, { useState } from "react";

const GuidesPage = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <div className="mx-auto p-8 bg-gradient-to-b from-green-100 to-white shadow-lg rounded-lg dark:from-gray-800 dark:to-black dark:bg-[#060304]">
      <div className="flex justify-between items-center mb-6">
        <div className=" flex items-center gap-3">
          <Link href="/">
            <Home className="text-3xl  mr-2 bg-green-500 text-[#ffe] w-[50px] h-[50px] p-3 rounded-full" />
          </Link>
          <h1 className="text-4xl font-light text-gray-800 dark:text-white">
            Guides
          </h1>
        </div>
        <div className=" text-black">
          <ThemeSwitch />
        </div>
      </div>
      <Image
        src="/images/LANDVER_LOGO_WHITE.jpg"
        alt="Landver Logo"
        width={100}
        height={100}
        className="mx-auto mb-6 rounded-md shadow-md"
      />
      <h2 className="text-3xl text-gray-800 dark:text-white mb-4 text-center p-3 border-2 border-green-600 border-l-0 border-r-0">
        Guide
      </h2>
      <header className="mb-8">
        <p className="text-gray-700 mt-2 dark:text-white">
          At Landver, we understand the complexities of land ownership and
          management in today’s digital age. Our platform addresses these
          challenges, providing you with the knowledge and tools to navigate
          digital land management securely and efficiently.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl text-gray-700 dark:text-white font-semibold">
          Understanding Land Management in a Digital World
        </h2>
        <h3 className="text-lg text-gray-700 dark:text-white font-medium mt-4">
          The Challenges of Land Ownership
        </h3>
        <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-white">
          <li>
            <strong>Asset-Related Fraud:</strong> Landowners, inspectors, and
            regulatory bodies face significant risks from fraudulent activities.
            Protecting your assets is essential.
          </li>
          <li>
            <strong>Complex Registration Processes:</strong> Traditional land
            registration methods can be cumbersome, leading to delays and
            confusion.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Our Mission
        </h2>
        <p className="text-gray-700 mt-2 dark:text-white">
          At Landver, we aim to:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-white">
          <li>
            <strong>Enhance Transparency:</strong> Utilizing onchain technology
            to ensure secure and accessible transactions and land records.
          </li>
          <li>
            <strong>Simplify Land Registration:</strong> Streamlining the
            registration process for a user-friendly experience.
          </li>
          <li>
            <strong>Build Trust:</strong> Prioritizing integrity in land
            transactions to foster a secure environment.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          How Landver Works
        </h2>
        <h3 className="text-lg font-medium text-gray-700 dark:text-white mt-4">
          Leveraging Onchain Technology
        </h3>
        <ul className="list-disc list-inside mt-2 space-y-2 dark:text-white text-gray-700">
          <li>
            <strong>Secure Transactions:</strong> All land transactions are
            recorded on a blockchain for an immutable and transparent record.
          </li>
          <li>
            <strong>Smart Contracts:</strong> Automating processes to reduce
            human error and increase efficiency.
          </li>
        </ul>

        <h3 className="text-lg font-medium mt-4 text-gray-700 dark:text-white">
          User-Friendly Platform
        </h3>
        <ul className="list-disc list-inside mt-2 dark:text-white space-y-2 text-gray-700">
          <li>
            <strong>Intuitive Interface:</strong> Designed for ease of use,
            ensuring effortless navigation for all users.
          </li>
          <li>
            <strong>Comprehensive Resources:</strong> Access tutorials, FAQs,
            and support to understand the platform better.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Getting Started
        </h2>
        <button 
          className="w-full text-left focus:outline-none"
          onClick={() => toggleSection('gettingStarted')}
        >
          <h3 className="font-medium mt-2">{openSection === 'gettingStarted' ? '−' : '+'} Steps to Get Started</h3>
        </button>
        {openSection === 'gettingStarted' && (
          <ol className="list-decimal list-inside mt-2 space-y-2 dark:text-white text-gray-700">
            <li>
              <strong>Create an Account:</strong> Sign up on the Landver platform to begin your journey in digital land management.
            </li>
            <li>
              <strong>Learn the Basics:</strong> Familiarize yourself with our resources to protect your assets and manage land effectively.
            </li>
            <li>
              <strong>Engage with the Community:</strong> Join our forums and discussions to connect with other users and share insights.
            </li>
          </ol>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          FAQs
        </h2>
        <div className="mt-2 text-gray-700 dark:text-white">
          {[
            {
              question: "What is Landver?",
              answer: "Landver is a cryptocurrency platform focused on enhancing land ownership and management through secure and transparent solutions."
            },
            {
              question: "How does onchain technology work?",
              answer: "Onchain technology records all transactions on a blockchain, ensuring they are secure, transparent, and immutable."
            },
            {
              question: "What are the benefits of using Landver?",
              answer: "Our platform simplifies the land registration process, enhances transparency, and builds trust among all stakeholders."
            }
          ].map((faq, index) => (
            <div key={index} className="mb-4">
              <button 
                className="w-full text-left focus:outline-none font-medium mt-2"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className=" font-bold">{openFAQ === index ? '−' : '+'} {faq.question}</h3>
              </button>
              {openFAQ === index && (
                <p className="mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Conclusion
        </h2>
        <p className="text-gray-700 mt-2 dark:text-white">
          At Landver, we are committed to transforming the landscape of land
          management. With our innovative use of technology, we provide a secure
          and efficient platform for landowners and inspectors alike. Explore
          our resources, join our community, and take the first step toward a
          more secure future in land ownership.
        </p>
        <p className="text-gray-700 mt-2 dark:text-white">
          For more information, visit{" "}
          <a href="your-website-url" className="text-blue-500 hover:underline">
            Landver
          </a>{" "}
          or contact our support team. Together, let’s build a trustworthy and
          transparent land management system!
        </p>
      </footer>
    </div>
  );
};

export default GuidesPage;
