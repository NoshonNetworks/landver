'use client'

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import { Header } from "@/components/Headers/Header";
import { useAccount, useBalance, useBlock, useBlockNumber, useProvider, useExplorer } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import { useBlockies } from "@/hooks/useBlockies";
import Image from "next/image";

import { events, RpcProvider, hash, CallData, num } from 'starknet';
import { SectionHeader } from "@/components/Headers/SectionHeader";

interface DynamicObject {
  [key: string]: string; // Allows any string as a key
}

const EVENTS_KEY_LABEL:DynamicObject = {
  'LandRegistered':"Land Registered",
  'LandTransfered':"Land Transfered",
  'LandVerified':"Land Verified",
  'LandUpdated':"Land Updated",
  'LandInspectorSet':"Inspector asigned to land",
  'InspectorAdded':"Inspector created",
  'InspectorRemoved':"Inspector removed",
  'ListingCreated':"New listing created",
  'ListingCancelled':"Listing cancelled",
  'ListingPriceUpdated':"Listing price updated",
  'LandSold':"Land sold",
}

export default function Dashboard() {

  const { address } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const { data: balanceData } = useBalance({
    address: address,
  });

  // const { data:blockNumber } = useBlockNumber()

  const balance = balanceData?.formatted?.slice(0,4) || ""

  const { contract:landRegisterContract, abi:landRegisterABI } = useLandverContract({ name:"landRegister" })
  const [landsOwned, setLandsOwned] = useState<number|null>(null)
  const [landsAddresses, setLandsAdresses] = useState<string[]|null>(null)
  const [recentEvents, setRecentEvents] = useState<{ eventName:string, rawEvent: any, parsedEvent:any }[]>([])
  // console.log(landRegisterContract)

  useEffect(()=>{
    (async()=>{
      try {
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

  useEffect(()=>{
    (async()=>{
      try {
        const provider = new RpcProvider({ });
        const keyFilter = [
          [
            num.toHex(hash.starknetKeccak('LandRegistered')), 
            num.toHex(hash.starknetKeccak('LandTransfered')),
            num.toHex(hash.starknetKeccak('LandVerified')),
            num.toHex(hash.starknetKeccak('LandUpdated')),
            num.toHex(hash.starknetKeccak('LandInspectorSet')),
            num.toHex(hash.starknetKeccak('InspectorAdded')),
            num.toHex(hash.starknetKeccak('InspectorRemoved')),
            num.toHex(hash.starknetKeccak('InspectorRemoved')),
            num.toHex(hash.starknetKeccak('ListingCreated')),
            num.toHex(hash.starknetKeccak('ListingCancelled')),
            num.toHex(hash.starknetKeccak('ListingPriceUpdated')),
            num.toHex(hash.starknetKeccak('LandSold')),
          ],
        ];

        const eventsRes = await provider.getEvents({
          address: "0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5",
          keys: keyFilter,
          chunk_size: 30,
        });

        // parsing event
        const abiEvents = events.getAbiEvents(landRegisterABI);
        const abiStructs = CallData.getAbiStruct(landRegisterABI);
        const abiEnums = CallData.getAbiEnum(landRegisterABI);
        const parsed = events.parseEvents(eventsRes.events, abiEvents, abiStructs, abiEnums);
        
        const formattedEvents:{ 
          eventName:string,
          rawEvent: any, 
          parsedEvent:any
        }[] = []

        for (let i = 0; i <eventsRes.events.length; i++) {
          const rawEvent = eventsRes.events[i]
          const parsedEvent = parsed[i]

          let fullKey = Object.keys(parsedEvent)[0].split("::");
          let eventName = fullKey[fullKey.length - 1]


          formattedEvents.push({
            eventName,
            rawEvent, 
            parsedEvent
          })
        }

        setRecentEvents(formattedEvents)

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
        <Card mainIconColor="green" value={`${landsOwned}`} landIds={landsAddresses||[]} unit={""} subtitle="Total Owned Land" buttonMessage={"View Details"} hasIconsMap={true} />
        <Card mainIconColor="blue" value={balance} landIds={landsAddresses||[]} unit={balanceData?.symbol||""} subtitle="My Balance" buttonMessage={"Top Up Balance"} hasIconsMap={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5 px-6 mb-10 lg:mb-0">
        <div className="w-full bg-white rounded-xl lg:col-span-2 p-4 container_scrollable">
          <div className="h-96">
            <SectionHeader title="Best Seller" titleSize={"xl"} buttonMessage="View all" />
            <div className="hidden 2xl:flex justify-start items-center w-full gap-1 mt-5 pt-5 text-gray-400 font-semibold text-base">
              <div className="w-[70px]">NO</div>
              <div className="flex-1">Land ID</div>
              <div className="flex-1">BUYER/LAND NAME</div>
              <div className="flex-1">PRICE</div>
              <div className="text-right flex-1">DATE</div>
            </div>
          {
            [1,2,3,4,5,6].map((item, index) => {
              return (
                <div key={"dashboardbestsellerlist1"+index} className="flex flex-col 2xl:flex-row justify-start 2xl:items-center w-full gap-1 border-dashed border-t-2 border-t-gray-300 mt-5 pt-5 font-semibold">
                  <div className="w-[70px] flex gap-1">
                    <p className="2xl:hidden">No: </p>
                    <p>{ index+1 }</p>
                  </div>
                  <div className="flex-1">
                    <p className="2xl:hidden">Land ID: </p>
                    <p>56037-XDER</p>
                  </div>
                  <div className="flex-1 flex gap-2 items-center">
                    <div className="hidden 2xl:block w-8 h-8 rounded-full bg-gray-300"></div>
                    <p className="2xl:hidden">Buyer/Land Name: </p>
                    <p>TRESS-123</p>
                  </div>
                  <div className="flex-1 flex gap-2 items-center">
                    <div className="hidden 2xl:block w-7 h-7 rounded-full bg-gray-300"></div>
                    <p className="2xl:hidden">Price: </p>
                    <p>0.2345</p>
                  </div>
                  <div className="flex 2xl:block 2xl:text-right flex-1 2xl:text-gray-400 gap-2">
                    <p className="2xl:hidden">Date: </p>
                    <p>20/11/24</p>
                    </div>
                </div>
              )
            })
          }
          <div className="h-10" />
        </div>
        </div>
        <div className="w-full bg-white rounded-xl p-4 container_scrollable">
          <div className="h-96">
            <SectionHeader title="Recent Activities" titleSize={"xl"} buttonMessage="View all" />
            <div className="h-10"></div>
            {
              recentEvents.map((event, index)=>{
                return (
                  <div key={"dashboardrecentsactivities1e2"+index} className="flex justify-start items-center gap-2 mt-4">
                    <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
                      <EventImage eventName={EVENTS_KEY_LABEL[event.eventName]} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
                      {/* <p className="text-gray-400">Land Approval</p>
                      <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
                    </div>
                    <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
                      {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
                    </div>
                  </div>
                )
              })
            }
            <div className="h-10"></div>
          </div>
        </div>
      </div>

    </div>
  );
}


const LandImage = ({ landAddress }:{landAddress:string}) => {
  const { blockiesImageSrc } = useBlockies({ address:landAddress }) 
  return <Image src={blockiesImageSrc} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
}

const EventImage = ({ eventName }:{eventName:string}) => {
  const { blockiesImageSrc } = useBlockies({ address:eventName }) 
  return <Image src={blockiesImageSrc} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
}


const Card = ({ value, unit, subtitle, buttonMessage, hasIconsMap, landIds, mainIconColor}:{ value:string, unit:string, subtitle:string, buttonMessage:string, hasIconsMap:boolean, landIds:string[], mainIconColor:"blue"|"green" }) => {
  
  const landIdsToShow = landIds.length > 6 ? landIds.slice(0,6) : landIds

  return (
    <div className="w-full bg-white rounded-xl">
        <div className="min-h-56 p-4 flex flex-col gap-6 relative">
            <div className="flex gap-2 items-end">
              <p className="text-xl md:text-4xl font-bold">{ value ?? "-" }</p>
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
            <div className="absolute top-7 right-4 w-[60px] h-[60px] rounded-full flex justify-center items-center" style={{ backgroundColor:mainIconColor==="blue"?"#F2FAFD":"#F4FDF9" }}>
              <div className="relative w-[40px] h-[40px] rounded-full">
                {
                  mainIconColor === "blue"&&<Image src={"/icons/common/stack-green.svg"} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
                }
                {
                  mainIconColor === "green"&&<Image src={"/icons/common/stack-blue.svg"} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
                }
              </div>
            </div>
        </div>
      </div>
  )
}