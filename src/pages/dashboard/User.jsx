import BookingCard from '@components/BookingCard'
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
  const { getUserBookings, deleteBooking } = useHandleBookings()

  const getButtons = (booking) => {
    const details = {
      label: 'details',
      action: () =>
        handleModal(<Details boat_id={booking.boat} booking_id={booking.id} />),
    }

    // Upcoming bookings: only details buttons
    // if (DateTime.fromISO(booking.start_date) > DateTime.now()) return [details]

    // Previous bookings: Not yet rated - details and rate
    if (!booking.reviewed) {
      return [
        {
          label: 'rate',
          action: () =>
            handleModal(
              <Rating boat_id={booking.boat} booking_id={booking.id} />,
            ),
        },
        details,
      ]
    }

    // Previous bookings: Already rated - details and remove
    return [
      {
        label: 'remove',
        action: () => deleteBooking(booking.id),
      },
      details,
    ]
  }

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

  const { upcoming, prev } = bookings.reduce(
    (acc, booking) => {
      const start = DateTime.fromISO(booking.start_date)

      // Categorize bookings
      if (start > DateTime.now()) {
        acc.upcoming.push(booking)
      } else {
        acc.prev.push(booking)
      }
      return acc
    },
    { upcoming: [], prev: [] }, // Initial value
  )

  const handleModal = (content) => {
    setModal(content)
    toggleModal()
  }

  return loading ? (
    <>Loading ...</>
  ) : (
    <div className='h-lvh w-full py-2'>
      {serverError && (
        <div className='text-md m-6 text-red-400'>{serverError?.message}</div>
      )}
      <main className='flex flex-col gap-4'>
        <div>
          <h2 className='font-medium'>Upcoming bookings</h2>
          <div className='mx-auto grid w-4/5 grid-cols-1 gap-4 pt-4 sm:grid-cols-4 2xl:grid-cols-6'>
            {upcoming.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                buttons={getButtons(booking, false)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className='font-medium'>Previous bookings</h2>
          <div className='mx-auto grid w-4/5 grid-cols-1 gap-4 pt-4 sm:grid-cols-4 2xl:grid-cols-6'>
            {prev.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                buttons={getButtons(booking)}
              />
            ))}
          </div>
        </div>
        <Modal content={modal} className={'container h-fit bg-white'} />
      </main>
    </div>
  )
}

export default User
