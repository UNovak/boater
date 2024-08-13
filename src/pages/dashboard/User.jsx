import Modal from '@components/Modal'
import useHandleBookings from '@hooks/useHandleBookings'
import Details from '@modal/Details'
import Rating from '@modal/Rating'
import useStore from '@utils/Store'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

const User = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(null)
  const [serverError, setServerError] = useState(null)
  const toggleModal = useStore((state) => state.toggleModal)
  const { getUserBookings } = useHandleBookings()

  useEffect(() => {
    setLoading(true)
    const fetchBookings = async () => {
      const { data, error } = await getUserBookings()
      if (error) {
        setServerError(error.message)
        setLoading(false)
        return
      }
      if (data) {
        setBookings(data)
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const handleModal = (content) => {
    setModal(content)
    toggleModal()
  }

  return loading ? (
    <>Loading ...</>
  ) : (
    <div className='h-lvh w-full py-2'>
      {serverError && (
        <div className='text-md m-6 text-red-400'>{serverError.message}</div>
      )}
      <main>
        <h2 className='font-medium'>Upcoming bookings</h2>
        <div className='mx-auto grid w-4/5 grid-cols-1 gap-4 pt-4 sm:grid-cols-4 2xl:grid-cols-6'>
          {bookings.map((booking) => {
            const duration = DateTime.fromMillis(
              DateTime.fromISO(booking.end_date) -
                DateTime.fromISO(booking.start_date),
            ).toFormat('d')

            return (
              <div
                key={booking.id}
                className='h-fit min-h-64 w-full min-w-48 justify-center rounded-lg border-2 border-gray-100 bg-gray-50 hover:shadow-lg hover:shadow-blue-200 sm:col-span-2'>
                <div className='h-4/5 w-full rounded-lg'>
                  <img
                    alt='booking thumbnail'
                    src={
                      booking.thumbnail_url ||
                      'https://img.freepik.com/premium-photo/view-small-yacht-boat-sailing-calm-open-sea-montenegro_157912-2154.jpg'
                    }
                    className='h-full min-h-60 w-full rounded-t-lg object-cover'
                  />
                </div>

                <div className='h-1/5 w-full flex-col gap-2 p-2 text-sm'>
                  <div>
                    {`${duration}${duration > 1 ? ' days' : ' day'} - ${booking.price * duration} $`}
                  </div>

                  <div className='flex justify-center gap-2 p-2'>
                    <button
                      onClick={() =>
                        handleModal(
                          <Details
                            boat_id={booking.boat}
                            booking_id={booking.id}
                          />,
                        )
                      }
                      type='button'
                      className='flex w-full max-w-16 justify-center rounded-lg border border-transparent bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:max-w-20'>
                      details
                    </button>
                    <button
                      onClick={() =>
                        handleModal(
                          <Rating
                            boat_id={booking.boat}
                            booking_id={booking.id}
                          />,
                        )
                      }
                      type='button'
                      className='flex w-full max-w-16 justify-center rounded-lg border border-transparent bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:max-w-20'>
                      rate
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Modal content={modal} className={'container h-fit bg-white'} />
      </main>
    </div>
  )
}

export default User
