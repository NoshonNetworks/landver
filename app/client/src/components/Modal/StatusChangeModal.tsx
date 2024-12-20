'use client'

import { Button } from "@/components/ui/button"
import { Check, Flag, X, Edit, Trash2 } from 'lucide-react'
import Modal from "./Modal"


interface StatusChangeModalProps {
  isOpen: boolean
  onClose: () => void
  onStatusChange: (status: 'Approved' | 'Unapproved' | 'Flagged') => void
  onEdit: () => void
  onDelete: () => void
  currentStatus?: string
}

export function StatusChangeModal({ isOpen, onClose, onStatusChange, onEdit, onDelete, currentStatus }: StatusChangeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="pt-2">
        <h2 className="text-lg font-semibold mb-4">Land Actions</h2>
        <div className="grid gap-4">
          <Button
            onClick={() => onStatusChange('Approved')}
            className={`flex items-center gap-2 ${currentStatus === 'Approved' ? 'bg-green-100 text-green-600' : ''}`}
            variant="outline"
          >
            <Check className="h-4 w-4" />
            Approve Land
          </Button>
          <Button
            onClick={() => onStatusChange('Unapproved')}
            className={`flex items-center gap-2 ${currentStatus === 'Unapproved' ? 'bg-red-100 text-red-600' : ''}`}
            variant="outline"
          >
            <X className="h-4 w-4" />
            Reject Land
          </Button>
          <Button
            onClick={() => onStatusChange('Flagged')}
            className={`flex items-center gap-2 ${currentStatus === 'Flagged' ? 'bg-yellow-100 text-yellow-600' : ''}`}
            variant="outline"
          >
            <Flag className="h-4 w-4" />
            Flag Land
          </Button>
          <Button
            onClick={onEdit}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Edit className="h-4 w-4" />
            Edit Land
          </Button>
          <Button
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200"
            variant="outline"
          >
            <Trash2 className="h-4 w-4" />
            Delete Land
          </Button>
        </div>
      </div>
    </Modal>
  )
}

