"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ListingCreatedEvent, Event } from '@/types/interfaces'
import { shortAddress } from '@/utils/AddressFormat'
import { useAccount } from '@starknet-react/core'

function MarketCard({ item, favs, setFavs }:{ item:Event<ListingCreatedEvent>, favs?:string[], setFavs?:Dispatch<SetStateAction<string[]>> }) {

    const router = useRouter()
    const { address } = useAccount()

    const handleFav = (listingId:string) => {
      if(!favs || !setFavs) return 
      if(!address) return 
      const currentFavs = [...favs]
      let newFavs:string[] = [];
      if(currentFavs.includes(listingId)) newFavs = currentFavs.filter(id => id!=listingId)
      else if(!currentFavs.includes(listingId)) newFavs = [...currentFavs, listingId]
      setFavs(newFavs)
    }


  return (
    <div className="min-h-[300px] w-full px-0 sm:px-5 lg:px-0 xl:px-3">
        <div className="bg-white h-full rounded-lg w-full border border-gray-200 px-2 py-2">
          <div className="flex py-1 ">
            <div className="rounded-full w-12 h-12 bg-gray-200"></div>
            <div>
              <p className="text-base font-bold">{ shortAddress(item.parsedEvent.seller.toString()) }</p>
              <p className="text-gray-500">owner</p>
            </div>
            {
              favs && (
                <div className="flex justify-end flex-1 items-center" onClick={()=>handleFav(item.parsedEvent.listing_id.toString())}>
                  {
                    favs.includes(item.parsedEvent.listing_id.toString()) && <Image src={"/icons/common/favorite-filled.svg"} width={22} height={22} alt='' />
                  }
                  {
                    !favs.includes(item.parsedEvent.listing_id.toString()) && <Image src={"/icons/common/favorite-empty.svg"} width={22} height={22} alt='' />
                  }
                </div>
              )
            }
          </div>
          <div className="py-3">
            <div className="bg-gray-200 w-full h-[250px] rounded-lg"></div>
          </div>
          <div className="h-[1px] w-full bg-gray-200 my-3"></div>
          <div className="flex py-1 ">
            <div>
              <p className="text-gray-500 text-sm">price</p>
              <p className="text-base font-bold">{item.parsedEvent.price.toString()} ETH</p>
            </div>
            <div onClick={()=>{ router.push(`/market-store/detail/${item.parsedEvent.listing_id}`) }} className="cursor-pointer flex justify-end flex-1 items-center">
              <Button variant="whiteWithBorder">
                View Details
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}

export { MarketCard }