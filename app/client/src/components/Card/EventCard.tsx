import React from 'react'
import Image from 'next/image'

import type { DynamicObject, Event, FeeUpdatedEvent, InspectorAddedEvent, InspectorRemovedEvent, LandInspectorSetEvent, LandRegisteredEvent, LandSoldEvent, LandTransferredEvent, LandUpdatedEvent, LandVerifiedEvent, ListingCancelledEvent, ListingCreatedEvent, ListingPriceUpdatedEvent, ParsedEventsEnum } from '@/types/interfaces'
import { shortAddress } from '@/utils/AddressFormat'
import { useBlockies } from '@/hooks/useBlockies'

interface EventCardProps {
  event: Event<ParsedEventsEnum>,
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
        <div className="flex justify-start items-start gap-2 mt-4 cursor-default min-h-[60px]">
          { event.eventName==="ListingCreated" && <ListingCreatedEventCard event={event as Event<ListingCreatedEvent>} /> }
          { event.eventName==="LandRegistered" && <LandRegisteredEventCard event={event as Event<LandRegisteredEvent>} /> }
          { event.eventName==="LandTransferred" && <LandTransferredEventCard event={event as Event<LandTransferredEvent>} /> }
          { event.eventName==="LandVerified" && <LandVerifiedEventCard event={event as Event<LandVerifiedEvent>} /> }
          { event.eventName==="LandUpdated" && <LandUpdatedEventCard event={event as Event<LandUpdatedEvent>} /> }
          { event.eventName==="LandInspectorSet" && <LandInspectorSetEventCard event={event as Event<LandInspectorSetEvent>} /> }
          { event.eventName==="InspectorAdded" && <InspectorAddedEventCard event={event as Event<InspectorAddedEvent>} /> }
          { event.eventName==="InspectorRemoved" && <InspectorRemovedEventCard event={event as Event<InspectorRemovedEvent>} /> }
          { event.eventName==="FeeUpdated" && <FeeUpdatedEventCard event={event as Event<FeeUpdatedEvent>} /> }
          { event.eventName==="ListingCancelled" && <ListingCancelledEventCard event={event as Event<ListingCancelledEvent>} /> }
          { event.eventName==="ListingPriceUpdated" && <ListingPriceUpdatedEventCard event={event as Event<ListingPriceUpdatedEvent>} /> }
          { event.eventName==="LandSold" && <LandSoldEventCard event={event as Event<LandSoldEvent>} /> }
        </div>
      )
}

export { EventCard }


const ListingCreatedEventCard = ({ event }: { event: Event<ListingCreatedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
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
    </>
  )
}

const LandRegisteredEventCard = ({ event }: { event: Event<LandRegisteredEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">Owner: { shortAddress(event.rawEvent.from_address.toString())  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const LandTransferredEventCard = ({ event }: { event: Event<LandTransferredEvent> }) => {
  return (
    <>
    {/* {
      ,
      ,
      ,
    } */}
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">Land: { shortAddress(event.parsedEvent.land_id.toString())  }</p>
        <p className="">From: { shortAddress(event.parsedEvent.from_owner.toString())  }</p>
        <p className="">To: { shortAddress(event.parsedEvent.to_owner.toString())  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const LandVerifiedEventCard = ({ event }: { event: Event<LandVerifiedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">land: { shortAddress(event.parsedEvent.land_id.toString())  }</p>
        <p className="">Inspector: { shortAddress(event.rawEvent.from_address)  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const LandUpdatedEventCard = ({ event }: { event: Event<LandUpdatedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">Land: { shortAddress(event.parsedEvent.land_id.toString())  }</p>
        <p className="">Owner: { shortAddress(event.rawEvent.from_address)  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const LandInspectorSetEventCard = ({ event }: { event: Event<LandInspectorSetEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">Inspector: { shortAddress(event.parsedEvent.inspector.toString())  }</p>
        <p className="">Land assigned: { shortAddress(event.parsedEvent.land_id.toString())  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const InspectorAddedEventCard = ({ event }: { event: Event<InspectorAddedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">Inspector: { shortAddress(event.parsedEvent.inspector.toString())  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const InspectorRemovedEventCard = ({ event }: { event: Event<InspectorRemovedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">Inspector: { shortAddress(event.parsedEvent.inspector.toString())  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const FeeUpdatedEventCard = ({ event }: { event: Event<FeeUpdatedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{ EVENTS_KEY_LABEL[event.eventName]  }</p>
        <p className="">New Fee: { event.parsedEvent.new_fee  }</p>
        {/* <p className="text-gray-400">Land Approval</p>
        <p className="text-[#50CD89] 2xl:hidden block">Approved</p> red #F1416C */}
      </div>
      <div className="bg-[#E8FFF3] py-1 px-2 rounded-xl hidden 2xl:block"> {/* red #FFF5F8 */}
        {/* <p className="text-[#50CD89]">Approved</p> red #F1416C */}
      </div>
    </>
  )
}

const ListingCancelledEventCard = ({ event }: { event: Event<ListingCancelledEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
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
    </>
  )
}

const ListingPriceUpdatedEventCard = ({ event }: { event: Event<ListingPriceUpdatedEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
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
    </>
  )
}

const LandSoldEventCard = ({ event }: { event: Event<LandSoldEvent> }) => {
  return (
    <>
      <div className="w-12 h-12 rounded-md bg-gray-300 relative overflow-hidden">
        <EventImage eventName={EVENTS_KEY_LABEL[event.eventName as string]} />
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
    </>
  )
}


const EventImage = ({ eventName }:{eventName:string}) => {
  const { blockiesImageSrc } = useBlockies({ address:eventName }) 
  return <Image src={blockiesImageSrc} alt="ether" fill style={{ objectFit:"cover", objectPosition:"center" }} />
}