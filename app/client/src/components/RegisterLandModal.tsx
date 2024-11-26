import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CairoCustomEnum,} from "starknet";
import { useAccount } from "@starknet-react/core";
import { useLandverContract } from "@/hooks/useLandverContract";
import Image from "next/image";
import FadeLoader from "react-spinners/FadeLoader";

const LandUse = [
    {
      name: "Commercial",
      enum: new CairoCustomEnum({"Commercial": {}})
    },
    {
      name: "Industrial",
      enum: new CairoCustomEnum({"Industrial": {}})
    },
    {
      name: "Recreational",
      enum: new CairoCustomEnum({"Recreational": {}})
    },
    {
      name: "Residential",
      enum: new CairoCustomEnum({"Residential": {}})
    },
    {
      name: "Agricultural",
      enum: new CairoCustomEnum({"Agricultural": {}})
    },
    {
      name: "Institutional",
      enum: new CairoCustomEnum({"Institutional": {}})
    },
    {
      name: "Unclassified",
      enum: new CairoCustomEnum({"Unclassified": {}})
    },
    {
      name: "MixedUse",
      enum: new CairoCustomEnum({"MixedUse": {}})
    },
  ] 


import type { RegisterLandModalProps, LandData } from "@/types/interfaces"


const RegisterLandModal: React.FC<RegisterLandModalProps> = ({ isOpen, onClose, mode, editData }) => {
    const { account } = useAccount()
    const { contract:landRegisterContract } = useLandverContract({ name:"landRegister" })
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [landData, setLandData] = useState<LandData>(
      {
        area: null,
        landUse: "Commercial",
        latitude: null,
        longitude: null
    })


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async() => {
    try {
        if(!enableSubmit || loading) return 
            setError(false)
            setLoading(true)

            const landUseEnum = LandUse.find(lu => lu.name === landData.landUse)?.enum

            await landRegisterContract.connect(account)
            await landRegisterContract.register_land(
                { latitude:landData.latitude, longitude:landData.longitude }, 
                landData.area,
                landUseEnum
            )
            setLoading(false)
            onClose()
    } catch (error) {
        console.log("error ->", error)
        setLoading(false)
        setError(true)
    }
  }

  const handleEdit = async() => {
    try {
      if(!editData) return 
      // console.log(Number(editData.landId?.toString()))
      // return 
        if(!enableSubmit || loading) return 
            setError(false)
            setLoading(true)


            const landUseEnum = LandUse.find(lu => lu.name === landData.landUse)?.enum
            await landRegisterContract.connect(account)
            await landRegisterContract.update_land(
                editData.landId,
                landData.area, 
                landUseEnum,
            )
            setLoading(false)
            onClose()
    } catch (error) {
        console.log("error ->", error)
        setLoading(false)
        setError(true)
    }
  }
  
  // Check validity of inputs to enable CREATE_SAVE button
  useEffect(()=>{
    const enable = Object.values(landData).every(item => item) 
    setEnableSubmit(enable)
    setError(false)
  }, [landData])

  // Reset states when close 
  useEffect(()=>{
    if(!isOpen) {
        setLandData({
            area: 0,
            latitude: 0,
            longitude: 0,
            landUse: "Commercial"
        })
        setError(false)
        setLoading(false)
    }
  },[isOpen])

  // set land data 
  useEffect(()=>{
    if(isOpen && editData) {
        setLandData({
          ...editData  
        })
        setError(false)
        setLoading(false)
    }
  },[isOpen])


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      style={{ zIndex:1000 }}
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div>
            <div className="w-16 h-16 rounded-full mx-auto relative bg-[#F9F5FF] flex justify-center items-center">
                <div className="w-12 h-12 rounded-full mx-auto relative bg-[#F4EBFF] flex justify-center items-center">
                    <div className="w-9 h-9 rounded-full mx-auto relative">
                        <Image src={"/icons/sidebar/shared-selected.svg"} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
                    </div>
                </div>
            </div>
            {
              mode == "create" && <p className="text-xl font-semibold text-center mt-5">Register New Land</p>
            }
            {
              mode == "edit" && <p className="text-xl font-semibold text-center mt-5">Edit Land Registry</p>
            }
            {
              mode == "create" && <p className="text-center text-gray-500">Please enter all details to register your land</p> 
            }
            {/* FORM  */}
            <div>
                {
                  !editData &&
                  <div className="mt-4">
                      <p>Latitude <span className="text-red-500">*</span></p>
                      <input type="number" value={landData.latitude||undefined} onChange={(e)=>setLandData({...landData, latitude:Number(e.target.value)})}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                  </div>
                }
                {
                  !editData && 
                  <div className="mt-4">
                      <p>Longitude <span className="text-red-500">*</span></p>
                      <input type="number" value={landData.longitude||undefined} onChange={(e)=>setLandData({...landData, longitude:Number(e.target.value)})}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                  </div>
                }
                <div className="mt-4">
                    <p>Area <span className="text-red-500">*</span></p>
                    <input type="number" value={landData.area||undefined} onChange={(e)=>setLandData({...landData, area:Number(e.target.value)})}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                </div>
                <div className="mt-4">
                    <p>Land Use <span className="text-red-500">*</span></p>
                    <select value={landData.landUse} onChange={(e)=>setLandData({ ...landData, landUse:e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        LandUse.map((landUse, index) => {
                        return (
                            <option value={landUse.name} key={"unique-land-item-ddfa"+index}>
                            { landUse.name }
                            </option>
                        )
                        })
                    }
                    </select>
                </div>


                <div className="flex justify-between items-center gap-5 mt-7">
                    <div onClick={() => !loading && onClose()} className="cursor-pointer flex-1 px-5 py-1 text-gray-400 border-gray-300 border rounded-lg"><p className="text-center">Cancel</p></div>
                    {
                      mode === "create" && <div onClick={handleSubmit} className={`cursor-pointer flex-1 px-5 py-1 text-white border-transparent ${enableSubmit?"bg-[#7369e0]":"bg-[#E0E0E0]"} border-2 rounded-lg`}><p className="text-center">Submit</p></div>
                    }
                    {
                      mode === "edit" && <div onClick={handleEdit} className={`cursor-pointer flex-1 px-5 py-1 text-white border-transparent ${enableSubmit?"bg-[#7369e0]":"bg-[#E0E0E0]"} border-2 rounded-lg`}><p className="text-center">Save</p></div>
                    }
                </div>

                {
                    loading &&
                        <div className="flex justify-center items-center">
                            <FadeLoader
                                color="#6E62E5"
                                speedMultiplier={2}
                                radius={10}
                            />
                        </div>
                }

                {
                    error && 
                    <div className="py-1">
                        <p className="text-red-800 text-center">Transaction failed</p>
                    </div>
                }

            </div>
        </div>

      </div>

    <div className="">
        <p></p>
    </div>

    </div>
  );
};

export default RegisterLandModal;
