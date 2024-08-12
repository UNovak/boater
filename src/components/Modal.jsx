import Icon from '@components/Icon'
import useStore from '@utils/Store'

const Modal = ({ className, content }) => {
  const isOpen = useStore((state) => state.modal.isOpen)
  const toggleModal = useStore((state) => state.toggleModal)

  if (!isOpen) return null

  return (
    <>
      {/* modal */}
      <div
        className={`fixed bottom-0 left-0 z-50 w-full transform rounded-t-lg p-4 sm:left-1/2 sm:top-1/2 sm:w-1/3 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg ${className}`}>
        <button
          className='group absolute right-2 top-2'
          type='button'
          onClick={() => toggleModal()}>
          <Icon
            type='Close'
            className='size-9 rounded-full p-1 group-hover:bg-gray-50 group-hover:text-red-700'
          />
        </button>
        {content}
      </div>

      {/* backdrop */}
      <div
        className='fixed inset-0 z-40 size-full overflow-hidden bg-black opacity-50'
        onClick={() => toggleModal()}
      />
    </>
  )
}

export default Modal
