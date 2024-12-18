import React from 'react'

import type { TableRowProps } from '@/types/interfaces'

const ALIGN_TEXT = {
  "center":'text-center',
  "left":"text-left",
  "right":"text-right"
}

function TableRow({ items, headers }:TableRowProps) {
  return (
    <div className="flex flex-col 2xl:flex-row justify-start 2xl:items-center w-full gap-1 border-dashed border-t-2 border-t-gray-300 mt-5 pt-5 font-semibold">
      {
        items.map((item, index)=>{
          return(
            <div 
              key={"item"+item.value+"TableHeader"+index} 
              className={`
                ${ !item.fixedWidth && `flex-1` }
                ${ ALIGN_TEXT[item.alignText || "left"] } 
                flex items-center 2xl:block gap-2
                `}
                style={{ width:item.fixedWidth??"auto" }}
            >
              <p className='2xl:hidden'>{headers[index]}: </p>
              <p>
                { item.value && item.value }
              </p>
              { item.customjsx && item.customjsx() }
            </div>
          )
        })
      }
    </div>
  )
}

export {TableRow}