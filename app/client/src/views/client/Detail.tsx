'use client'
import { Header } from "@/components/Headers/Header";
import { Tag } from "@/components/Tag/Tag";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import { useLandverContract } from "@/hooks/useLandverContract";
import { Land } from "@/types/interfaces";
import { shortAddress } from "@/utils/AddressFormat";
import { formatTimestampToDate } from "@/utils/dates";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailClientView() {

  const { landId } = useParams()
  const { contract:registerContract } = useLandverContract({ name:"landRegister" })
  const [loading, setLoading] = useState(false)
  const [land, setLand] = useState<null|Land>(null)

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        const landResponse:Land = await registerContract.get_land(landId)
        setLand(landResponse)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    })()
  }, [])

  const statusTag:"approved" | "unapproved" | "pending" | "rejected" | "bought" = Object.entries(land?.status.variant ?? {}).find(entry=>entry[1])?.[0]?.toLowerCase() as "approved" | "unapproved" | "pending" | "rejected" | "bought"
  const landUse = Object.entries(land?.land_use.variant??{}).find(entry=>entry[1])?.[0]

  return (
    <>
        <Header title="Banana Island" hasTransferButton />

        <div className="grid grid-cols-1 xl:grid-cols-3 px-6 py-4 gap-4">
            <div className="rounded-lg xl:col-span-1 min-h-[250px] bg-white flex flex-col py-3 gap-3 px-4">
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">status</p>
                    { loading ? "-" : <Tag variant={statusTag} /> }
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Land ID</p>
                    { loading ? "-" : <div>{ shortAddress(landId as string) }</div> }
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Location</p>
                    { loading 
                      ? "-" 
                      : 
                      <div className="flex flex-col items-end">
                        <div>Latitude: { land?.location.latitude.toString() }</div>
                        <div>Longitude: { land?.location.longitude.toString() }</div>
                      </div>  
                      }
                    
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Land Area</p>
                    { loading ? "-" : <div>{ land?.area.toString() }</div> }
                   
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Land Use</p>
                    { loading ? "-" : <div>{ landUse }</div> }
                    
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Price</p>
                    { loading ? "-" : <div>{ land?.fee.toString() } ETH</div> }
                </div>
                <div className="h-[1px] bg-gray-200"></div>
                <div className="flex justify-between items-center px-4">
                    <p className="text-gray-600">Date</p>
                    { loading ? "-" : <div>{ formatTimestampToDate(Number(land?.last_transaction_timestamp)) }</div> }
                    
                </div>
            </div>
            <div className="rounded-lg xl:col-span-2 min-h-[250px] bg-white"></div>
        </div>

        <div className="px-6 py-4 gap-4 ">
            <div className="rounded-lg min-h-[250px] bg-white flex flex-col py-3 gap-3 px-4">
              <div className="bg-white rounded-xl container_scrollable px-6">
                <div className="h-[450px]">
                    <p className="text-xl font-bold">Transaction History</p>

                    <TableHeader 
                      items={[
                        { label:"NO", fixedWidth:70 },
                        { label:"FROM" },
                        { label:"TO" },
                        { label:"PRICE" },
                        { label:"DATE" },
                        { label:"STATUS" },
                      ]}
                    />
                    
                  {
                    [1,2,3,4,5].map((item:number, index) => {
                      return (
                        <TableRow 
                            key={"unqikeuproptablerow"+index}
                            headers={["NO", "FROM", "TO", "PRICE", "DATE", "STATUS"]}
                            items={[
                              { value: index, fixedWidth:70 },
                              { value: "0x000000" },
                              { value: "0x000000" },
                              { value: 200 },
                              { value: "10/11/24" },
                              { customjsx:()=>(
                                <div className="flex-1 flex gap-2 items-center">
                                  <Tag variant="approved" />
                                </div>
                              ) }
                            ]}
                        />
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

