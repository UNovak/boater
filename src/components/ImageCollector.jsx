import { useEffect, useState } from 'react'
import Icon from '@icons'

const ImageCollector = ({ images, setImages }) => {
  const [drag, setDrag] = useState(false)
  const [error, setError] = useState(null)

  // disable drop on other parts of the page, prevent default browser behaviour
  useEffect(() => {
    const enterListener = (e) => {
      if (e.target.id !== 'dropzone-file') {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'none'
        e.dataTransfer.dropEffect = 'none'
      }
    }

    const overListener = (e) => {
      if (e.target.id !== 'dropzone-file') {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'none'
        e.dataTransfer.dropEffect = 'none'
      }
    }

    const dropListener = (e) => {
      if (e.target.id !== 'dropzone-file') {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'none'
        e.dataTransfer.dropEffect = 'none'
      }
    }

    window.addEventListener('dragenter', enterListener, false)
    window.addEventListener('dragover', overListener)
    window.addEventListener('drop', dropListener)

    return () => {
      window.removeEventListener('dragenter', enterListener)
      window.removeEventListener('dragover', overListener)
      window.removeEventListener('drop', dropListener)
    }
  }, [])

  // check that file is image handle overflow
  const validateImages = (uploads, images) => {
    return Array.from(uploads)
      .filter((file) => file.type.split('/')[0] === 'image') // is image
      .filter(
        // prevent duplicates
        (image) => !images.some((existing) => existing.name === image.name),
      )
      .slice(0, 5 - images.length) // take first 5 images
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    let new_imgs = validateImages(e.target.files, images)
    const previews = new_imgs.map((new_img) => ({
      file: new_img,
      name: new_img.name,
      size: new_img.size,
      preview: URL.createObjectURL(new_img),
    }))
    if (images.length + previews.length >= 5) {
      setError('file limit reached')
    }
    setImages([...images, ...previews].slice(0, 5))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const new_imgs = validateImages(e.dataTransfer.files, images)
    const previews = new_imgs.map((new_img) => ({
      file: new_img,
      name: new_img.name,
      size: new_img.size,
      preview: URL.createObjectURL(new_img),
    }))
    if (images.length + previews.length >= 5) {
      setError('file limit reached')
    }
    setImages([...images, ...previews].slice(0, 5))
    setDrag(false)
  }

  // set drop state accordingly
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragover' || e.type === 'dragenter') setDrag(true)
    if (e.type === 'dragleave') setDrag(false)
  }

  // remove clicked image
  const handleRemove = (file) => {
    setImages(images.filter((image) => image.name !== file.name))
    if (images.length <= 5) setError(null)
  }

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${drag && 'bg-gray-200 dark:bg-gray-800'}`}>
        <label htmlFor='dropzone-file'>
          <div className='flex flex-col items-center justify-center'>
            <Icon
              type='Upload'
              className='mb-3 h-8 w-8 text-gray-500 dark:text-gray-400'
            />
            {drag ? (
              <span className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                drop your files here
              </span>
            ) : (
              <div>
                <p className='mb-3 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='cursor-pointer font-semibold'>
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  allowed SVG, PNG, JPG
                </p>
              </div>
            )}
          </div>

          <input
            multiple
            id='dropzone-file'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleFileChange}
          />
        </label>
        <span className='absolute bottom-2 right-4 text-[0.6rem] text-gray-500'>
          {5 - images.length === 0 ? (
            <span className='text-red-500'>full</span>
          ) : (
            `free: ${5 - images.length}`
          )}
        </span>
      </div>
      {/* display previews */}
      <div
        className='hover:bg-grey-100 mx-auto mt-4 flex h-fit w-fit flex-wrap items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4
        sm:flex-row dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400'>
        {images.length > 0 ? (
          images.map((image) => (
            <img
              key={image.name}
              onClick={() => handleRemove(image)}
              src={image.preview}
              alt={image.name}
              className='h-28 w-28 cursor-pointer rounded transition-transform duration-300 ease-in-out hover:-translate-y-0 hover:scale-110 hover:border-2 hover:border-red-600'
              style={{ flex: '0 1 auto', minWidth: '0' }}
            />
          ))
        ) : (
          <span className='flex h-28 w-28 items-center text-center text-sm text-gray-500'>
            A space for your images
          </span>
        )}
      </div>
    </div>
  )
}

export default ImageCollector
