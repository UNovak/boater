import Icon from '@components/Icon'
import useBucket from '@hooks/useBucket'
import useStore from '@utils/Store'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

const Avatar = () => {
  const { uploadImage } = useBucket()
  const [preview, setPreview] = useState(null)
  const inputRef = useRef(null)

  const changeHandler = async (e) => {
    e.preventDefault()
    const upload = e.target.files[0]
    if (upload.type.split('/')[0] !== 'image')
      toast.error('Plase upload an image')
    else {
      setPreview(URL.createObjectURL(upload))
      const { data: url } = await uploadImage(upload, '', 'avatars')
      if (url) {
        useStore.getState().setUser({
          avatar_url: url,
        })
      }
    }
  }

  const handleDelete = () => {
    setPreview(null)
    inputRef.current.value = ''
  }

  return (
    <div className='flex flex-col items-center gap-1'>
      <div
        className={`relative size-40 place-items-center items-center justify-center overflow-hidden rounded-3xl bg-gray-100 text-center align-middle ${preview ? 'group hover:shadow-lg hover:shadow-blue-300' : ''}`}>
        <label
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform focus-within:outline focus-within:outline-2 focus-within:outline-blue-500 ${preview ? 'size-40' : ''}`}>
          {preview ? (
            <img
              src={preview}
              alt='avatar'
              className='group size-40 object-cover'
            />
          ) : (
            <Icon
              type='Add'
              className={
                'size-6 rounded-full bg-gray-300 text-gray-700 outline outline-1 outline-gray-300 hover:size-8 hover:text-gray-950 hover:outline-gray-700'
              }
            />
          )}
          <input
            name='avatar_image'
            id='avatar_image'
            hidden
            accept='image/*'
            type='file'
            ref={inputRef}
            onChange={(e) => changeHandler(e)}
          />
        </label>
        <span className='invisible absolute z-20 ms-4 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
          Click to change
        </span>
      </div>
      {preview && (
        <div
          onClick={() => {
            handleDelete()
          }}>
          <Icon
            type={'Trash_closed'}
            className={'size-5 text-gray-700 hover:text-red-700'}
          />
        </div>
      )}
    </div>
  )
}

export default Avatar
