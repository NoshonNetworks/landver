'use client'
import { Header } from "@/components/Headers/Header";
import { Tag } from "@/components/Tag/Tag";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";

export default function DetailClientView() {

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
                    [1,2,3,4,5].map((item:any, index) => {
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

