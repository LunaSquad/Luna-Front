import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function ModalTurma({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-luna-modal-bg flex items-center justify-center z-900">
      <div className="relative bg-white !p-7.5 max-w-3xl shadow-xl shadow-luna-shadow2 rounded-2xl" onClick={(e) => e.stopPropagation()}>

        <button className="absolute top-4 right-2.5 bg-transparent border-none cursor-pointer text-black flex items-center justify-center" onClick={onClose}>
          <X size={15} />
        </button>
        {children}
      </div>
    </div>
  )
}