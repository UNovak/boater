import Icon from '@components/Icon'
import ImageCarousel from '@components/ImageCarousel'
import Spinner from '@components/Spinner'
import useBoats from '@hooks/useBoats'
import useHandleBookings from '@hooks/useHandleBookings'
import useUsers from '@hooks/useUsers'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import useStore from '@utils/Store'

const Listing = () => {
  const authenticated = useStore((state) => state.session.authenticated)
  const [boat, setBoat] = useState({})
  const [loading, setLoading] = useState(false)
  const [owner, setOwner] = useState({})
  const [working, setWorking] = useState(false)
  const { boat_id } = useParams()
  const { createBooking } = useHandleBookings()
  const { getSingleBoat } = useBoats()
  const { getUser } = useUsers()

  const {
    formState: { errors },
    getValues,
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
      const { data } = await getSingleBoat(boat_id)
      if (data) setBoat(data)
      setLoading(false)
    }
    fetchBoat()
  }, [])

  useEffect(() => {
    if (boat.owner_id) {
      const fetchOwner = async () => {
        const { data } = await getUser(boat.owner_id)
        if (data) setOwner(data)
      }
      fetchOwner()
    }
  }, [boat.owner_id])

  const onSubmit = async (form) => {
    // require authentication to book
    if (!authenticated) {
      toast.error('please login first')
      return
    }

    setWorking(true)
    // add boat data to form data
    form = {
      ...form,
      host: boat.owner_id,
      boat_id: boat_id,
      boat_price: boat.price,
      thumbnail_url: boat.image_urls[0] || '',
    }
    const { data } = await createBooking(form)
    if (data) toast.success('booked successfully')
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
      <main className='mt-4 flex flex-col gap-4'>
        <div className='text-2xl font-semibold'>{boat.title}</div>
        {/* images */}
        {boat.image_urls && (
          <div className='mx-auto mb-4 h-96 w-4/5 max-w-2xl'>
            <ImageCarousel images={boat.image_urls} />
            <div className='flex flex-row items-center justify-between'>
              <Icon type={boat.type} className='size-4' />
              <div className='text-xs'>
                owned by:{' '}
                <Link
                  className='text-sm text-gray-400'
                  to={`../profile/${owner.email}`}>
                  @{owner?.full_name || <Spinner />}
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* attributes */}
        <div className='mx-auto'>
          <label className='block text-xs text-gray-600 dark:text-gray-400'>
            Attributes
          </label>
          <div className=' flex w-fit min-w-80 max-w-sm flex-row justify-center gap-2 rounded-lg border border-solid border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md sm:max-w-none sm:grid-cols-4 xl:grid-cols-8 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'>
            {boat.attributes?.map((attribute) => (
              <div key={attribute.label} className='col-span-1 xl:col-span-2'>
                <label
                  htmlFor={attribute.label}
                  className='flex h-full w-full min-w-24 items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-2 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 '>
                  <div className='flex w-full flex-col items-center justify-center'>
                    <span className='mb-1 w-full text-xs'>
                      {attribute.label}
                    </span>
                    <Icon type={attribute.icon} className='size-6' />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* description */}
        <div className='mx-auto w-4/5 max-w-screen-sm px-4'>
          <label
            htmlFor='about'
            className='mx-1 block text-xs text-gray-600 dark:text-gray-400'>
            About
          </label>
          <textarea
            id='about'
            className='w-full resize-none appearance-none rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-sm text-gray-900 shadow-md dark:bg-gray-700 dark:text-gray-50'
            value={boat.description}
            disabled
          />
        </div>
        {/* date selection */}
        <form noValidate onSubmit={handleSubmit(onSubmit, onErrors)}>
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
                          DateTime.fromISO(getValues('end')) ||
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
                          DateTime.fromISO(getValues('start')) ||
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

            {/* calculated pricing */}
            <div className='mt-1 text-sm'>
              {errors.start || errors.end
                ? '---'
                : ` total: ${
                    boat.price *
                    DateTime.fromISO(watch('end'))
                      .diff(DateTime.fromISO(watch('start')), 'days')
                      .as('days')
                  }`}
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Listing
