import useBoats from '@hooks/useBoats'
import useHandleBookings from '@hooks/useHandleBookings'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Spinner from '@components/Spinner'

const Listing = () => {
  const [boat, setBoat] = useState({})
  const [loading, setLoading] = useState(false)
  const [working, setWorking] = useState(false)
  const [serverError, setServerError] = useState(null)
  const { boat_id } = useParams()
  const { getSingleBoat } = useBoats()
  const { createBooking } = useHandleBookings()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      start: DateTime.now().plus({ days: 1 }).toISODate(),
      end: DateTime.now().plus({ days: 2 }).toISODate(),
    },
  })

  useEffect(() => {
    setLoading(true)
    const fetchBoat = async () => {
      const { data, error } = await getSingleBoat(boat_id)
      if (error) setServerError(error)
      if (data) setBoat(data)
      setLoading(false)
      return
    }
    fetchBoat()
  }, [boat_id])

  const onSubmit = async (form) => {
    setWorking(true)
    // add boat data to form data
    form = {
      ...form,
      host: boat.owner_id,
      boat_id: boat_id,
      boat_price: boat.price,
      thumbnail_url: boat.image_urls[0] || '',
    }
    const { data, error } = await createBooking(form)
    if (error) {
      setServerError(error)
      setWorking(false)
      return
    }

    if (data) {
      console.log('success => ', data)
    }

    setWorking(false)
    return
  }

  const onErrors = (errors) => {
    console.error(errors)
  }

  return loading ? (
    <>Loading...</>
  ) : (
    <div className='min-h-lvh w-full'>
      {serverError && (
        <div className='text-md m-6 text-red-400'>{serverError.message}</div>
      )}
      <main>
        <div>{JSON.stringify(boat)}</div>
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrors)}>
          {/* date selection */}
          <div className='grid grid-cols-1 place-items-center'>
            {/* displaying errors */}
            <div className='p-2 text-sm text-red-700'>
              {errors.start && <div>{errors.start.message}</div>}
              {errors.end && <div>{errors.end.message}</div>}
            </div>
            <div className='flex w-full flex-row items-center justify-center gap-2'>
              <button
                type='button'
                className='flex w-full max-w-16 justify-center rounded-lg border border-gray-200 bg-white py-2 text-xs font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 lg:max-w-20'
                onClick={() => {
                  // resets fields: start => today, end => tomorrow
                  reset()
                }}>
                {working ? <Spinner /> : 'Clear'}
              </button>
              <div className='group flex flex-col'>
                <input
                  disabled={working}
                  min={DateTime.now().plus({ days: 1 }).toFormat('yyyy-MM-dd')}
                  aria-label='start day'
                  type='date'
                  name='start'
                  className='relative w-fit rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  {...register('start', {
                    valueAsDate: false,
                    required: {
                      value: true,
                      message: 'Start date is required',
                    },
                    validate: {
                      isFuture: (selected) =>
                        DateTime.now().plus({ days: 1 }).startOf('day') <=
                          DateTime.fromISO(selected).startOf('day') ||
                        'start date should be tomorrow or later',

                      isBeforeEnd: (selected) =>
                        DateTime.fromISO(selected) <
                          DateTime.fromISO(watch('end')) ||
                        'Start date must be before end date',
                    },
                  })}
                />
                <label className='invisible absolute -my-4 mx-12 text-xs text-gray-500 group-hover:visible'>
                  start date
                </label>
              </div>

              <div className='group flex flex-col'>
                <input
                  min={DateTime.now().plus({ days: 2 }).toFormat('yyyy-MM-dd')}
                  aria-label='end day'
                  type='date'
                  name='end'
                  className='w-fit rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  {...register('end', {
                    valueAsDate: false,
                    required: {
                      value: true,
                      message: 'End date is required',
                    },
                    validate: {
                      isFuture: (selected) =>
                        DateTime.now().plus({ days: 1 }).startOf('day') <=
                          DateTime.fromISO(selected).startOf('day') ||
                        'End date should at latest be a day after tomorrow',

                      isBeforeStart: (selected) =>
                        DateTime.fromISO(selected) >
                          DateTime.fromISO(watch('start')) ||
                        'End date must be before start date',
                    },
                  })}
                />
                <label className='invisible absolute -my-4 mx-12 text-xs text-gray-500 group-hover:visible'>
                  end date
                </label>
              </div>
              <button
                disabled={working}
                type='submit'
                className='flex w-full max-w-16 justify-center rounded-lg border border-transparent bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 lg:max-w-20'>
                {working ? <Spinner /> : 'Book'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Listing
