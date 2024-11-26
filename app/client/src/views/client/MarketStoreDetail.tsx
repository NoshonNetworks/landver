'use client'
import { Header } from "@/components/Headers/Header";
import { useParams } from "next/navigation";
import Image from "next/image";
import { SectionHeader } from "@/components/Headers/SectionHeader";
import { Button } from "@/components/Button/Button";
import { MarketCard } from "@/components/Card/MarketCard";

export function MarketStoreDetailClientView() {

  const params = useParams()

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
                      <p className="text-base font-bold">Tress-30</p>
                      <p className="text-gray-500">owner</p>
                    </div>
                    <div className="flex justify-end flex-1 items-center">
                      <p>Heart</p>
                    </div>
                  </div>

                  <div className="rounded-lg xl:col-span-1 bg-white flex flex-col py-3 gap-3 ">
                    <div className="flex justify-between items-center ">
                        <p className="text-gray-500 font-bold">Date</p>
                        <div>11/10/2024</div>
                    </div>
                    <div className="h-[1px] bg-gray-200"></div>
                    <div className="flex justify-between items-center ">
                        <p className="text-gray-500 font-bold">Land Name</p>
                        <div>TRIX-333</div>
                    </div>
                    <div className="h-[1px] bg-gray-200"></div>
                </div>

                <div className="flex py-1">
                    <div>
                      <p className="text-gray-500 text-base">price</p>
                      <p className="text-2xl font-bold">0.25 ETH</p>
                    </div>
                    <div className="cursor-pointer flex justify-end flex-1 items-center">
                      <Button>Buy Land</Button>
                    </div>
                  </div>
                </div>
            </div>

            <div className="h-10"></div>

            <div className="px-3">
              <SectionHeader title="best Seller" buttonMessage="View All" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5">
                {
                  [1,2,3,4].map((item, index)=>{
                    return (
                      <MarketCard key={"uniquecardkeymarketstoredetailclientdfa"+item} item={item} />
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

