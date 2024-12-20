'use client'
import { useState, useEffect } from "react";
import { Header } from "@/components/Headers/Header";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";

import { useAccount } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import RegisterLandModal from "@/components/RegisterLandModal";
import DeleteLandModal from "@/components/DeleteLandModal";

import { useRouter } from "next/navigation";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import type { LandData, Land, LandUseEnum, StatusEnum } from "@/types/interfaces";

import Loading from "@/components/Loading/Loading";
import { EllipsisVertical } from 'lucide-react';



type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

const mockData: Land[] = [
  {
    id: "1",
    owner: "0xhdhf1234567890abcdef1234567890e45rf",
    location: {
      latitude: 0,
      longitude: 0
    },
    area: 13000,
    land_use: {
      variant: { Residential: {} }
    },
    status: {
      variant: { Pending: {} }
    },
    last_transaction_timestamp: "1634567890",
    inspector: "0x1234567890abcdef1234567890abcdef",
    fee: 100
  },
  {
    id: "2",
    owner: "0xhdhf1234567890abcdef1234567890e45rf",
    location: {
      latitude: 10,
      longitude: 10
    },
    area: 13000,
    land_use: {
      variant: { Commercial: {} }
    },
    status: {
      variant: { Approved: {} }
    },
    last_transaction_timestamp: "1634567891",
    inspector: "0x5678567890abcdef1234567890abcdef",
    fee: 150
  },
  {
    id: "3",
    owner: "0xhdhf1234567890abcdef1234567890dehrt",
    location: {
      latitude: 20,
      longitude: 20
    },
    area: 13000,
    land_use: {
      variant: { Industrial: {} }
    },
    status: {
      variant: { Unapproved: {} }
    },
    last_transaction_timestamp: "1634567892",
    inspector: "0x9abc567890abcdef1234567890abcdef",
    fee: 200
  },
  {
    id: "4",
    owner: "0xabcd1234567890abcdef1234567890efgh",
    location: {
      latitude: 30,
      longitude: 30
    },
    area: 15000,
    land_use: {
      variant: { Residential: {} }
    },
    status: {
      variant: { Pending: {} }
    },
    last_transaction_timestamp: "1634567893",
    inspector: "0xdef0567890abcdef1234567890abcdef",
    fee: 120
  },
  {
    id: "5",
    owner: "0xijkl1234567890abcdef1234567890mnop",
    location: {
      latitude: 40,
      longitude: 40
    },
    area: 18000,
    land_use: {
      variant: { Commercial: {} }
    },
    status: {
      variant: { Approved: {} }
    },
    last_transaction_timestamp: "1634567894",
    inspector: "0x1234567890abcdef1234567890abcdef",
    fee: 180
  },
  {
    id: "6",
    owner: "0xqrst1234567890abcdef1234567890uvwx",
    location: {
      latitude: 50,
      longitude: 50
    },
    area: 12000,
    land_use: {
      variant: { Industrial: {} }
    },
    status: {
      variant: { Unapproved: {} }
    },
    last_transaction_timestamp: "1634567895",
    inspector: "0x5678567890abcdef1234567890abcdef",
    fee: 160
  },
  {
    id: "7",
    owner: "0xyzab1234567890abcdef1234567890cdef",
    location: {
      latitude: 60,
      longitude: 60
    },
    area: 14000,
    land_use: {
      variant: { Residential: {} }
    },
    status: {
      variant: { Pending: {} }
    },
    last_transaction_timestamp: "1634567896",
    inspector: "0x9abc567890abcdef1234567890abcdef",
    fee: 140
  },
  {
    id: "8",
    owner: "0xhdhf1234567890abcdef1234567890e45rf",
    location: {
      latitude: 10,
      longitude: 10
    },
    area: 13000,
    land_use: {
      variant: { Commercial: {} }
    },
    status: {
      variant: { Approved: {} }
    },
    last_transaction_timestamp: "1634567891",
    inspector: "0x5678567890abcdef1234567890abcdef",
    fee: 150
  }
];


export function LandsInspectorView() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { address } = useAccount()
  const { contract: landRegisterContract } = useLandverContract({ name: "landRegister" })

  const [lands, setLands] = useState<Land[]>(mockData)

  const [editData, setEditData] = useState<null | LandData>(null)

  const [indexToShowOptions, setIndexToShowOptions] = useState<number | null>(null)
  const [showStatusFilters, setShowStatusFilters] = useState(false)
  const [dateRange] = useState<Value>([new Date(), new Date()]);
  const [, setShowDateRangeCalendar] = useState(false)
  const [showDeleteLandModal, setShowDeleteLandModal] = useState(false)

  useEffect(() => {
    setShowDateRangeCalendar(false)
  }, dateRange)

  useEffect(() => {
    (async () => {
      try {
        if (address) {
          setLoading(true)
          console.log("Lands state after setting:", lands);
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    })()
  }, [address])

  return (
    <div className="">
      <Header title="Verification" />

      <div className="px-6 py-4">
        <div className="w-full bg-white rounded-xl px-3 py-4">
          <div className="flex justify-between items-start gap-2 flex-wrap">
            <div className="w-full lg:w-4/6">
              <Searchbar />
            </div>
            <div className="flex gap-3">
              <div onClick={() => setShowStatusFilters(!showStatusFilters)} className="cursor-pointer relative rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex gap-1">
                <p>status</p>
                <Image src={"icons/common/dropdown-grey.svg"} alt="" width={12} height={12} />
                <DropdownMenu
                  items={[
                    { label: "All", action: () => { } },
                    { label: "Approved", action: () => { } },
                    { label: "Unapproved", action: () => { } },
                    { label: "Bought", action: () => { } },
                  ]}
                  position="bottom"
                  show={showStatusFilters}
                />
              </div>
            </div>
          </div>

          <div className="py-4">
            <div className="bg-white rounded-xl container_scrollable px-6">
              <div className="h-[450px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-[2px] border-dotted">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">NO</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">OWNERS ADDRESS</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">LOCATION</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">LAND AREA</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">DATE</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">STATUS</th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7}>
                          <Loading height={200} />
                        </td>
                      </tr>
                    ) : (
                      mockData.map((item, index) => (
                        <tr key={index} className="border-b-[2px] border-dotted text-sm">
                          <td className="py-4 px-4">{index + 1}</td>
                          <td className="py-4 px-4 font-semibold">{`${item.owner.slice(0, 7)}...${item.owner.slice(-5)}`}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                                <Image
                                  src="/images/image 1.png"
                                  alt="Location icon"
                                  width={16}
                                  height={16}
                                  className="text-white"
                                />
                              </div>
                              <span className="font-semibold">Metaverse</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold">{item.area}sqft</td>
                          <td className="py-4 px-4 text-gray-500">20/11/24</td>
                          <td className="py-4 px-4">
                            <div className="flex-1 flex gap-2 items-center font-bold">
                              {Object.keys(item.status.variant)[0] === "Approved" && (
                                <span className="px-2 py-1 rounded-md bg-green-50 text-green-400 text-sm">
                                  Approved
                                </span>
                              )}
                              {Object.keys(item.status.variant)[0] === "Pending" && (
                                <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-400 text-sm">
                                  Pending
                                </span>
                              )}
                              {Object.keys(item.status.variant)[0] === "Unapproved" && (
                                <span className="px-2 py-1 rounded-md bg-red-50 text-red-400 text-sm">
                                  Unapproved
                                </span>
                              )}
                              {Object.keys(item.status.variant)[0] === "Bought" && (
                                <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-600 text-sm">
                                  Bought
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right relative">
                            <button
                              onClick={() => setIndexToShowOptions(indexToShowOptions === index ? null : index)}
                              className="p-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-500"
                            >
                              <EllipsisVertical />
                            </button>
                            <DropdownMenu
                              items={[
                                { label: "View", action: () => router.push(`/my-collections/detail/${item.id}`) },
                                { label: "Approve", action: () => alert("Approved") },
                                { label: "Reject", action: () => alert("Approved") },
                                { label: "Flag", action: () => alert("Approved") },
                              ]}
                              position="bottom-right"
                              show={indexToShowOptions === index}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="h-24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegisterLandModal isOpen={!!editData} onClose={() => setEditData(null)} mode="edit" editData={editData ?? undefined} />
      <DeleteLandModal isOpen={showDeleteLandModal} onClose={() => { setShowDeleteLandModal(false) }} />
    </div>
  );
}

