import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const mouseDownOnOverlay = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onMouseDown={(e) => {
        mouseDownOnOverlay.current = e.target === e.currentTarget
      }}
      onMouseUp={(e) => {
        if (mouseDownOnOverlay.current && e.target === e.currentTarget) {
          onClose()
        }
        mouseDownOnOverlay.current = false
      }}
    >
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal