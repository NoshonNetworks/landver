import React from 'react'
import type { TableRowProps } from '@/types/interfaces'

const ALIGN_TEXT = {
  "center": 'text-center',
  "left": "text-left",
  "right": "text-right"
}

export function TableRow({ items, headers, showMobileHeaders = false }: TableRowProps) {
  return (
    <tr className="bg-white hover:bg-gray-50">
      {items.map((item, index) => (
        <td
          key={`item-${index}`}
          className={`
            py-4 px-4 whitespace-nowrap text-sm
            ${!item.fixedWidth ? 'w-auto' : ''}
            ${ALIGN_TEXT[item.alignText || "left"]}
            ${index === 0 ? 'font-medium text-gray-900' : 'text-gray-500'}
            ${item.className || ''}
          `}
          style={{ width: item.fixedWidth ?? 'auto' }}
        >
          {showMobileHeaders && (
            <div className="sm:hidden font-medium text-gray-900 mb-1">{headers[index]}</div>
          )}
          <div className="flex items-center gap-2">
            {item.value && <span>{item.value}</span>}
            {item.customjsx && item.customjsx()}
          </div>
        </td>
      ))}
    </tr>
  )
}

