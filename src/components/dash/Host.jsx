import useBoats from '@hooks/useBoats'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '@utils/Store'
import Icon from '@components/Icon'

const Host = () => {
  const { getUserBoats } = useBoats()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [boats, setBoats] = useState([])
  const user = useStore((state) => state.user)

  useEffect(() => {
    setLoading(true)
    const fetchBoats = async () => {
      const { data, error } = await getUserBoats()
      if (error) {
        setServerError(error.message)
        setLoading(false)
        return
      }
      if (data) {
        setBoats(data)
      }
      setLoading(false)
    }
    fetchBoats()
  }, [])

  return !loading && user ? (
    <div className='h-full w-full'>
      <h1>Welcome to the dashboard</h1>
      <div className='mx-auto grid max-w-screen-xl grid-cols-1 content-center gap-2 px-4 py-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        {boats.length >= 1 &&
          boats.map((boat) => {
            return (
              <div
                className='group relative flex w-full max-w-sm shrink-0 flex-col justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-lg duration-100 ease-in-out hover:shadow-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-800'
                key={boat.id}>
                <div className='absolute -inset-1 z-10 hidden rounded-xl backdrop-blur-lg group-hover:block'></div>
                <img
                  src={boat.image_urls[0]}
                  className='max-h-64 w-full rounded-t-xl object-cover'
                />
                <h1 className='pb-2 text-center text-2xl'>{boat.title}</h1>
                <div className='invisible absolute z-20 flex w-full justify-center gap-1 group-hover:visible'>
                  <button
                    className='rounded-md bg-blue-600 px-5 py-2 text-gray-800 hover:text-gray-700 dark:bg-blue-800 dark:text-gray-300 dark:hover:text-gray-500'
                    onClick={() => navigate('/edit')}>
                    Edit
                  </button>
                  <button
                    className='rounded-md bg-red-600 p-2 text-gray-800 hover:text-gray-700 dark:bg-red-800 dark:text-gray-300 dark:hover:text-gray-500'
                    onClick={() => console.log('delete boat', boat.id)}>
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
      </div>

      {/* fixed button with tooltip */}
      <button
        className='group fixed bottom-2 right-2'
        onClick={() => navigate('/create')}>
        <Icon
          type='Add'
          className='size-8 rounded-full text-green-600 outline outline-green-600 hover:bg-gray-100 2xl:size-10  dark:text-green-800 dark:outline-green-800 dark:hover:bg-gray-700'
        />
        <div className='invisible absolute -left-1 -right-1 -top-14 rounded bg-gray-900 py-2 text-xs font-medium group-hover:visible 2xl:-top-16 2xl:text-sm'>
          New boat
        </div>
      </button>
    </div>
  ) : (
    <div>Loading user ...</div>
  )
}

export default Host
