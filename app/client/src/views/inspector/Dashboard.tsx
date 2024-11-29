'use client'
import { useState, useEffect } from "react";
import { Header } from "@/components/Headers/Header";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";
import { RangeCalendar } from "@/components/calendar/RangeCalendar";

import { useAccount } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import RegisterLandModal from "@/components/RegisterLandModal";
import DeleteLandModal from "@/components/DeleteLandModal";

import { useRouter } from "next/navigation";
import { Tag } from "@/components/Tag/Tag";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import { SmallNumberCard } from "@/components/Card/SmallNumberCard";

import { formatDate } from "@/utils/dates";

import type { LandData, Land, LandUseEnum, StatusEnum } from "@/types/interfaces";
import type { CalendarValue } from '@/types/types';
import Loading from "@/components/Loading/Loading";


export function DashboardInspectorView() {

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { address } = useAccount() 
  const { contract:landRegisterContract } = useLandverContract({ name:"landRegister" })
  
  const [lands, setLands] = useState<Land[]>([])
  const [editData, setEditData] = useState<null|LandData>(null)

  const [indexToShowOptions, setIndexToShowOptions] = useState<null|number>(null)
  const [showStatusFilters, setShowStatusFilters] = useState(false)
  const [dateRange, setDateRange] = useState<CalendarValue>([new Date(),new Date()]);
  const [showDateRangeCalendar, setShowDateRangeCalendar] = useState(false)
  const [showDeleteLandModal, setShowDeleteLandModal] = useState(false)


  const startDate = ((dateRange && !(dateRange instanceof Date)) && dateRange[0]) ? formatDate(dateRange[0]) : null
  const endDate = ((dateRange && !(dateRange instanceof Date)) && dateRange[1]) ? formatDate(dateRange[1]) : null

  useEffect(()=>{
    setShowDateRangeCalendar(false)
  }, [dateRange])

  useEffect(()=>{
    (async() => {
      try {
        if(address) {
            setLoading(true)
            const addresses = await landRegisterContract.get_lands_by_owner(address)
            const newLands:Land[] = []

            for await (const address of addresses) {
                const land = await landRegisterContract.get_land(address)
                const landStatus = Object.entries(land.status.variant).find(entry => entry[1])
                const landUse = Object.entries(land.land_use.variant).find(entry => entry[1])

                if(!landStatus || !landUse) return 

                newLands.push({ 
                  id: address,
                  area: land.area, 
                  inspector: land.inspector, 
                  last_transaction_timestamp: land.last_transaction_timestamp, 
                  owner: land.owner, 
                  fee: land.fee, 
                  location: {
                    latitude: land.location.latitude, 
                    longitude: land.location.longitude,
                  },
                  land_use: {
                    variant: {
                      [landUse[0]]:{}
                    } as unknown as LandUseEnum
                  },
                  status: {
                    variant: {
                      [landStatus[0]]: {},
                    } as unknown as StatusEnum
                  }
                })
            }

            setLands(newLands.reverse())
            setLoading(false)
          }
        } catch (error) {
        setLoading(false)
        console.log(error)
      }
    })()
  }, [address])


  return (
    <div className="">
        
        <Header title="Overview" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 px-6">
          <SmallNumberCard iconColor="green" title={"10"} subtitle="Registration Request" />
          <SmallNumberCard iconColor="green" title={"30"} subtitle="Verified Land/users" />
          <SmallNumberCard iconColor="green" title={"12"} subtitle="Transfer Request" />
          <SmallNumberCard iconColor="green" title={"9"} subtitle="Flagged Issues" />
        </div>


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
                <div onClick={()=>setShowDateRangeCalendar(!showDateRangeCalendar)} className="cursor-pointer relative flex gap-2 rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex-shrink-0">
                  <Image src={"icons/common/calendar-gray.svg"} alt="" width={14} height={14} />
                  <p>{startDate} - {endDate}</p>
                  {
                    showDateRangeCalendar && (
                        <div className="absolute top-[110%] right-0" style={{ zIndex:10000 }} onClick={(e)=>e.stopPropagation()}>
                          <RangeCalendar value={dateRange} onChange={setDateRange} />
                        </div>
                    )
                  }
                </div>
              </div>          
            </div>


            <div className="py-4">
              <div className="bg-white rounded-xl container_scrollable px-6">
                <div className="h-[450px]">

                    <TableHeader
                      items={[
                        { label: "NO", fixedWidth:70 },
                        { label: "LAND ID" },
                        { label: "OWNER'S NAME" },
                        { label: "PRICE" },
                        { label: "DATE" },
                        { label: "STATUS" },
                        { label: "ACTIONS", alignText:"center" },
                      ]}
                    />
                    {
                      loading && <Loading height={200} />
                    }
                    {
                      !loading && lands.map((item:Land, index) => {
                        return (
                          <TableRow
                            key={"uniqueKeyPropsaadahsboardinspec"+index}
                            items={[
                              { value:index+1, fixedWidth:70, },
                              { value:"56037-XDER" },
                              { value:"TRSS-123" },
                              { value:"0.2345" },
                              { value:"11/12/24" },
                              { 
                                customjsx: () => (
                                  <div className="flex-1 flex gap-2 items-center">
                                    { Object.keys(item.status.variant)[0] === "Approved" && <Tag variant="approved" />  }
                                    { Object.keys(item.status.variant)[0] === "Pending" && <Tag variant="pending" />  }
                                    { Object.keys(item.status.variant)[0] === "Rejected" && <Tag variant="rejected" /> }
                                  </div>
                                )
                              },
                              { 
                                customjsx: () => (
                                  <div className="flex justify-center items-center">
                                    <div className="relative cursor-pointer flex" onClick={()=>setIndexToShowOptions((indexToShowOptions===null || indexToShowOptions!==index) ? index : null)}>
                                      <Image className="hidden 2xl:block" src={"/icons/common/options.svg"} alt="ether" width={5} height={5} />
                                      {
                                        Object.keys(item.status.variant)[0] === "Pending" && (
                                          <DropdownMenu 
                                            items={[
                                              { label: "Edit", action:()=>setEditData({ area:item.area, landId:item.id, landUse:Object.keys(item.land_use.variant)[0] as string, latitude:item.location.latitude, longitude:item.location.longitude }) },
                                              { label: "View", action:()=>router.push(`/my-collections/detail/${item.id}`) },
                                              { variant:"danger", label: "Delete", action: ()=>setShowDeleteLandModal(true) },
                                            ]}
                                            position="bottom-right"
                                            show={indexToShowOptions===index}
                                          />
                                        )
                                      }
                                      {
                                        Object.keys(item.status.variant)[0] !== "Pending" && (
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
                                      Object.keys(item.status.variant)[0] === "Pending" && (
                                        <div className="flex gap-2">
                                          <p onClick={()=>setEditData({ area:item.area, landId:item.id, landUse:Object.keys(item.land_use.variant)[0] as string, latitude:item.location.latitude, longitude:item.location.longitude })} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">Edit</p>
                                          <p onClick={()=>router.push(`/my-collections/detail/${item.id}`)} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">View</p>
                                          <p onClick={()=>setShowDeleteLandModal(true)} className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-red-500">Delete</p>
                                        </div>
                                      )
                                    }
                                    {
                                      Object.keys(item.status.variant)[0] && (
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

