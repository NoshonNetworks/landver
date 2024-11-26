import React from 'react'
import Image from 'next/image'

import type { SmallNumberCardProps } from '@/types/interfaces'

function SmallNumberCard({ iconColor, title, subtitle }:SmallNumberCardProps) {
    const iconBgColors = {
        blue: "#EFF5FF",
        yellow:"#FFF7E1",
        orange: "#FFF4F1",
        purple: "#F0EFFF",
        green: "#F4FDF9"
      }
      
      const iconPaths = {
        blue: "/icons/common/stack-blue.svg",
        yellow:"/icons/common/stack-yellow.svg",
        orange: "/icons/common/stack-orange.svg",
        purple: "/icons/common/stack-purple.svg",
        green: "/icons/common/stack-green.svg",
      }
    
      return (
        <div className="w-full bg-white rounded-xl flex justify-start items-start px-3 py-4 gap-2">
          <div className={`w-16 h-16 rounded-full flex justify-center items-center`} style={{ background:iconBgColors[iconColor] }}>
            <Image src={iconPaths[iconColor]} alt="stack" width={35} height={35} />
          </div>
          <div className="">
            <p className="text-2xl text-black font-bold">{ title }</p>
            <p className="text-base text-gray-600">{ subtitle }</p>
          </div>
        </div>
      )
}

export { SmallNumberCard }