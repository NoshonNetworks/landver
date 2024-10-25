import Link from "next/link";
import React from "react";
import { Home } from "lucide-react";
import Image from "next/image";

const GuidesPage = () => {
  return (
    <div className="mx-auto p-8 bg-gradient-to-b from-green-100 to-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Home className="text-3xl mr-2 bg-green-500 text-white w-[50px] h-[50px] p-3 rounded-full shadow-md transition-transform hover:scale-105" />
        </Link>
        <h1 className="text-4xl font-light text-gray-800">Guides</h1>
      </div>
      <Image
        src="/images/LANDVER_LOGO_WHITE.jpg"
        alt="Landver Logo"
        width={100}
        height={100}
        className="mx-auto mb-6 rounded-md shadow-md"
      />
      <h2 className="text-3xl text-gray-800 mb-4 text-center p-3 border-2 border-green-600 border-l-0 border-r-0">
        Guide
      </h2>
      <header className="mb-8">
        <p className="text-gray-700 mt-2">
          At Landver, we understand the complexities of land ownership and
          management in today’s digital age. Our platform addresses these
          challenges, providing you with the knowledge and tools to navigate
          digital land management securely and efficiently.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">Understanding Land Management in a Digital World</h2>
        <h3 className="text-lg font-medium mt-4">The Challenges of Land Ownership</h3>
        <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
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
        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="text-gray-700 mt-2">At Landver, we aim to:</p>
        <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
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
        <h2 className="text-xl font-semibold">How Landver Works</h2>
        <h3 className="text-lg font-medium mt-4">Leveraging Onchain Technology</h3>
        <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
          <li>
            <strong>Secure Transactions:</strong> All land transactions are
            recorded on a blockchain for an immutable and transparent record.
          </li>
          <li>
            <strong>Smart Contracts:</strong> Automating processes to reduce
            human error and increase efficiency.
          </li>
        </ul>

        <h3 className="text-lg font-medium mt-4">User-Friendly Platform</h3>
        <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700">
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
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <ol className="list-decimal list-inside mt-2 space-y-2 text-gray-700">
          <li>
            <strong>Create an Account:</strong> Sign up on the Landver platform
            to begin your journey in digital land management.
          </li>
          <li>
            <strong>Learn the Basics:</strong> Familiarize yourself with our
            resources to protect your assets and manage land effectively.
          </li>
          <li>
            <strong>Engage with the Community:</strong> Join our forums and
            discussions to connect with other users and share insights.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <dl className="mt-2 text-gray-700">
          <dt className="font-medium mt-4">What is Landver?</dt>
          <dd>Landver is a cryptocurrency platform focused on enhancing land ownership and management through secure and transparent solutions.</dd>

          <dt className="font-medium mt-4">How does onchain technology work?</dt>
          <dd>Onchain technology records all transactions on a blockchain, ensuring they are secure, transparent, and immutable.</dd>

          <dt className="font-medium mt-4">What are the benefits of using Landver?</dt>
          <dd>Our platform simplifies the land registration process, enhances transparency, and builds trust among all stakeholders.</dd>
        </dl>
      </section>

      <footer className="mt-10 border-t pt-4">
        <h2 className="text-xl font-semibold">Conclusion</h2>
        <p className="text-gray-700 mt-2">
          At Landver, we are committed to transforming the landscape of land
          management. With our innovative use of technology, we provide a secure
          and efficient platform for landowners and inspectors alike. Explore
          our resources, join our community, and take the first step toward a
          more secure future in land ownership.
        </p>
        <p className="text-gray-700 mt-2">
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
