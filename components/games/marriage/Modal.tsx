import React from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevents the modal inner from closing the modal
  }

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md max-w-md w-full'
        onClick={handleModalClick}
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <button onClick={onClose} className='text-lg font-semibold'>
            ×
          </button>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
