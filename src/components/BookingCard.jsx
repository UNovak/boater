import { DateTime } from 'luxon'

const calculateDuration = (startDate, endDate) => {
  const start = DateTime.fromISO(startDate)
  const end = DateTime.fromISO(endDate)
  return end.diff(start, 'days').days
}

const Button = ({ label, action }) => (
  <button
    className='flex w-full max-w-16 justify-center rounded-lg border border-transparent bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:max-w-20'
    type='button'
    onClick={action}>
    {label}
  </button>
)

const BookingCard = ({ booking, buttons }) => {
  const duration = calculateDuration(booking.start_date, booking.end_date)
  const totalPrice = booking.price * duration
  const thumbnailUrl =
    booking.thumbnail_url ||
    'https://img.freepik.com/premium-photo/view-small-yacht-boat-sailing-calm-open-sea-montenegro_157912-2154.jpg'

  return (
    <div className='max-h-[420px] min-h-64 w-full min-w-48 max-w-[350px] justify-center rounded-lg border-2 border-gray-100 bg-gray-50 pb-2 hover:shadow-lg hover:shadow-blue-200'>
      <div className='h-4/5 w-full rounded-lg'>
        <img
          alt='booking thumbnail'
          src={thumbnailUrl}
          className='h-full w-full rounded-t-lg object-cover'
        />
      </div>

      <div className='h-1/5 w-full flex-col gap-2 p-2 text-sm'>
        <div>
          {`${duration} ${duration > 1 ? 'days' : 'day'} - ${totalPrice} $`}
        </div>
        <div className='flex justify-center gap-2 p-2'>
          {buttons.map((button) => (
            <Button key={button.label} {...button} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingCard
