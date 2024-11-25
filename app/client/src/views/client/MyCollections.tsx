'use client'
import { useState, useEffect } from "react";
import { Header } from "@/components/Headers/Header";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";
import { DropdownOptions } from "@/components/Options/DropdownOptions";
import { RangeCalendar } from "@/components/calendar/RangeCalendar";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

function formatDate(date:Date){
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIndex = date.getMonth()
  const dayIndex = date.getDate()

  return `${monthNames[monthIndex]} ${dayIndex}`
}

export default function MyCollectionsClientView() {

  const [indexToShowOptions, setIndexToShowOptions] = useState<null|number>(null)
  const [showStatusFilters, setShowStatusFilters] = useState(false)
  const [dateRange, setDateRange] = useState<Value>([new Date(),new Date()]);
  const [showDateRangeCalendar, setShowDateRangeCalendar] = useState(false)

  const startDate = (dateRange && dateRange[0]) ? formatDate(dateRange[0]) : null
  const endDate = (dateRange && dateRange[1]) ? formatDate(dateRange[1]) : null

  useEffect(()=>{
    setShowDateRangeCalendar(false)
  }, dateRange)

  return (
    <div className="">
        
        <Header title="Collections" hasCreateButton={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 px-6">
          <Card title="24" subtitle="Total Lands Owned" />
          <Card title="24" subtitle="Total Lands Registered" />
          <Card title="24" subtitle="Total Lands Bought" />
          <Card title="24" subtitle="Total Lands Unapproved" />
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
                  <DropdownOptions
                    options={[
                      { label:"All", action:()=>{} },
                      { label:"Approved", action:()=>{} },
                      { label:"Unapproved", action:()=>{} },
                      { label:"Bought", action:()=>{} },
                    ]}
                    show={showStatusFilters}
                    onClose={()=>setShowStatusFilters(false)}
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
                    <div className="hidden 2xl:flex justify-between items-center w-full gap-1 mt-5 pt-5 text-gray-400 font-semibold text-base">
                      <div className="w-[70px]">NO</div>
                      <div className="flex-1">Land ID</div>
                      <div className="flex-1">BUYER/LAND NAME</div>
                      <div className="flex-1">PRICE</div>
                      <div className="flex-1">DATE</div>
                      <div className="flex-1">STATUS</div>
                      <div className="flex-1 flex 2xl:justify-center">ACTIONS</div>
                    </div>
                  {
                    [1,2,3,4,5,6].map((item, index) => {
                      return (
                        <div key={"dashboardbestsellerlist1"+index} className="flex flex-col 2xl:flex-row justify-between 2xl:items-center w-full gap-1 border-dashed border-t-2 border-t-gray-300 mt-5 pt-5 font-semibold">
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
                          <div className="flex-1 flex gap-2 items-center">
                            <p className="2xl:hidden">Date: </p>
                            <p>20/11/24</p>
                          </div>
                          <div className="flex-1 flex gap-2 items-center">
                            <p className="2xl:hidden">Status: </p>
                            <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl "> {/* red #FFF5F8 */}
                              <p className="text-[#50CD89]">Approved</p>{/* red #F1416C */}
                            </div>
                          </div>
                          <div className="flex-1 flex 2xl:justify-center gap-2 items-center relative">
                            <div className="relative cursor-pointer" onClick={()=>setIndexToShowOptions((indexToShowOptions===null || indexToShowOptions!==index) ? index : null)}>
                              <Image className="hidden 2xl:block" src={"/icons/common/options.svg"} alt="ether" width={5} height={5} />
                              <div className="origin-top-right transition-all absolute right-0 top-[105%] bg-white shadow-md shadow-gray-400 rounded-xl px-3 py-2" style={{ transform:`scale(${indexToShowOptions===index?"1":"0"})`, zIndex:10000 }}>
                                <p className="cursor-pointer font-normal text-gray-500">Edit</p>
                                <p className="cursor-pointer font-normal text-gray-500">View</p>
                                <p className="cursor-pointer font-normal text-red-500">Delete</p>
                              </div>
                            </div>
                            <p className="2xl:hidden">Actions: </p>
                            <p className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">Edit</p>
                            <p className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">View</p>
                            <p className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-red-500">Delete</p>
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
        </div>        
    </div>
  );
}


function Card({ title, subtitle }:{ title:string, subtitle:string }) {
  return (
    <div className="w-full bg-white rounded-xl flex justify-start items-start px-3 py-4 gap-2">
      <div className="w-16 h-16 rounded-full bg-gray-200"></div>
      <div className="">
        <p className="text-2xl text-black font-bold">{ title }</p>
        <p className="text-base text-gray-600">{ subtitle }</p>
      </div>
    </div>
  )
}