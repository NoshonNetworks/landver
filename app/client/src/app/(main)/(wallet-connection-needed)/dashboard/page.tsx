'use client'

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import { Header } from "@/components/Headers/Header";
import { useAccount, useBalance, useBlock, useBlockNumber, useProvider, useExplorer } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import { useBlockies } from "@/hooks/useBlockies";
import Image from "next/image";

import { events, RpcProvider } from 'starknet';

export default function Dashboard() {

  const { address } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const { data: balanceData } = useBalance({
    address: address,
  });

  // const { data:blockNumber } = useBlockNumber()

  const balance = balanceData?.formatted?.slice(0,4) || ""

  const { landRegisterContract } = useLandverContract({ name:"landRegister" })
  const [landsOwned, setLandsOwned] = useState<number|null>(null)
  const [landsAddresses, setLandsAdresses] = useState<string[]|null>(null)
  // console.log(landRegisterContract)

  useEffect(()=>{
    (async()=>{
      try {

        // const provider = new RpcProvider({ });
        // // const lastBlock = await provider.getBlock('latest');
        // // const keyFilter = [[num.toHex(hash.starknetKeccak('EventPanic')), '0x8']];
        
        // const eventsList = await provider.getEvents({
        //   address: "0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5",
        //   // from_block: { block_number: (blockNumber as number) - 9 },
        //   // to_block: { block_number: blockNumber },
        //   // keys: keyFilter,
        //   chunk_size: 10,
        // });

        // console.log(eventsList)



        if(address){
          const result:string[] = await landRegisterContract.get_lands_by_owner(address)
          setLandsOwned(result.length)
          setLandsAdresses(result)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [address])


  return (
    <div className="">

      <Header title="Overview" hasCreateButton={true} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-6">
        <div className="w-full bg-[#6E62E5] rounded-xl">
          <div className="min-h-56 p-4 flex flex-col gap-6 items-start">
            <p className="text-xl md:text-4xl text-white font-medium">Discover, transfer and register your lands</p>
            <Button variant="white">Discover Now</Button>
          </div>
        </div>
        <Card value={`${landsOwned}`} landIds={landsAddresses||[]} unit={""} subtitle="Total Owned Land" buttonMessage={"View Details"} hasIconsMap={true} />
        <Card value={balance} landIds={landsAddresses||[]} unit={balanceData?.symbol||""} subtitle="My Balance" buttonMessage={"Top Up Balance"} hasIconsMap={false} />
      </div>

      <div className="grid grid-cols-3 gap-5 mt-5 px-6">
        <div className="w-full bg-white rounded-xl col-span-2">
        <div className="h-96"></div>
        </div>
        <div className="w-full bg-white rounded-xl">
          <div className="h-96"></div>
        </div>
      </div>

    </div>
  );
}


const LandImage = ({ landAddress }:{landAddress:string}) => {
  const { blockiesImageSrc } = useBlockies({ address:landAddress }) 
  return <Image src={blockiesImageSrc} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
}


const Card = ({ value, unit, subtitle, buttonMessage, hasIconsMap, landIds}:{ value:string, unit:string, subtitle:string, buttonMessage:string, hasIconsMap:boolean, landIds:string[] }) => {
  
  const landIdsToShow = landIds.length > 6 ? landIds.slice(0,6) : landIds

  return (
    <div className="w-full bg-white rounded-xl">
        <div className="min-h-56 p-4 flex flex-col gap-6 relative">
            <div className="flex gap-2 items-end">
              <p className="text-xl md:text-4xl font-bold">{ value }</p>
              <p className="text-xl md:text-xl font-base">{ unit }</p>
            </div>
            <p className="text-xl md:text-xl font-sm text-gray-500">{ subtitle }</p>
            <div className="relative h-[30px]">
              {
                (!!landIds&&hasIconsMap) && landIdsToShow.map((landId, index)=>{
                  const imageRandomizer = "adffhhyethtvegq" 

                  return(
                    <div key={"land-circles-on-dashboard"+index} style={{ position:"absolute", left:22*index }}>
                      <div className="w-[30px] h-[30px] bg-gray-300 rounded-full overflow-hidden relative">
                        <LandImage landAddress={landId+imageRandomizer} />
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="border-[#6E62E5] border-2 rounded-md py-2 mt-8">
              <p className="text-[#6E62E5] text-center">{ buttonMessage }</p>
            </div>
            <div className="absolute top-7 right-4 w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
        </div>
      </div>
  )
}