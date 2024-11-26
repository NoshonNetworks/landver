'use client'
import { Header } from "@/components/Headers/Header";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Tag } from "@/components/Tag/Tag";

export default function DetailClientView() {

  const params = useParams()

  return (
    <>
        <Header title="Banana Island" hasTransferButton />

        <div className="grid grid-cols-1 xl:grid-cols-3 px-6 py-4 gap-4">
            <div className="rounded-lg xl:col-span-1 min-h-[250px] bg-white flex flex-col py-3 gap-3 px-4">
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">status</p>
                    <Tag variant="approved" />
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Land ID</p>
                    <div>TRISS-30</div>
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Location</p>
                    <div>Location</div>
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Land Area</p>
                    <div>Land Area</div>
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Land Use</p>
                    <div>Land Use</div>
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Price</p>
                    <div>Price</div>
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Date</p>
                    <div>10/11/24</div>
                </div>
            </div>
            <div className="rounded-lg xl:col-span-2 min-h-[250px] bg-white"></div>
        </div>

        <div className="px-6 py-4 gap-4 ">
            <div className="rounded-lg min-h-[250px] bg-white flex flex-col py-3 gap-3 px-4">
              <div className="bg-white rounded-xl container_scrollable px-6">
                <div className="h-[450px]">
                    <div className="hidden 2xl:flex justify-between items-center w-full gap-1 mt-5 pt-5 text-gray-400 font-semibold text-base">
                      <div className="w-[70px]">NO</div>
                      <div className="flex-1">FROM</div>
                      <div className="flex-1">TO</div>
                      <div className="flex-1">PRICE</div>
                      <div className="flex-1">DATE</div>
                      <div className="flex-1">STATUS</div>
                    </div>
                  {
                    [1,2,3,4,5].map((item:any, index) => {
                      return (
                        <div key={"dashboardbestsellerlist1"+index} className="flex flex-col 2xl:flex-row justify-between 2xl:items-center w-full gap-1 border-dashed border-t-2 border-t-gray-300 mt-5 pt-5 font-semibold">
                          <div className="w-[70px] flex gap-1">
                            <p className="2xl:hidden">No: </p>
                            <p>{ index }</p>
                          </div>
                          <div className="flex-1 flex gap-1">
                            <p className="2xl:hidden">From: </p>
                            <p>0x000000000</p>
                          </div>
                          <div className="flex-1 flex gap-2 items-center">
                            {
                              item.buyerOrLandName && <div className="hidden 2xl:block w-8 h-8 rounded-full bg-gray-300"></div>
                            }
                            <p className="2xl:hidden">To: </p>
                            <p>0x000000000</p>
                          </div>
                          <div className="flex-1 flex gap-2 items-center">
                            {item.price && <div className="hidden 2xl:block w-7 h-7 rounded-full bg-gray-300"></div>}
                            <p className="2xl:hidden">Price: </p>
                            <p>200</p>
                          </div>
                          <div className="flex-1 flex gap-2 items-center">
                            <p className="2xl:hidden">Date: </p>
                            <p>10/11/24</p>
                          </div>
                          <div className="flex-1 flex gap-2 items-center">
                            <p className="2xl:hidden">Status: </p>
                            {/* <div className={`${item.status==="Approved"&&"bg-[#E8FFF3]"} ${item.status==="Rejected"&&"bg-[#FFF5F8]"} ${item.status==="Pending"&&"bg-[#fff9e2]"} py-1 px-2 rounded-xl`}> */}
                            <Tag variant="approved" />
                          </div>
                          
                        </div>
                      )
                    })
                  }
                  <div className="h-24" />
                </div>
              </div>
            </div>
        </div>


    </>    
  );
}

