import React from 'react'
import Image from 'next/image'

import type { DynamicObject, SmallNumberCardProps } from '@/types/interfaces'
import { shortAddress } from '@/utils/AddressFormat'
import { useBlockies } from '@/hooks/useBlockies'

interface EventCardProps {
  event:any,
  index: number
}

const EVENTS_KEY_LABEL:DynamicObject = {
  'LandRegistered':"Land Registered",
  'LandTransfered':"Land Transfered",
  'LandVerified':"Land Verified",
  'LandUpdated':"Land Updated",
  'LandInspectorSet':"Inspector asigned to land",
  'InspectorAdded':"Inspector created",
  'InspectorRemoved':"Inspector removed",
  'ListingCreated':"New listing created",
  'ListingCancelled':"Listing cancelled",
  'ListingPriceUpdated':"Listing price updated",
  'LandSold':"Land sold",
}

function EventCard({ event }:EventCardProps) {
    
      return (
        <div className="flex justify-start items-start gap-2 mt-4 cursor-default">
          <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
            <EventImage eventName={EVENTS_KEY_LABEL[event.eventName]} />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
            <p className="">From: { shortAddress(event.rawEvent.from_address)  }</p>
            {/* <p className="text-gray-400">Land Approval</p>
            <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
          </div>
          <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
            {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
          </div>
        </div>
      )
}

export { EventCard }


const EventImage = ({ eventName }:{eventName:string}) => {
  const { blockiesImageSrc } = useBlockies({ address:eventName }) 
  return <Image src={blockiesImageSrc} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
}