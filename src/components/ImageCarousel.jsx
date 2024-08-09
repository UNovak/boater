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

  const jump = (index) => {
    setImg(index)
  }

  return (
    <>
      <div className='relative h-full w-full'>
        <div className='group/all h-full rounded'>
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
              className='m-2 hidden size-10 rounded-full bg-gray-700 bg-opacity-40 text-gray-400 group-hover/all:inline-block group-hover:bg-opacity-80 group-hover:text-blue-600'
              type='Chevron_back'
            />
          </button>

          <button
            className='group absolute right-0 top-1/2 z-10 -translate-y-1/2 transform'
            type='button'
            onClick={() => forward()}>
            <Icon
              type='Chevron_forward'
              className='m-2 hidden size-10 rounded-full bg-gray-700 bg-opacity-40 text-gray-400 group-hover/all:inline-block group-hover:bg-opacity-80 group-hover:text-blue-600'
            />
          </button>
        </div>

        <div className='absolute bottom-0 left-1/2 mb-1 flex -translate-x-1/2 flex-row items-center gap-1'>
          {images?.map((image, index) => (
            <div
              className={`size-2 cursor-pointer rounded-full hover:size-4 ${
                img === index ? 'bg-gray-100' : 'bg-gray-400'
              }`}
              key={index}
              onClick={() => jump(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default ImageCarousel
