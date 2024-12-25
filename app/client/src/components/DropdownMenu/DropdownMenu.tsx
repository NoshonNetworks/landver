import React from 'react'

import type { DropdownMenuProps } from '@/types/interfaces'

const POSITIONS = {
  "bottom-left": "left-0 top-[105%] origin-top-left",
  "top-left": "left-0 bottom-[105%] origin-bottom-left",
  'bottom-right': "right-0 top-[105%] origin-top-right",
  "top-right": "right-0 bottom-[105%] origin-bottom-right",
  "bottom": "-right-2 -left-2 top-[105%] origin-top",
}

const VARIANTS = {
  "base": "text-gray-500",
  "danger": "text-red-500",
}

function DropdownMenu({position, items, show }:DropdownMenuProps) {
  return (
    <div className={`transition-all absolute ${ POSITIONS[position] } bg-white shadow-md shadow-gray-400 rounded-xl px-3 py-2`} style={{ transform:`scale(${show?"1":"0"})`, zIndex:10000 }}>
      {
        items.map((item, index) => {
          return (
            <p key={'dditemmenu'+index} onClick={()=>item.action()} className={`cursor-pointer font-normal ${item.variant?VARIANTS[item.variant]:"text-gray-500"}`}>{ item.label }</p>
          )
        })
      }
      
    </div>
  )
}

export {DropdownMenu}