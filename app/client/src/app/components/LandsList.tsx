"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Connector } from "@starknet-react/core";
import { X } from "lucide-react";
import TextInput from "./Input/TextField";
import SelectField from "./Input/SelectField";
import Button from "./Button/Button";
import {
  useConnect,
  useDisconnect,
  useAccount,
  useContract,
  useSendTransaction,
  useNonceForAddress,
} from "@starknet-react/core";

import {
  CairoOption,
  CairoOptionVariant,
  CairoEnum,
  AbiEnum,
  StarknetEnumType,
  getCalldata,
  CairoCustomEnum,
} from "starknet";

import { ABI as LandRegistryABI } from "@/abis/LandRegistryAbi";
import { type Address } from "@starknet-react/chains";
import Paragraph from "./P/P";
import { DataTable } from "./Table/Table";
import { TableData } from "./Table/DefaultData";
import { columns } from "./Table/DefaultColumn";
import Modal from "./Modal/Modal";
import PlacesAutocomplete from "./Input/PlacesAutocomplete";

const contractAddress =
  "0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5";

enum a {
  Commercial,
}

type land_use = {
  Commercial: any;
};

export const LandList = () => {
  const LandUse = [
    {
      name: "Commercial",
      enum: new CairoCustomEnum({ Commercial: {} }),
    },
    {
      name: "Industrial",
      enum: new CairoCustomEnum({ Industrial: {} }),
    },
    {
      name: "Recreational",
      enum: new CairoCustomEnum({ Recreational: {} }),
    },
    {
      name: "Residential",
      enum: new CairoCustomEnum({ Residential: {} }),
    },
    {
      name: "Agricultural",
      enum: new CairoCustomEnum({ Agricultural: {} }),
    },
    {
      name: "Institutional",
      enum: new CairoCustomEnum({ Institutional: {} }),
    },
    {
      name: "Unclassified",
      enum: new CairoCustomEnum({ Unclassified: {} }),
    },
    {
      name: "MixedUse",
      enum: new CairoCustomEnum({ MixedUse: {} }),
    },
  ];

  const { address, status, account } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const { data, isLoading, isError, error } = useNonceForAddress({
    address: account?.address as Address,
  });
  const { contract } = useContract({
    abi: LandRegistryABI,
    address: contractAddress,
  });

  const [lands, setLands] = useState<any[]>([]);

  const [loadingList, setLoadingList] = useState(true);

  const [showAddInspectorModal, setShowAddInspectorModal] = useState(false);
  const [showAssignInspectorModal, setShowAssignInspectorModal] =
    useState(false);
  const [showCreateLandModal, setShowCreateLandModal] = useState(false);

  const [inspectorToAdd, setInspectorToAdd] = useState("");
  const [inspectorToAssign, setInspectorToAssign] = useState("");
  const [landToAssignInspector, setLandToAssignInspector] = useState<
    null | number
  >(null);
  const [createLandData, setCreateLandData] = useState({
    area: 0,
    latitude: 0,
    longitude: 0,
    landUse: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isDisabled =
      createLandData.area <= 0 ||
      createLandData.landUse.trim() === "" ||
      createLandData.latitude === 0 ||
      createLandData.longitude === 0;

      setIsButtonDisabled(isDisabled);
  }, [createLandData]);

  const filterData = ["all", "approved", "unapproved", "bought"];

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (status == "connected" && address) {
          setLoadingList(true);
          const addresses = await contract.get_lands_by_owner(address);
          const newLands = [];
          for await (const address of addresses) {
            const land = await contract.get_land(address);
            newLands.push({
              ...land,
              id: address,
              inspector_sliced:
                `${land.inspector}`.slice(0, 4) +
                "..." +
                `${land.inspector}`.slice(-4),
            });
          }
          setLands(newLands as any);
          setLoadingList(false);
        }
      } catch (error) {
        setLoadingList(false);
      }
    })();
  }, [status, address, refresh]);

  const addInspector = async () => {
    await contract.connect(account);
    const inspector_address = inspectorToAssign;
    const response = await contract.add_inspector(inspector_address);
  };

  const assignInspector = async () => {
    await contract.connect(account);
    const inspector_address = inspectorToAssign;
    const response = await contract.set_land_inspector(
      landToAssignInspector,
      inspector_address
    );
  };

  const getLocation = (data: any) => {
    console.log(data);
  };

  const removeInspector = async (inspector_id: string) => {
    console.log(inspector_id);
    await contract.connect(account);
    const inspector_address = inspector_id;
    const response = await contract.remove_inspector(inspector_address);
  };

  const createLand = async () => {
    try {
      await contract.connect(account);
      await contract.register_land(
        {
          latitude: createLandData.latitude,
          longitude: createLandData.longitude,
        },
        createLandData.area,
        LandUse[createLandData.landUse as any].enum
      );
      setCreateLandData({
        area: 0,
        latitude: 0,
        longitude: 0,
        landUse: '',
      });
      setRefresh(!refresh);
      setShowCreateLandModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* LAND LIST  */}
      <div className="px-10">
        <div className="flex justify-center items-center gap-10">
          <div
            // onClick={createLand}
            onClick={() => setShowCreateLandModal(true)}
            className=" cursor-pointer text-base font-bold text-gray-700 bg-gray-200 p-2 rounded-md">
            Register Land
          </div>
          <div
            onClick={() => {
              setShowAddInspectorModal(true);
            }}
            className=" cursor-pointer text-base font-bold text-gray-700 bg-gray-200 p-2 rounded-md">
            Add Inspector
          </div>
        </div>

        <div className="flex justify-end items-center gap-10">
          <div
            onClick={() => setRefresh(!refresh)}
            className=" cursor-pointer text-base font-bold text-gray-700 bg-gray-200 p-2 rounded-md">
            Refresh List
          </div>
        </div>

        <div className="p-10 bg-white">
          <DataTable columns={columns} data={TableData} filterData={filterData} searchBy="name" filterColumn="status"></DataTable>
        </div>

        <div className="pt-10">
          {loadingList && (
            <div className="flex h-52 justify-center items-center text-2xl font-bold">
              Loading...
            </div>
          )}
          {!loadingList &&
            lands.map((land) => {
              return (
                <div
                  key={land.last_transaction_timestamp}
                  className="grid grid-cols-3 gap-10 bg-gray-200 py-3 px-2 rounded-md mb-4">
                  <div>
                    <span className="font-semibold">Land use:</span>{" "}
                    {
                      Object.entries(land.land_use.variant).filter(
                        (item) => item[1]
                      )[0][0]
                    }
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {
                      Object.entries(land.status.variant).filter(
                        (item) => item[1]
                      )[0][0]
                    }
                  </div>
                  {!!land.inspector && (
                    <div className="">
                      <span className="font-semibold">Inspector:</span>{" "}
                      {land.inspector_sliced}
                    </div>
                  )}

                  {/* {
                                !!land.inspector && (
                                    <div onClick={()=>removeInspector(land.inspector)} className="bg-gray-200 ">remove inspector</div>
                                  )
                            } */}

                  {!land.inspector && (
                    <div
                      onClick={() => {
                        setShowAssignInspectorModal(true);
                        setLandToAssignInspector(land.id);
                      }}
                      className="font-semibold cursor-pointer">
                      Assign Inspector
                    </div>
                  )}

                  {/* <div className="bg-gray-200 ">edit</div> */}
                </div>
              );
            })}
        </div>
      </div>

      {/* add inspector modal  */}
      {showAddInspectorModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <div
              onClick={() => {
                setShowAddInspectorModal(false);
              }}
              className="text-center mb-3 cursor-pointer font-bold">
              Close
            </div>
            <div className="text-xl font-bold text-center">
              Add Inspector address
            </div>
            <input
              value={inspectorToAdd}
              onChange={(e) => setInspectorToAdd(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0x..."
            />
            <div
              onClick={() => addInspector()}
              className="text-center font-semibold p-2 bg-gray-100 cursor-pointer">
              Add Inspector
            </div>
            <div className="h-10"></div>
          </div>
        </div>
      )}
      {showAssignInspectorModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-10 rounded-lg">
            <div
              onClick={() => {
                setShowAssignInspectorModal(false);
              }}
              className="text-center mb-3 cursor-pointer font-bold">
              Close
            </div>
            <div className="text-xl font-bold text-center">
              Add Inspector address
            </div>
            <input
              value={inspectorToAssign}
              onChange={(e) => setInspectorToAssign(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0x..."
            />
            <div
              onClick={() => assignInspector()}
              className="font-semibold p-2 bg-gray-100 cursor-pointer">
              assign
            </div>
            <div className="h-10"></div>
          </div>
        </div>
      )}
      {/* {showCreateLandModal && ( */}
        <Modal onClose={() => setShowCreateLandModal(false)} isOpen={showCreateLandModal}>
            <div className="flex justify-center w-full mb-4">
              <Image
                src="/icons/layer.svg"
                alt="layer icon"
                height={48}
                width={48}
              />
            </div>
            <Paragraph
              size="h6"
              weight="semibold"
              align="center"
              classname="text-black-2">
              Register New Land
            </Paragraph>
            <Paragraph
              size="sm"
              weight="medium"
              align="center"
              classname="text-grey mt-2">
              Please enter all details to register your land
            </Paragraph>
            <div className="flex flex-col gap-1 w-full mt-5">
              <PlacesAutocomplete label="Address" onLocationSelect={getLocation} />
              <TextInput
                label="Latitude"
                id="latitude"
                type="text"
                placeholder="Latitude"
                required
                onChange={(value) =>
                  setCreateLandData({
                    ...createLandData,
                    latitude: value as any,
                  })
                }
                value={createLandData.latitude}
              />
              <TextInput
                label="Longitude"
                id="longitude"
                type="text"
                placeholder="Longitude"
                required
                onChange={(value) =>
                  setCreateLandData({
                    ...createLandData,
                    longitude: value as any,
                  })
                }
                value={createLandData.longitude}
              />
              <TextInput
                label="Area"
                id="area"
                type="text"
                placeholder="Area"
                required
                onChange={(value) =>
                  setCreateLandData({
                    ...createLandData,
                    area: value as any,
                  })
                }
                value={createLandData.area}
              />
              <SelectField
                label="Land Use"
                value={createLandData.landUse}
                nameKey="name"
                required
                options={LandUse}
                onChange={(value) =>
                  setCreateLandData({
                    ...createLandData,
                    landUse: value as any,
                  })
                }
              />
            </div>

            <div className="mt-8 flex gap-3 w-full">
              <Button
                variant="grey"
                outlined
                size="full"
                onClick={() => {
                  setShowCreateLandModal(false);
                }}>
                Cancel
              </Button>
              <Button
                variant="primary"
                disabled={isButtonDisabled}
                size="full"
                onClick={() => createLand()}>
                Add Land
              </Button>
            </div>
        </Modal>

    </div>
  );
};
