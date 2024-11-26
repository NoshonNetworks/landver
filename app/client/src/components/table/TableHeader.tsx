import React from 'react'
import type { TableHeaderProps } from '@/types/interfaces'


const ALIGN_TEXT = {
  "center":'text-center',
  "left":"text-left",
  "right":"text-right"
}

function TableHeader({ items }:TableHeaderProps) {
  return (
    <div className="hidden 2xl:flex justify-start items-center w-full gap-1 mt-5 pt-5 text-gray-400 font-semibold text-base">
      {
        items.map((item, index)=>{
          return(
            <div 
              key={"item"+item.label+"TableHeader"+index} 
              className={`
                ${ !item.fixedWidth && `flex-1` }
                ${ ALIGN_TEXT[item.alignText || "left"] } 
                `}
                style={{ width:item.fixedWidth??"auto" }}
            >
              { item.label }
            </div>
          )
        })
      }
    </div>
  )
}

export {TableHeader}