import React from 'react'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function MarketCard({ key, item }:{ key:any, item:number }) {

    const router = useRouter()

  return (
    <div className="min-h-[300px] w-full px-0 sm:px-5 lg:px-0 xl:px-3">
        <div className="bg-white h-full rounded-lg w-full border border-gray-200 px-2 py-2">
          <div className="flex py-1 ">
            <div className="rounded-full w-12 h-12 bg-gray-200"></div>
            <div>
              <p className="text-base font-bold">Tress-30</p>
              <p className="text-gray-500">owner</p>
            </div>
            <div className="flex justify-end flex-1 items-center">
              <Image src={"/icons/common/favorite-filled.svg"} width={22} height={22} alt='' />
            </div>
          </div>
          <div className="py-3">
            <div className="bg-gray-200 w-full h-[250px] rounded-lg"></div>
          </div>
          <div className="h-[1px] w-full bg-gray-200 my-3"></div>
          <div className="flex py-1 ">
            <div>
              <p className="text-gray-500 text-sm">price</p>
              <p className="text-base font-bold">0.25 ETH</p>
            </div>
            <div onClick={()=>{ router.push(`/market-store/detail/${item}`) }} className="cursor-pointer flex justify-end flex-1 items-center">
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