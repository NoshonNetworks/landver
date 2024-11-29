'use client'
import { useState } from "react";
import { Header } from "@/components/Headers/Header";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";
import { RangeCalendar } from "@/components/calendar/RangeCalendar";
import { MarketCard } from "@/components/Card/MarketCard";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";

import { formatDate } from "@/utils/dates";
import type { CalendarValue } from '@/types/types';
import { useEvents } from "@/hooks/useEvents";
import { ListingCreatedEvent } from "@/types/interfaces";
import { useAccount } from "@starknet-react/core";
import Loading from "@/components/Loading/Loading";

export default function MarketStoreClientView() {

  const { address } = useAccount()

  const [showFilters, setShowFilters] = useState(false)
  const [showDateRangeCalendar, setShowDateRangeCalendar] = useState(false)

  const [dateRange, setDateRange] = useState<CalendarValue>([new Date(),new Date()]);
  const startDate = ((dateRange && !(dateRange instanceof Date)) && dateRange[0]) ? formatDate(dateRange[0]) : null
  const endDate = ((dateRange && !(dateRange instanceof Date)) && dateRange[1]) ? formatDate(dateRange[1]) : null

  const { events: listingEvents, isLoading:loadingEvents } = useEvents<ListingCreatedEvent>({
    name:"landRegister",
    triggerRefetch:!!address, // this could be an state that toggles false-true and refetch event
    filters: {
      events: [
        'ListingCreated',
        ]
    }
  })

  const [favs, setFavs] = useState<string[]>([])

  return (
    <div className="">
        <Header title="Market Store" hasCreateButton/>

        <div className="px-4">
          <div className="bg-white px-2 py-4 rounded-xl">
            
            <div className="flex justify-between items-start gap-2 flex-wrap">
              <div className="w-full lg:w-4/6">
                <Searchbar />
              </div>
              <div className="flex gap-3">
                <div onClick={()=>setShowFilters(!showFilters)} className="cursor-pointer relative rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex gap-1">
                  <p>Filters</p>
                  <Image src={"icons/common/dropdown-grey.svg"} alt="" width={12} height={12} />
                  <DropdownMenu 
                    items={[
                      { label:"All", action:()=>{} },
                      { label:"Approved", action:()=>{} },
                      { label:"Unapproved", action:()=>{} },
                      { label:"Bought", action:()=>{} },
                    ]}
                    position="bottom"
                    show={showFilters}
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

            {
                loadingEvents && <Loading height={200} />
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-5">
              {
                !loadingEvents && listingEvents.map((item, index)=>{
                  return (
                    <MarketCard key={"uniquecardkeymarketstoreclient"+item.eventKey+index} item={item} favs={favs} setFavs={setFavs} />
                  )
                })
              }
            </div>

          </div>
        </div>


    </div>
  );
}
