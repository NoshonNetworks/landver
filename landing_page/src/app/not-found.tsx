import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex w-full items-center justify-center h-screen text-center text-blue-800">
      <div className="w-[50%] h-[80%] object-contain">
        <Image
          src="/images/not-found.svg"
          alt="404-image"
          fill
          className="!relative"
        />
      </div>
      <div className="w-[50%] h-full flex flex-col items-start justify-center space-y-3">
        <p className="text-xl border-b-[2px] border-blue-800">Error 404</p>
        <div className="text-7xl my-2 text-left text-black font-bold">
          <p>there&apos; light</p>
          <p>in here too</p>
        </div>
        <p className="text-base">
          but the page is missing or you assembled the link incorrectly
        </p>
        <Link
          href="/"
          className="flex mt-4 py-3 transition space-x-2 hover:space-x-3"
        >
          <p>Go Back Home</p> <MoveRight />
        </Link>
      </div>
    </div>
  );
}
