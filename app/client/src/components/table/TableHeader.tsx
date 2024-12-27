import React from 'react'
import type { TableHeaderProps } from '@/types/interfaces'

const ALIGN_TEXT = {
  "center": 'text-center',
  "left": "text-left",
  "right": "text-right"
}

export function TableHeader({ items }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {items.map((item, index) => (
          <th
            key={`header-${index}`}
            scope="col"
            className={`
              py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
              ${!item.fixedWidth ? 'w-auto' : ''}
              ${ALIGN_TEXT[item.alignText || "left"]}
              ${item.className || ''}
            `}
            style={{ width: item.fixedWidth ?? 'auto' }}
          >
            {item.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

