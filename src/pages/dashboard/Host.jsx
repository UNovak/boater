import Spinner from '@components/Spinner'
import useBoats from '@hooks/useBoats'
import placeholder from '@icon/sailboat.svg'
import useStore from '@utils/Store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Host = () => {
  const [boats, setBoats] = useState([])
  const [loading, setLoading] = useState(false)
  const [working, setWorking] = useState(false)
  const navigate = useNavigate()
  const user = useStore((state) => state.user)
  const { getUserBoats, deleteBoat } = useBoats()

  useEffect(() => {
    setLoading(true)
    const fetchBoats = async () => {
      const { data } = await getUserBoats()
      if (data) {
        setBoats(data)
        setLoading(false)
      }
    }
    fetchBoats()
    console.log('length:', boats.length)
  }, [])

  const handleRemove = async (id) => {
    setWorking(true)
    const { data, error } = await deleteBoat(id)
    if (error) {
      setLoading(false)
      setWorking(false)
      return
    }
    if (data) {
      // remove boat with matching id from boats array
      setBoats((prevBoats) => prevBoats.filter((boat) => boat.id !== id))
      setWorking(false)
    }
  }

  return !loading && user ? (
    <div className='h-full w-full'>
      <div className='mx-auto grid max-w-screen-xl grid-cols-1 content-center gap-2 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        {/* Card for adding a new boat */}
        <div className='group relative flex w-full max-w-sm shrink-0 flex-col justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-lg duration-100 ease-in-out hover:shadow-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-800'>
          <div className='absolute -inset-1 z-10 hidden rounded-xl backdrop-blur-lg group-hover:block' />
          <img
            alt='boat thumbnail'
            src={placeholder}
            className='max-h-64 w-full rounded-t-xl object-fill'
          />
          <h1 className='pb-2 text-center text-2xl'>Add a boat</h1>

          <div className='invisible absolute z-20 flex w-full justify-center gap-1 group-hover:visible'>
            <button
              type='button'
              className='flex min-w-20 items-center justify-center rounded-md bg-green-600 p-2 text-gray-800 hover:text-gray-700 dark:bg-green-800 dark:text-gray-300 dark:hover:text-gray-500'
              onClick={() => navigate('/create')}>
              {working ? <Spinner /> : 'Add'}
            </button>
          </div>
        </div>

        {/* users boats cards  */}
        {boats.length > 0 &&
          boats.map((boat) => {
            return (
              <div
                className='group relative flex w-full max-w-sm shrink-0 flex-col justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-lg duration-100 ease-in-out hover:shadow-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-800'
                key={boat.id}>
                <div className='absolute -inset-1 z-10 hidden rounded-xl backdrop-blur-lg group-hover:block' />
                <img
                  alt='boat thumbnail'
                  src={
                    boat.image_urls
                      ? boat.image_urls[0]
                      : 'https://www.tessllc.us/wp-content/uploads/2020/07/yacht-post-825x510.jpg'
                  }
                  className='max-h-64 w-full rounded-t-xl object-cover'
                />
                <h1 className='pb-2 text-center text-2xl'>{boat.title}</h1>
                <div className='invisible absolute z-20 flex w-full justify-center gap-1 group-hover:visible'>
                  <button
                    type='button'
                    className='rounded-md bg-blue-600 px-5 py-2 text-gray-800 hover:text-gray-700 dark:bg-blue-800 dark:text-gray-300 dark:hover:text-gray-500'
                    onClick={() => navigate('/edit')}>
                    Edit
                  </button>
                  <button
                    type='button'
                    className='flex min-w-20 items-center justify-center rounded-md bg-red-600 p-2 text-gray-800 hover:text-gray-700 dark:bg-red-800 dark:text-gray-300 dark:hover:text-gray-500'
                    onClick={() => handleRemove(boat.id)}>
                    {working ? <Spinner /> : 'Remove'}
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  ) : (
    <div>Loading user ...</div>
  )
}

export default Host
