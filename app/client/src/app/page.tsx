// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAccount } from "@starknet-react/core";
// import WalletConnector from "@/components/Connector";
// import Modal from "@/components/Modal/Modal";
// import { Button } from "@/components/Button/Button";
// import Image from "next/image";
// import { useLoginStore } from "@/store/loginStore";
// import { LandPlot, ShieldCheck, Wallet, ArrowRight } from "lucide-react";
// import { MoonLoader } from "react-spinners";

// const Home = () => {
//     const loginStore = useLoginStore();
//     const { status, address } = useAccount();
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [userType, setUserType] = useState<"inspector" | "owner" | null>(
//         null
//     );
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     const toggleModal = () => setModalOpen(!isModalOpen);

//     const handleFormSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         if (!userType) {
//             setError("Please select a user type.");
//             return;
//         }

//         const allowedUserTypes = ["owner", "inspector"];
//         if (!allowedUserTypes.includes(userType)) {
//             setError("Not allowed user type.");
//             return;
//         }
//         window.localStorage.setItem("user-type", userType);
//         loginStore.setUserType(userType);
//         router.push("/dashboard");
//     };

//     const UserTypeCard = ({
//         type,
//         icon: Icon,
//         title,
//         description,
//     }: {
//         type: "owner" | "inspector";
//         icon: React.ElementType;
//         title: string;
//         description: string;
//     }) => (
//         <div
//             onClick={() => setUserType(type)}
//             className={`
//         border-2 p-4 rounded-lg cursor-pointer transition-all duration-300
//         ${
//             userType === type
//                 ? "border-purple-600 bg-purple-50 scale-105"
//                 : "border-gray-200 hover:border-purple-300"
//         }
//       `}
//         >
//             <div className="flex items-center mb-3">
//                 <Icon
//                     className={`mr-3 ${
//                         userType === type ? "text-purple-600" : "text-gray-500"
//                     }`}
//                 />
//                 <h3 className="text-lg font-semibold">{title}</h3>
//             </div>
//             <p className="text-gray-600">{description}</p>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#E9F3F1] py-8 px-4 overflow-y-auto flex flex-col justify-center items-center">
//             <div className="max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl">
//                 {/* Left Side - Descriptive Section */}
//                 <div className="bg-gradient-to-br from-purple-400 to-indigo-700 p-8 md:flex flex-col justify-center text-white hidden">
//                     <Image
//                         src="/images/logo.svg"
//                         alt="landver logo"
//                         height={100}
//                         width={100}
//                         className="mb-6"
//                     />
//                     <h1 className="text-3xl font-bold mb-4">Land Registry Protocol</h1>
//                     <p className="text-lg mb-6 opacity-80">
//                         Secure, transparent, and efficient land registration powered by blockchain technology.
//                     </p>
//                     <div className="space-y-4">
//                         <div className="flex items-center">
//                             <LandPlot className="mr-3 text-yellow-300" />
//                             <span>Immutable Land Records</span>
//                         </div>
//                         <div className="flex items-center">
//                             <ShieldCheck className="mr-3 text-green-300" />
//                             <span>Verified Ownership Verification</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Side - Connection & User Type */}
//                 <div className="p-8 flex flex-col justify-center">
//                     {status !== "connected" ? (
//                         <div className="text-center">
//                             <Wallet className="mx-auto text-purple-600 mb-4" size={64} />
//                             <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
//                             <p className="text-gray-600 mb-6">Connect a supported wallet to access Land Registry</p>
//                             <Button
//                                 onClick={toggleModal}
//                                 classname="mx-auto flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
//                             >
//                                 {!isModalOpen ? (
//                                     <>
//                                         Connect Wallet
//                                         <ArrowRight size={20} />
//                                     </>
//                                 ) : (
//                                     <MoonLoader color="#fff" size={20} />
//                                 )}
//                             </Button>

//                             {isModalOpen && (
//                                 <Modal onClose={toggleModal} isOpen={isModalOpen}>
//                                     <div className="text-center">
//                                         <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
//                                         <WalletConnector />
//                                     </div>
//                                 </Modal>
//                             )}
//                         </div>
//                     ) : (
//                         <form onSubmit={handleFormSubmit}>
//                             <div className="text-center mb-6">
//                                 <p className="text-gray-600">Connected Wallet:</p>
//                                 <p className="font-bold text-purple-600">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
//                             </div>

//                             <h2 className="text-2xl font-bold mb-4 text-center">Select Your Role</h2>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                                 <UserTypeCard
//                                     type="owner"
//                                     icon={LandPlot}
//                                     title="Land Owner"
//                                     description="Manage and verify your land ownership"
//                                 />
//                                 <UserTypeCard
//                                     type="inspector"
//                                     icon={ShieldCheck}
//                                     title="Land Inspector"
//                                     description="Verify and validate land records"
//                                 />
//                             </div>

//                             {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//                             <Button
//                                 type="submit"
//                                 classname="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
//                             >
//                                 {!isLoading ? (
//                                     <>
//                                         Proceed to Dashboard
//                                         <ArrowRight size={20} />
//                                     </>
//                                 ) : (
//                                     <MoonLoader color="#fff" size={20} />
//                                 )}
//                             </Button>
//                         </form>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;
"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
const Next = () => {
  return (
    <div className="flex flex-col md:items-start justify-center md:px-[40px] px-[20px] w-full min-h-screen overflow-auto">
      <Image
        src="/images/logo.png"
        alt="picture of the author"
        width={100}
        height={100}
        className="md:mt-[40px] mt-[20px]"
      />
      <div className="flex flex-col md:flex-row  md:justify-between justify-center md:mt-[50px] mt-[20px] w-full">
        <div className="text-center md:text-start">
          <h1 className="md:text-[48px] text-[30px] leading-9 font-bold text-[#6E62E5] md:w-[489px] md:leading-[64px]">
            Land Registry Protocol
          </h1>
          <p className="text-gray-400 mt-2 md:text-[18px] text-[14px] md:w-[430px]">
            Secure, transparent, and efficient land registration powered by
            blockchain technology.
          </p>
          <h2 className="text-[#6B21A8] text-[14px] font-semibold mt-[20px] md:w-[500px] md:text-[20px]">
            A Secure Platform for Land Registration, Inspection, and Validation
            on Starknet
          </h2>
          <ul className="text-gray-600 mt-[32px] text-start space-y-3 md:space-y-[20px]">
            <li className="flex items-center justify-start gap-1 md:gap-2">
              <div className="size-[30px] bg-[#E9E7F9] rounded-full flex items-center justify-center aspect-square">
                <FaCheck className="text-[#6E62E5] text-[12px] md:text-[15px]" />
              </div>
              <p className="font-medium md:text-[16px] text-[14px] text-black">
                Effortless land registration with unique property IDs.
              </p>
            </li>
            <li className="flex items-center justify-start gap-1 md:gap-2">
              <div className="size-[30px] bg-[#E9E7F9] rounded-full flex items-center justify-center aspect-square">
                <FaCheck className="text-[#6E62E5] text-[12px] md:text-[15px]" />
              </div>
              <p className="font-medium md:text-[16px] text-[14px] text-black">
                Streamlined land inspection and verification for trusted
                records.
              </p>
            </li>
            <li className="flex items-center justify-start w-full gap-2 md:gap-2">
              <div className="size-[30px] bg-[#E9E7F9] rounded-full flex items-center justify-center aspect-square">
                <FaCheck className="text-[#6E62E5] text-[12px] md:text-[15px]" />
              </div>
              <p className="font-medium md:text-[16px] text-[14px] text-black">
                Immutable, blockchain security for ownership and transactions.
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center md:mr-32">
          <Image
            src="/images/wallet-illustration.png"
            alt="Wallet Illustration"
            width={450}
            height={450}
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-7 md:mt-[100px] text-center mb-10">
        <div className="md:w-[465px]">
          <h2 className="md:text-[45px] font-bold text-[#6E62E5]">
            Connect Your Wallet
          </h2>
          <p className="mt-[16px] text-[#1F1F1F] md:text-[16px] font-medium">
            Connect a supported wallet to access Land Registry
          </p>
          <p className="my-[30px] text-[#6B21A8] font-semibold">
            {" "}
            Choose a wallet
          </p>
          <div className="mt-4 space-y-3">
            <button className="flex items-center justify-center gap-1 w-full py-2 font-semibold text-[#6364D5] bg-white border-[1px] border-gray-300 rounded-lg">
              <Image
                src="/images/Braavos.png"
                alt="Braavos"
                width={24}
                height={24}
              />
              <p>Braavos</p>
            </button>
            <button className="flex items-center justify-center w-full py-2 font-semibold text-[#6364D5] bg-white border-[1px] border-gray-300 rounded-lg">
              <Image
                src="/images/Argent.png"
                alt="Argent"
                width={24}
                height={24}
              />
              <p> Argent X </p>
            </button>
            <button className="flex items-center justify-center w-full py-2 font-semibold text-purple-600 bg-white border-[1px] border-gray-300 rounded-lg">
              Web Wallet
            </button>
            <button className="flex items-center justify-center w-full py-2 font-semibold text-purple-600 bg-white border-[1px] border-gray-300 rounded-lg">
              <Image
                src="/images/Argent.png"
                alt="Argent"
                width={24}
                height={24}
              />
              <p> Argent Mobile </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Next;

