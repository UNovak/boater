import Icon from '@components/Icon'
import { useState } from 'react'

const ImageCarousel = ({ images }) => {
  const [img, setImg] = useState(0)

  const forward = () => {
    if (img >= images.length - 1) {
      setImg(0)
    } else setImg(img + 1)
  }

  const back = () => {
    if (img <= 0) {
      setImg(images.length - 1)
    } else setImg(img - 1)
  }

  return (
    <>
      <div className='relative h-full w-full'>
        <img
          src={images[img]}
          className='h-full w-full rounded object-cover'
          alt='showcaseing the boat'
        />

        <button
          className='group absolute left-0 top-1/2 z-10 -translate-y-1/2 transform'
          type='button'
          onClick={() => back()}>
          <Icon
            className='m-2 size-10 rounded-full text-gray-400 group-hover:bg-gray-700 group-hover:bg-opacity-80 group-hover:text-blue-500'
            type='Chevron_back'
          />
        </button>

        <div className='absolute bottom-0 left-1/2 mb-1 flex -translate-x-1/2 flex-row gap-1'>
          {images?.map((image, index) => (
            <div
              className={`hover: size-2 rounded-full ${
                img === index ? 'bg-gray-100' : 'bg-gray-400'
              }`}
              key={index}
            />
          ))}
        </div>

        <button
          className='group absolute right-0 top-1/2 z-10 -translate-y-1/2 transform'
          type='button'
          onClick={() => forward()}>
          <Icon
            type='Chevron_forward'
            className='m-2 size-10 rounded-full text-gray-400 group-hover:bg-gray-700 group-hover:bg-opacity-80 group-hover:text-blue-500'
          />
        </button>
      </div>
    </>
  )
}

export default ImageCarousel
