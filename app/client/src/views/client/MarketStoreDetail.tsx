'use client'
import { Header } from "@/components/Headers/Header";
import Image from "next/image";
import { SectionHeader } from "@/components/Headers/SectionHeader";
import { Button } from "@/components/Button/Button";
import { MarketCard } from "@/components/Card/MarketCard";
import { Listing, ListingCreatedEvent } from "@/types/interfaces";
import { useEvents } from "@/hooks/useEvents";
import { useAccount } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { shortAddress } from "@/utils/AddressFormat";
import { formatTimestampToDate } from "@/utils/dates";
import Loading from "@/components/Loading/Loading";



export function MarketStoreDetailClientView() {

  const { listingId } = useParams()
  const { account } = useAccount()

  const [listing, setListing] = useState<null|Listing>(null)

  const { address } = useAccount()
  const { contract:LandRegistryContract } = useLandverContract({ name:"landRegister" })
  const { events: listingEvents, isLoading:loadingEvents } = useEvents<ListingCreatedEvent>({
    name:"landRegister",
    triggerRefetch:!!address, // this could be an state that toggles false-true and refetch event
    filters: {
      events: [
        'ListingCreated',
        ]
    }
  })

  useEffect(()=>{
    (async()=>{
      try {
        const listingResponse:Listing = await LandRegistryContract.get_listing(listingId)
        setListing(listingResponse)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleBuy = async() => {
    try {
      await LandRegistryContract.connect(account)
      await LandRegistryContract.buy_land(listingId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <Header title="Banana Island" hasTransferButton />

        <div className="px-6">
          <div className="bg-white rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 px-3 py-4 gap-4 rounded-xl">
                <div className="rounded-lg min-h-[250px] bg-gray-200">

                </div>

                <div className="rounded-lg min-h-[250px] bg-white p-4">
                  
                  <div className="flex py-1 ">
                    <div className="rounded-full w-12 h-12 bg-gray-200"></div>
                    <div>
                      <p className="text-base font-bold">{ shortAddress(listing?.seller.toString()) }</p>
                      <p className="text-gray-500">owner</p>
                    </div>
                    <div className="flex justify-end flex-1 items-center">
                      <Image src={"/icons/common/favorite-filled.svg"} width={22} height={22} alt='' />
                    </div>
                  </div>

                  <div className="rounded-lg xl:col-span-1 bg-white flex flex-col py-3 gap-3 ">
                    <div className="flex justify-between items-center ">
                        <p className="text-gray-500 font-bold">Date</p>
                        <div>{ formatTimestampToDate(Number(listing?.created_at)) }</div>
                    </div>
                    <div className="h-[1px] bg-gray-200"></div>
                    <div className="flex justify-between items-center ">
                        <p className="text-gray-500 font-bold">Land Name/Land Id</p>
                        <div>{ shortAddress(listing?.land_id.toString()) }</div>
                    </div>
                    <div className="h-[1px] bg-gray-200"></div>
                </div>

                <div className="flex py-1">
                    <div>
                      <p className="text-gray-500 text-base">price</p>
                      <p className="text-2xl font-bold">{ listing?.price.toString() } ETH</p>
                    </div>
                    <div className="cursor-pointer flex justify-end flex-1 items-center">
                      <Button onClick={()=>handleBuy()}>Buy Land</Button>
                    </div>
                  </div>
                </div>
            </div>

            <div className="h-10"></div>

            <div className="px-3">
              <SectionHeader title="best Seller" buttonMessage="View All" />

              {
                loadingEvents && <Loading height={200} />
              }

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5">
                {
                  !loadingEvents && listingEvents.map((item, index)=>{
                    return (
                      <MarketCard key={"uniquecardkeymarketstoredetailclientdfa"+item.eventKey+index} item={item} />
                    )
                  })
                }
              </div>
              
              <div className="h-4"></div>

            </div>


          </div>
        </div>

              <div className="h-20"></div>
    </>    
  );
}

