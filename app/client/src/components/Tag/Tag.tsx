import React from 'react'
import type { TagProps } from '@/types/interfaces'

function Tag({ variant }:TagProps) {

  return (
    <>
      <div className={`${variant==="approved"&&"bg-[#E8FFF3]"} ${variant==="rejected"&&"bg-[#FFF5F8]"} ${variant==="pending"&&"bg-[#fff9e2]"} py-1 px-2 rounded-xl`}>
        { variant === "approved" && <p className="text-[#50CD89]">Approved</p>  }
        { variant === "pending" && <p className="text-[#c6a727]">Pending</p>  }
        { variant === "rejected" && <p className="text-[#ec4174]">Rejected</p>  }
      </div>
    </>
   
  )
}

export { Tag }