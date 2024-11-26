'use client'
import { useState, useEffect } from "react";
import { Header } from "@/components/Headers/Header";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";
import { DropdownOptions } from "@/components/Options/DropdownOptions";
import { RangeCalendar } from "@/components/calendar/RangeCalendar";

import { useAccount } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import { shortAddress } from "@/utils/AddressFormat";
import RegisterLandModal from "@/components/RegisterLandModal";
import DeleteLandModal from "@/components/DeleteLandModal";

import { useRouter } from "next/navigation";
import { Tag } from "@/components/Tag/Tag";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import type { LandData } from "@/types/interfaces";

import { formatTimestampToDate } from "@/utils/dates";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

export function VerifyLandInspectorView() {

  const router = useRouter()

  const { address } = useAccount() 
  const { contract:landRegisterContract } = useLandverContract({ name:"landRegister" })
  
  const [lands, setLands] = useState([])

  const [editData, setEditData] = useState<null|LandData>(null)

  const [indexToShowOptions, setIndexToShowOptions] = useState<null|number>(null)
  const [showStatusFilters, setShowStatusFilters] = useState(false)
  const [dateRange, setDateRange] = useState<Value>([new Date(),new Date()]);
  const [showDateRangeCalendar, setShowDateRangeCalendar] = useState(false)
  const [showDeleteLandModal, setShowDeleteLandModal] = useState(false)

  useEffect(()=>{
    setShowDateRangeCalendar(false)
  }, dateRange)

  useEffect(()=>{
    (async() => {
      try {
        if(address) {
            const addresses = await landRegisterContract.get_lands_by_owner(address)
            const newLands = []

            let index = 0;
            for await (const address of addresses) {
                const land = await landRegisterContract.get_land(address)
                const landStatus = Object.entries(land.status.variant).find(entry => entry[1])
                const landUse = Object.entries(land.land_use.variant).find(entry => entry[1])

                newLands.push({ 
                  number:index+1, 
                  id:address, 
                  buyerOrLandName: "",
                  latitude: land.location.latitude,
                  logitude: land.location.longitude,
                  price: null,
                  area:land.area,
                  landUse:landUse ? landUse[0] : "",
                  date: formatTimestampToDate(Number(land.last_transaction_timestamp)),
                  status: landStatus ? landStatus[0] : "",
                  inspector_sliced:`${land.inspector}`.slice(0,4) + "..." + `${land.inspector}`.slice(-4), 
                })
                index++;
            }

            setLands(newLands.reverse() as any)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [address])


  return (
    <div className="">
        
        <Header title="Verification" hasCreateButton={true} />

        <div className="px-6 py-4">
          <div className="w-full bg-white rounded-xl px-3 py-4">
            <div className="flex justify-between items-start gap-2 flex-wrap">
              <div className="w-full lg:w-4/6">
                <Searchbar />
              </div>
              <div className="flex gap-3">
                <div onClick={()=>setShowStatusFilters(!showStatusFilters)} className="cursor-pointer relative rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex gap-1">
                  <p>status</p>
                  <Image src={"icons/common/dropdown-grey.svg"} alt="" width={12} height={12} />
                  <DropdownMenu 
                    items={[
                      { label:"All", action:()=>{} },
                      { label:"Approved", action:()=>{} },
                      { label:"Unapproved", action:()=>{} },
                      { label:"Bought", action:()=>{} },
                    ]}
                    position="bottom"
                    show={showStatusFilters}
                  />
                </div>
                {/* <div onClick={()=>setShowDateRangeCalendar(!showDateRangeCalendar)} className="cursor-pointer relative flex gap-2 rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex-shrink-0">
                  <Image src={"icons/common/calendar-gray.svg"} alt="" width={14} height={14} />
                  <p>{startDate} - {endDate}</p>
                  {
                    showDateRangeCalendar && (
                        <div className="absolute top-[110%] right-0" style={{ zIndex:10000 }} onClick={(e)=>e.stopPropagation()}>
                          <RangeCalendar value={dateRange} onChange={setDateRange} />
                        </div>
                    )
                  }
                </div> */}
              </div>          
            </div>


            <div className="py-4">
              <div className="bg-white rounded-xl container_scrollable px-6">
                <div className="h-[450px]">

                    <TableHeader
                      items={[
                        { label: "NO", fixedWidth:70 },
                        { label: "LAND ID" },
                        { label: "OWNERS ADDRESS" },
                        { label: "Metaverse" },
                        { label: "LAND AREA" },
                        { label: "DATE" },
                        { label: "STATUS" },
                        { label: "ACTIONS", alignText:"center" },
                      ]}
                    />
                    {
                      lands.map((item:any, index) => {
                        return (
                          <TableRow
                            items={[
                              { value:index+1, fixedWidth:70, },
                              { value:"56037-XDER" },
                              { value:"0x0000" },
                              { value:"Location" },
                              { value:"1200sqft" },
                              { value:"11/12/24" },
                              { 
                                customjsx: () => (
                                  <div className="flex-1 flex gap-2 items-center">
                                    { item.status === "Approved" && <Tag variant="approved" />  }
                                    { item.status === "Pending" && <Tag variant="pending" />  }
                                    { item.status === "Rejected" && <Tag variant="rejected" /> }
                                  
                                  </div>
                                )
                              },
                              { 
                                customjsx: () => (
                                  <div className="flex justify-center items-center">
                                    <div className="relative cursor-pointer flex" onClick={()=>setIndexToShowOptions((indexToShowOptions===null || indexToShowOptions!==index) ? index : null)}>
                                      <Image className="hidden 2xl:block" src={"/icons/common/options.svg"} alt="ether" width={5} height={5} />
                                      {
                                        item.status === "Pending" && (
                                          <DropdownMenu 
                                            items={[
                                              { label: "Edit", action:()=>setEditData({ area:item.area, landId:item.id, landUse:item.landUse, latitude:item.latitude, longitude:item.logitude }) },
                                              { label: "View", action:()=>router.push(`/my-collections/detail/${item.id}`) },
                                              { variant:"danger", label: "Delete", action: ()=>setShowDeleteLandModal(true) },
                                            ]}
                                            position="bottom-right"
                                            show={indexToShowOptions===index}
                                          />
                                        )
                                      }
                                      {
                                        item.status !== "Pending" && (
                                          <DropdownMenu 
                                            items={[
                                              { label: "View", action:()=>router.push(`/my-collections/detail/${item.id}`) },
                                              { label: "Transfer", action:()=>{} },
                                            ]}
                                            position="bottom-right"
                                            show={indexToShowOptions===index}
                                          />
                                        )
                                      }
                                    </div>
                                    {
                                      item.status === "Pending" && (
                                        <div className="flex gap-2">
                                          <p onClick={()=>setEditData({ area:item.area, landId:item.id, landUse:item.landUse, latitude:item.latitude, longitude:item.logitude })} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">Edit</p>
                                          <p onClick={()=>router.push(`/my-collections/detail/${item.id}`)} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">View</p>
                                          <p onClick={()=>setShowDeleteLandModal(true)} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-red-500">Delete</p>
                                        </div>
                                      )
                                    }
                                    {
                                      item.status !== "Pending" && (
                                        <div className="flex gap-2">
                                          <p onClick={()=>router.push(`/my-collections/detail/${item.id}`)} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">View</p>
                                          <p className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">Transfer</p>
                                        </div>
                                      )
                                    }
                                  </div>
                                )
                              },
                            ]}
                            headers={[ "NO", "LAND ID", "BUYER/LAND NAME", "PRICE", "DATE", "STATUS", "ACTIONS" ]}
                          />
                        )
                      })
                    }
                  <div className="h-24" />
                </div>
              </div>
            </div>

          </div>
        </div>    

        
        <RegisterLandModal isOpen={!!editData} onClose={()=>setEditData(null)} mode="edit" editData={editData ?? undefined} />
        <DeleteLandModal isOpen={showDeleteLandModal} onClose={()=>{setShowDeleteLandModal(false)}} />

    </div>
  );
}

