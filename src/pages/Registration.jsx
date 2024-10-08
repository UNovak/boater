import Avatar from '@components/Avatar'
import Spinner from '@components/Spinner'
import { DevTool } from '@hookform/devtools'
import useUsers from '@hooks/useUsers'
import useStore from '@utils/Store'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const Registration = () => {
  const [loading, setLoading] = useState(true) // Loading state for email fetch
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { getSelf, updateUser } = useUsers()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      host: false,
      address: {
        street: '',
        city: '',
        zip: '',
        country: '',
      },
    },
  })

  const isHost = watch('host')

  useEffect(() => {
    const prefill = async () => {
      const { profile } = await getSelf()
      if (profile) {
        const name = profile.full_name.split(' ')
        reset({
          email: profile.email,
          firstName: name[0],
          lastName: name[1],
        })
        setLoading(false)
      }
    }

    prefill()
  }, [])

  const onErrors = (errors) => {
    console.log(errors)
  }

  const onSubmit = async (form) => {
    setSubmitting(true)

    // values accepted by supabase
    const accepted = [
      'full_name',
      'email',
      'address',
      'host',
      'updated_at',
      'registration_complete',
      'avatar_url',
    ]

    form = {
      ...form,
      registration_complete: true,
      full_name: `${form.firstName} ${form.lastName}`,
      avatar_url: useStore.getState().user.avatar_url,
    }

    // remove all keys that dont fit in the db
    Object.keys(form)
      .filter((key) => !accepted.includes(key))
      .map((key) => delete form[key])

    // attempt updating values in db
    const { data } = await updateUser(form)
    if (data) {
      useStore.getState().setUser({ registration_complete: true })
      navigate('/')
    }
    setSubmitting(false)
  }

  return (
    <section className='bg-white'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        {/* on image in wide */}

        <section className='relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full lg:rounded-r-xl xl:col-span-6'>
          <img
            alt='sailboat on calm blue sea'
            src='https://images.unsplash.com/photo-1563187867-2cd158d07999?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            className='absolute inset-0 h-full w-full object-cover opacity-80  lg:rounded-r-xl '
          />

          <div className='hidden lg:relative lg:block lg:p-12'>
            <h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
              Welcome to Boater ⛵️
            </h2>

            <p className='mt-4 leading-relaxed text-white/90'>
              Your platform for finding the perfect boat regardless of your
              location preferences or budget. We have it all.
            </p>
          </div>
        </section>

        {/* above form on small */}

        <main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
          <div className='max-w-xl lg:max-w-3xl'>
            <div className='relative -mt-16 block lg:hidden'>
              <a
                className='inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20'
                href='#'>
                <span className='sr-only'>Home</span>
              </a>

              <h1 className='mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
                Welcome to Boater ⛵️
              </h1>

              <p className='mt-4 leading-relaxed text-gray-500'>
                Your platform for finding the perfect boat regardless of your
                location preferences or budget. We have it all.
              </p>
            </div>

            {/* form content */}
            <form
              onSubmit={handleSubmit(onSubmit, onErrors)}
              noValidate
              className='mt-8 grid grid-cols-6 gap-4'>
              <div className='col-span-6 flex justify-center'>
                <Avatar />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                  First name {loading ? <Spinner /> : null}
                </label>
                <input
                  disabled={loading}
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'First name required',
                    },
                  })}
                  id='firstName'
                  type='text'
                  className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                  placeholder=''
                />
                {errors.firstName && (
                  <p className='mt-1 text-sm text-red-400 opacity-90'>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                  Last name {loading ? <Spinner /> : null}
                </label>

                <input
                  disabled={loading}
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'Last name required',
                    },
                  })}
                  id='lastName'
                  type='text'
                  className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                  placeholder=''
                />
                {errors.lastName && (
                  <p className='mt-1 text-sm text-red-400 opacity-90'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='email'
                  className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                  Email {loading ? <Spinner /> : null}
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /.+@.+\..+/,
                      message: 'Invalid email format',
                    },
                  })}
                  className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                  placeholder=''
                  type='email'
                  disabled
                  autoComplete='email'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-400 opacity-90'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* devider */}
              <div className='col-span-6'>
                <span className='relative flex justify-center'>
                  <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75' />
                  <span className='relative z-10 bg-white py-5' />
                </span>

                <div className='container mx-auto inline-flex shrink-0 flex-wrap content-center justify-center gap-3 align-middle'>
                  <span>start off as a host</span>
                  <label
                    htmlFor='host'
                    className='relative inline-block h-6 w-12 cursor-pointer rounded-full bg-gray-300 transition duration-300 [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-600'>
                    <input
                      type='checkbox'
                      id='host'
                      className='peer sr-only'
                      {...register('host')}
                    />
                    <span className='absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-6' />
                  </label>
                </div>
              </div>

              {isHost && (
                <>
                  <div className='col-span-6 sm:col-span-4 sm:col-start-2 sm:grid-cols-subgrid'>
                    <label
                      htmlFor='street'
                      className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                      Address {loading ? <Spinner /> : null}
                    </label>

                    <input
                      disabled={loading}
                      {...register('address.street', {
                        required: isHost ? 'required' : false,
                      })}
                      id='street'
                      type='text'
                      className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                      placeholder=''
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-4 sm:col-start-2 sm:grid-cols-subgrid'>
                    <label
                      htmlFor='city'
                      className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                      City {loading ? <Spinner /> : null}
                    </label>

                    <input
                      disabled={loading}
                      {...register('address.city', {
                        required: isHost ? 'required' : false,
                      })}
                      id='city'
                      type='text'
                      className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                      placeholder=''
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-4 sm:col-start-2 sm:grid-cols-subgrid'>
                    <label
                      htmlFor='zip'
                      className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                      Zip {loading ? <Spinner /> : null}
                    </label>

                    <input
                      disabled={loading}
                      {...register('address.zip', {
                        required: isHost ? 'required' : false,
                      })}
                      id='zip'
                      type='text'
                      className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                      placeholder=''
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-4 sm:col-start-2 sm:grid-cols-subgrid'>
                    <label
                      htmlFor='country'
                      className='inline-flex flex-row items-center gap-2 text-sm font-medium text-gray-700'>
                      Country {loading ? <Spinner /> : null}
                    </label>

                    <input
                      disabled={loading}
                      {...register('address.country', {
                        required: isHost ? 'required' : false,
                      })}
                      id='country'
                      type='text'
                      className={`w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0 ${loading ? 'animate-pulse' : ''}`}
                      placeholder=''
                    />
                  </div>
                </>
              )}

              <div className='col-span-6'>
                <label htmlFor='marketingAccept' className='flex gap-4'>
                  <input
                    {...register('marketingAccept')}
                    type='checkbox'
                    id='marketingAccept'
                    className='size-5 rounded-md border-gray-200 bg-white shadow-sm'
                  />
                  <span className='text-sm text-gray-700'>
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className='col-span-6'>
                <p className='text-sm text-gray-500'>
                  By creating an account, you agree to our
                  <Link to={'#'} className='text-gray-700 underline'>
                    terms and conditions
                  </Link>
                  and
                  <Link to={'#'} className='ml-1 text-gray-700 underline'>
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <button
                  disabled={submitting}
                  type='submit'
                  className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:cursor-default disabled:hover:bg-blue-600'>
                  {!submitting ? 'Complete registration' : <Spinner />}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <DevTool control={control} />
    </section>
  )
}

export default Registration
