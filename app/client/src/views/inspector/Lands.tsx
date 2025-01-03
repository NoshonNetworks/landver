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
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";

import Loading from "@/components/Loading/Loading";
import { EllipsisVertical } from 'lucide-react';

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

// Mock data remains the same
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
  }, [dateRange])

  // Fetch live data effect
  useEffect(() => {
    const fetchLandsData = async () => {
      try {
        if (address && landRegisterContract) {
          setLoading(true)

          const landsAddresses: string[] = await landRegisterContract.get_lands_by_owner(address)

          if (landsAddresses && landsAddresses.length > 0) {
            const landsPromises = landsAddresses.map(async (landId) => {
              try {
                const landDetails = await landRegisterContract.get_land(landId)
                return {
                  id: landId,
                  ...landDetails
                }
              } catch (error) {
                console.error(`Error fetching land details for ${landId}:`, error)
                return null
              }
            })

            const landsData = (await Promise.all(landsPromises)).filter(land => land !== null) as Land[]
            setLands(landsData)
          }

          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching lands:", error)
        setLoading(false)
      }
    }

    fetchLandsData()
  }, [address, landRegisterContract])

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
            <div className="bg-white rounded-xl container_scrollable">
              <div className="h-[450px]">
                <table className="min-w-full divide-y divide-dotted divide-gray-200">
                  <TableHeader
                    items={[
                      {
                        label: "NO", fixedWidth: 70,
                        className: ""
                      },
                      {
                        label: "OWNERS ADDRESS",
                        className: ""
                      },
                      {
                        label: "LOCATION",
                        className: ""
                      },
                      {
                        label: "LAND AREA",
                        className: ""
                      },
                      {
                        label: "DATE",
                        className: ""
                      },
                      {
                        label: "STATUS",
                        className: ""
                      },
                      {
                        label: "ACTIONS", alignText: "center",
                        className: ""
                      },
                    ]}
                  />
                  <tbody className="bg-white divide-y-2 divide-dotted divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={7}>
                          <Loading height={200} />
                        </td>
                      </tr>
                    ) : (
                      lands.map((item, index) => (
                        <TableRow
                          key={`land-row-${index}`}
                          items={[
                            {
                              value: (index + 1).toString(), fixedWidth: 70,
                              className: ""
                            },
                            {
                              value: `${item.owner.slice(0, 7)}...${item.owner.slice(-5)}`,
                              className: "font-bold"
                            },
                            {
                              customjsx: () => (
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                                    <Image
                                      src="/images/image 1.png"
                                      alt="Location icon"
                                      width={16}
                                      height={16}
                                      className="text-white" />
                                  </div>
                                  <span className="font-bold">Metaverse</span>
                                </div>
                              ),
                              className: ""
                            },
                            {
                              value: `${item.area}sqft`,
                              className: "font-bold"
                            },
                            {
                              value: new Date(parseInt(item.last_transaction_timestamp) * 1000).toLocaleDateString(),
                              className: ""
                            },
                            {
                              customjsx: () => (
                                <div className="flex-1 flex gap-2 items-center font-bold">
                                  {(() => {
                                    const status = Object.keys(item.status.variant)[0];
                                    switch (status) {
                                      case 'Approved':
                                        return <span className="px-2 py-1 rounded-md bg-green-50 text-green-400 text-sm">Approved</span>;
                                      case 'Pending':
                                        return <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-400 text-sm">Pending</span>;
                                      case 'Unapproved':
                                        return <span className="px-2 py-1 rounded-md bg-red-50 text-red-400 text-sm">Unapproved</span>;
                                      case 'Bought':
                                        return <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-600 text-sm">Bought</span>;
                                      default:
                                        return null;
                                    }
                                  })()}
                                </div>
                              ),
                              className: ""
                            },
                            {
                              customjsx: () => (
                                <div className="relative text-center w-full">
                                  <button
                                    onClick={() => setIndexToShowOptions(indexToShowOptions === index ? null : index)
                                    }
                                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-500"
                                  >
                                    <EllipsisVertical />
                                  </button>
                                  <DropdownMenu
                                    items={[
                                      { label: "View", action: () => router.push(`/my-collections/detail/${item.id}`) },
                                      { label: "Approve", action: () => alert("Approved") },
                                      { label: "Reject", action: () => alert("Rejected") },
                                      { label: "Flag", action: () => alert("Flagged") },
                                    ]}
                                    position="bottom-right"
                                    show={indexToShowOptions === index} />
                                </div>
                              ),
                              className: ""
                            },
                          ]}
                          headers={[
                            "NO",
                            "OWNERS ADDRESS",
                            "LOCATION",
                            "LAND AREA",
                            "DATE",
                            "STATUS",
                            "ACTIONS"
                          ]}
                          showMobileHeaders={false}
                        />
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