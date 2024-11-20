"use client";
import Header from "./components/Header";
import P from "./components/Paragraph/P";
import { ABI } from "./abis/abi";
import { useContractRead } from "@starknet-react/core";
import Loading from "./components/loading";
export default function Home() {
  const contractAddress =
    "0x05a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5";
  const {
    data: allLands,
    refetch: allLandsRefetch,
    isFetching,
    isLoading: readIsLoading,
  } = useContractRead({
    functionName: "get_lands",
    args: [],
    abi: ABI,
    address: contractAddress,
    // watch: true,
  });

  return (
    <div className="py-[60px] px-[100px]">
      <Header />
      {readIsLoading || isFetching ? (
        <Loading message={""} />
      ) : (
        <div>
          <P>Registered Lands go here</P>
        </div>
      )}
    </div>
  );
}
