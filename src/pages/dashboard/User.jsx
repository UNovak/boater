import { useState } from 'react'

const User = () => {
  const [loading, setLoading] = useState(false)
  const reservations = [
    {
      id: 1,
      boat: 19,
      renter: '32c28341-a3f4-4e12-8b1f-a69428d595db',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      pricePerDay: 200,
      finished: true,
      payment_id: 'someID',
    },
    {
      id: 2,
      boat: 19,
      renter: '32c28341-a3f4-4e12-8b1f-a69428d595db',
      startDate: '2024-06-14',
      endDate: '2024-06-15',
      pricePerDay: 200,
      finished: true,
      payment_id: 'someID',
    },
    {
      id: 3,
      boat: 19,
      renter: '32c28341-a3f4-4e12-8b1f-a69428d595db',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      pricePerDay: 200,
      finished: true,
      payment_id: 'someID',
    },
  ]

  return (
    <div className='mx-auto grid w-4/5 grid-cols-1 gap-4 pt-4 sm:grid-cols-4 2xl:grid-cols-6'>
      {reservations.map((reservation) => {
        const start = Date.parse(reservation.startDate)
        const end = Date.parse(reservation.endDate)
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

        return (
          <div
            key={reservation.id}
            className='h-fit min-h-64 w-full min-w-48 justify-center rounded-lg border-2 border-gray-100 bg-gray-50 hover:shadow-lg hover:shadow-blue-200 sm:col-span-2'>
            <div className='h-4/5 w-full rounded-lg '>
              <img
                src={
                  'https://img.freepik.com/premium-photo/view-small-yacht-boat-sailing-calm-open-sea-montenegro_157912-2154.jpg'
                }
                className='h-full min-h-60 w-full rounded-t-lg object-cover'
              />
            </div>

            <div className='h-1/5 w-full flex-col gap-2 text-sm'>
              <div>{`duration: ${duration}${duration > 1 ? ' days' : ' day'}`}</div>
              <div>total: {reservation.pricePerDay * duration} $</div>
              <div className='flex justify-center gap-2 p-2'>
                <button className='min-w-16 rounded-lg bg-blue-500 py-1 text-white md:min-w-20 md:py-2'>
                  details
                </button>
                <button className='min-w-16 rounded-lg bg-blue-500 py-1 text-white md:min-w-20 md:py-2'>
                  rate
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default User
