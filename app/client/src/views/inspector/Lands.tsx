"use client";
import { useState, useEffect } from "react";
import { Header } from "@/components/Headers/Header";
import { Searchbar } from "@/components/Search/Searchbar";
import Image from "next/image";
import { useAccount } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import RegisterLandModal from "@/components/RegisterLandModal";
import DeleteLandModal from "@/components/DeleteLandModal";
import { useRouter } from "next/navigation";
import { Tag } from "@/components/Tag/Tag";
import { TableHeader } from "@/components/table/TableHeader";
import { TableRow } from "@/components/table/TableRow";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import type {
    LandData,
    Land,
    LandUseEnum,
    StatusEnum,
} from "@/types/interfaces";
import Loading from "@/components/Loading/Loading";
import {
    generateMockLands,
    formatTimestamp,
    formatArea,
    formatAddress,
    generateLandId,
} from "../../utils/mockData";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece];

export function LandsInspectorView() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { address } = useAccount();
    const { contract: landRegisterContract } = useLandverContract({
        name: "landRegister",
    });

    const [lands, setLands] = useState<Land[]>([]);
    const [editData, setEditData] = useState<null | LandData>(null);
    const [indexToShowOptions, setIndexToShowOptions] = useState<null | number>(
        null
    );
    const [showStatusFilters, setShowStatusFilters] = useState(false);
    const [dateRange] = useState<Value>([new Date(), new Date()]);
    const [, setShowDateRangeCalendar] = useState(false);
    const [showDeleteLandModal, setShowDeleteLandModal] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(true);

    useEffect(() => {
        setShowDateRangeCalendar(false);
    }, dateRange);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (isDemoMode) {
                    const mockLands = generateMockLands(15);
                    setLands(mockLands);
                    setLoading(false);
                    return;
                }

                if (address) {
                    const addresses =
                        await landRegisterContract.get_lands_by_owner(address);
                    const newLands: Land[] = [];

                    for await (const address of addresses) {
                        const land = await landRegisterContract.get_land(
                            address
                        );
                        const landStatus = Object.entries(
                            land.status.variant
                        ).find((entry) => entry[1]);
                        const landUse = Object.entries(
                            land.land_use.variant
                        ).find((entry) => entry[1]);

                        if (!landStatus || !landUse) return;

                        newLands.push({
                            id: address,
                            area: land.area,
                            inspector: land.inspector,
                            last_transaction_timestamp:
                                land.last_transaction_timestamp,
                            owner: land.owner,
                            fee: land.fee,
                            location: {
                                latitude: land.location.latitude,
                                longitude: land.location.longitude,
                            },
                            land_use: {
                                variant: {
                                    [landUse[0]]: {},
                                } as unknown as LandUseEnum,
                            },
                            status: {
                                variant: {
                                    [landStatus[0]]: {},
                                } as unknown as StatusEnum,
                            },
                        });
                    }

                    setLands(newLands.reverse());
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        })();
    }, [address, isDemoMode]);

    return (
        <div className="">
            <Header title="Verification" />

            <div className="px-6 py-4">
                <div className="w-full bg-white rounded-xl px-3 py-4">
                    <div className="mb-4">
                        <button
                            onClick={() => setIsDemoMode(!isDemoMode)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {isDemoMode
                                ? "Switch to Live Data"
                                : "Switch to Demo Mode"}
                        </button>
                    </div>

                    <div className="flex justify-between items-start gap-2 flex-wrap">
                        <div className="w-full lg:w-4/6">
                            <Searchbar />
                        </div>
                        <div className="flex gap-3">
                            <div
                                onClick={() =>
                                    setShowStatusFilters(!showStatusFilters)
                                }
                                className="cursor-pointer relative rounded-lg bg-gray-100 px-5 py-2 text-center text-gray-500 flex gap-1"
                            >
                                <p>status</p>
                                <Image
                                    src={"icons/common/dropdown-grey.svg"}
                                    alt=""
                                    width={12}
                                    height={12}
                                />
                                <DropdownMenu
                                    items={[
                                        { label: "All", action: () => {} },
                                        { label: "Approved", action: () => {} },
                                        {
                                            label: "Unapproved",
                                            action: () => {},
                                        },
                                        { label: "Bought", action: () => {} },
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
                                <TableHeader
                                    items={[
                                        { label: "NO", fixedWidth: 70 },
                                        { label: "LAND ID" },
                                        { label: "OWNERS ADDRESS" },
                                        { label: "Location" },
                                        { label: "LAND AREA" },
                                        { label: "DATE" },
                                        { label: "STATUS" },
                                        {
                                            label: "ACTIONS",
                                            alignText: "center",
                                        },
                                    ]}
                                />
                                {loading && <Loading height={200} />}
                                {!loading &&
                                    lands.map((item: Land, index) => (
                                        <TableRow
                                            headers={[
                                                "NO",
                                                "LAND ID",
                                                "OWNERS ADDRESS",
                                            ]}
                                            key={`uniquetablerow${index}`}
                                            items={[
                                                {
                                                    value: index + 1,
                                                    fixedWidth: 70,
                                                },
                                                { value: generateLandId() },
                                                {
                                                    value: formatAddress(
                                                        item.owner
                                                    ),
                                                },
                                                {
                                                    value: `${String(
                                                        item.location.latitude
                                                    ).slice(0, 6)}, ${String(
                                                        item.location.longitude
                                                    ).slice(0, 6)}`,
                                                },
                                                {
                                                    value: formatArea(
                                                        item.area
                                                    ),
                                                },
                                                {
                                                    value: formatTimestamp(
                                                        Number(
                                                            item.last_transaction_timestamp
                                                        )
                                                    ),
                                                },
                                                {
                                                    customjsx: () => (
                                                        <div className="flex-1 flex gap-2 items-center">
                                                            {Object.keys(
                                                                item.status
                                                                    .variant
                                                            )[0] ===
                                                                "Approved" && (
                                                                <Tag variant="approved" />
                                                            )}
                                                            {Object.keys(
                                                                item.status
                                                                    .variant
                                                            )[0] ===
                                                                "Pending" && (
                                                                <Tag variant="pending" />
                                                            )}
                                                            {Object.keys(
                                                                item.status
                                                                    .variant
                                                            )[0] ===
                                                                "Rejected" && (
                                                                <Tag variant="rejected" />
                                                            )}
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    customjsx: () => (
                                                        <div className="flex justify-center items-center">
                                                            <div
                                                                className="relative cursor-pointer flex"
                                                                onClick={() =>
                                                                    setIndexToShowOptions(
                                                                        indexToShowOptions ===
                                                                            null ||
                                                                            indexToShowOptions !==
                                                                                index
                                                                            ? index
                                                                            : null
                                                                    )
                                                                }
                                                            >
                                                                <Image
                                                                    className="hidden 2xl:block"
                                                                    src="/icons/common/options.svg"
                                                                    alt="options"
                                                                    width={5}
                                                                    height={5}
                                                                />
                                                                {Object.keys(
                                                                    item.status
                                                                        .variant
                                                                )[0] ===
                                                                    "Pending" && (
                                                                    <DropdownMenu
                                                                        items={[
                                                                            {
                                                                                label: "Edit",
                                                                                action: () =>
                                                                                    setEditData(
                                                                                        {
                                                                                            area: item.area,
                                                                                            landId: item.id,
                                                                                            landUse:
                                                                                                Object.keys(
                                                                                                    item
                                                                                                        .land_use
                                                                                                        .variant
                                                                                                )[0] as string,
                                                                                            latitude:
                                                                                                item
                                                                                                    .location
                                                                                                    .latitude,
                                                                                            longitude:
                                                                                                item
                                                                                                    .location
                                                                                                    .longitude,
                                                                                        }
                                                                                    ),
                                                                            },
                                                                            {
                                                                                label: "View",
                                                                                action: () =>
                                                                                    router.push(
                                                                                        `/my-collections/detail/${item.id}`
                                                                                    ),
                                                                            },
                                                                            {
                                                                                variant:
                                                                                    "danger",
                                                                                label: "Delete",
                                                                                action: () =>
                                                                                    setShowDeleteLandModal(
                                                                                        true
                                                                                    ),
                                                                            },
                                                                        ]}
                                                                        position="bottom-right"
                                                                        show={
                                                                            indexToShowOptions ===
                                                                            index
                                                                        }
                                                                    />
                                                                )}
                                                                {Object.keys(
                                                                    item.status
                                                                        .variant
                                                                )[0] !==
                                                                    "Pending" && (
                                                                    <DropdownMenu
                                                                        items={[
                                                                            {
                                                                                label: "View",
                                                                                action: () =>
                                                                                    router.push(
                                                                                        `/my-collections/detail/${item.id}`
                                                                                    ),
                                                                            },
                                                                            {
                                                                                label: "Transfer",
                                                                                action: () => {},
                                                                            },
                                                                        ]}
                                                                        position="bottom-right"
                                                                        show={
                                                                            indexToShowOptions ===
                                                                            index
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            {Object.keys(
                                                                item.status
                                                                    .variant
                                                            )[0] ===
                                                                "Pending" && (
                                                                <div className="flex gap-2">
                                                                    <p
                                                                        onClick={() =>
                                                                            setEditData(
                                                                                {
                                                                                    area: item.area,
                                                                                    landId: item.id,
                                                                                    landUse:
                                                                                        Object.keys(
                                                                                            item
                                                                                                .land_use
                                                                                                .variant
                                                                                        )[0] as string,
                                                                                    latitude:
                                                                                        item
                                                                                            .location
                                                                                            .latitude,
                                                                                    longitude:
                                                                                        item
                                                                                            .location
                                                                                            .longitude,
                                                                                }
                                                                            )
                                                                        }
                                                                        className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500"
                                                                    >
                                                                        Edit
                                                                    </p>
                                                                    <p
                                                                        onClick={() =>
                                                                            router.push(
                                                                                `/my-collections/detail/${item.id}`
                                                                            )
                                                                        }
                                                                        className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500"
                                                                    >
                                                                        View
                                                                    </p>
                                                                    <p
                                                                        onClick={() =>
                                                                            setShowDeleteLandModal(
                                                                                true
                                                                            )
                                                                        }
                                                                        className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-red-500"
                                                                    >
                                                                        Delete
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {Object.keys(
                                                                item.status
                                                                    .variant
                                                            )[0] !==
                                                                "Pending" && (
                                                                <div className="flex gap-2">
                                                                    <p
                                                                        onClick={() =>
                                                                            router.push(
                                                                                `/my-collections/detail/${item.id}`
                                                                            )
                                                                        }
                                                                        className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500"
                                                                    >
                                                                        View
                                                                    </p>
                                                                    <p className="cursor-pointer 2xl:hidden bg-gray-200 rounded-lg px-2 y-1 font-normal text-gray-500">
                                                                        Transfer
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    ))}
                                <div className="h-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RegisterLandModal
                isOpen={!!editData}
                onClose={() => setEditData(null)}
                mode="edit"
                editData={editData ?? undefined}
            />
            <DeleteLandModal
                isOpen={showDeleteLandModal}
                onClose={() => {
                    setShowDeleteLandModal(false);
                }}
            />
        </div>
    );
}
