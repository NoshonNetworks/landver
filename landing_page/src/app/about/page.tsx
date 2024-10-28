// app/about/page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  FileBadgeIcon as NFT,
  CheckCircle,
  User,
  FileText as Document,
  ShieldCheck,
  Eye,
  FileSearch,
  Coins as CurrencyDollar,
} from "lucide-react";
import ThemeSwitch from "../components/ThemeSwitcher";

const AboutPage = () => {
  return (
    <div className="mx-auto p-8 bg-gradient-to-b from-green-100 to-white shadow-lg rounded-lg dark:from-gray-800 dark:to-black dark:bg-[#060304]">
      <div className="flex justify-between items-center mb-6">
        <div className=" flex items-center gap-3">
          <Link href="/">
            <Home className="text-3xl  mr-2 bg-green-500 text-[#ffe] w-[50px] h-[50px] p-3 rounded-full" />
          </Link>
          <h1 className="text-4xl font-light text-gray-800 dark:text-white">
            About Landver
          </h1>
        </div>
        <div className=" text-black">
          {" "}
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
      <h2 className="text-3xl text-gray-800 mb-4 dark:text-white text-center p-3 border-2 border-green-600 border-l-0 border-r-0">
        How It Works
      </h2>

      <p className="text-lg text-gray-700 mb-4 dark:text-white">
        At Landver, we recognize the critical challenges associated with land
        ownership and management in today’s digital landscape. Asset-related
        fraud remains a significant concern for landowners, inspectors, and
        regulatory bodies alike. Our mission is to combat these issues head-on
        by providing a secure, user-friendly platform that not only simplifies
        the land registration process but also enhances transparency and trust
        among all stakeholders involved. We leverage onchain technology to
        create a robust framework for land management, allowing for a seamless
        interaction between landowners and land inspectors.
      </p>

      <p className="text-lg text-gray-700 mb-4 dark:text-white">
        The Landver platform serves as a dynamic hub where landowners can
        register their properties with confidence, while inspectors conduct
        thorough reviews to ensure compliance and accuracy. Here’s a deeper dive
        into how our process works, step by step:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2">
        <li className="text-lg text-gray-700 dark:text-white">
          <strong>
            <User className="inline text-green-600" size={24} /> Land Owners:
          </strong>{" "}
          The journey begins with landowners who wish to register their
          properties on our platform. Users can easily sign up and submit
          essential documentation, such as proof of ownership{" "}
          <Document className="inline text-blue-500" size={24} />, land surveys,
          and other relevant information. Once submitted, the registration
          details are securely recorded on our blockchain{" "}
          <ShieldCheck
            className="inline text-gray-700 dark:text-blue-700"
            size={24}
          />
          , creating a permanent and tamper-proof record of ownership.
        </li>

        <li className="text-lg text-gray-700 dark:text-white">
          <strong>
            <Eye className="inline text-yellow-500" size={24} /> Land
            Inspectors:
          </strong>{" "}
          After a landowner submits their registration, our certified inspectors
          step in to perform a meticulous review{" "}
          <FileSearch className="inline text-purple-500" size={24} /> of the
          submitted documents and the physical property itself. This phase is
          essential for verifying the authenticity of the ownership claims.
        </li>

        <li className="text-lg text-gray-700 dark:text-white">
          Once the inspection is successfully completed, the landowner receives
          an NFT <NFT className="inline text-blue-900" size={30} />{" "}
          (Non-Fungible Token) that serves as a digital proof of ownership. This
          NFT encapsulates all relevant details about the land, including
          ownership history, inspection records, and any associated
          transactions.
        </li>
      </ul>

      <p className="text-lg text-gray-700 mb-4 dark:text-white">
        Furthermore, the Landver platform integrates advanced technology to
        ensure that every interaction is transparent and verifiable{" "}
        <CheckCircle className="inline text-green-600" size={24} />. Users can
        track the status of their registrations, view inspection results, and
        access their NFTs at any time. This level of transparency is
        unprecedented in the realm of land management and significantly
        mitigates the risks associated with traditional processes.
      </p>

      <p className="text-lg text-gray-700 mb-4 dark:text-white">
        Our use of NFTs revolutionizes how land ownership is perceived and
        managed, creating new avenues for economic engagement and stability{" "}
        <CurrencyDollar className="inline text-green-700" size={24} />.
      </p>

      <Link href="/" className="text-lg text-blue-600 hover:underline mb-4">
        Back to Home
      </Link>
    </div>
  );
};

export default AboutPage;
