import Icon from '@components/Icon'
import Spinner from '@components/Spinner'
import useAuth from '@hooks/useAuth'
import useStore from '@utils/Store'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [serverError, setServerError] = useState(null)
  const [show, setShow] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const toggleModal = useStore((state) => state.toggleModal)
  const { login } = useAuth()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const signUp = () => {
    navigate('registration')
  }

  // runs when any button is clicked
  // validation passes
  const onSubmit = async (form) => {
    setSubmitting(true)
    const { data, error } = await login(form)
    if (error) {
      setServerError(error.message)
      setSubmitting(false)
      return
    }
    if (data) {
      setSubmitting(false)
      toggleModal()
    }
  }

  // runs when frontend validation fails
  const onErrors = (errors) => {
    return
  }

  return (
    <div className='h-full w-full'>
      <h4>Login or sign up</h4>
      <h1 className='mt-2 text-center text-2xl font-bold text-blue-400 hover:text-blue-600 sm:text-3xl'>
        Welcome to Boater
      </h1>

      {/* server error if any */}
      {serverError && (
        <div className='text-md mt-6 text-red-400'>{serverError}</div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        noValidate
        className='mb-0 mt-4 space-y-4'>
        <div>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          {errors.email && (
            <p className='mb-2 text-sm text-red-400 opacity-90'>
              {errors.email.message}
            </p>
          )}

          <div className='relative'>
            <input
              {...register('email', {
                minLength: {
                  value: 5,
                  message: 'email is required',
                },
                pattern: {
                  value: /.+@.+\..+/,
                  message: 'Invalid format',
                },
              })}
              className='w-4/5 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0'
              id='email'
              placeholder='Enter email'
              type='email'
            />
            <span className='pointer-events-none absolute inset-y-0 end-[10%] grid place-content-center px-4'>
              @
            </span>
          </div>
        </div>

        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>

          <div className='relative'>
            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password required',
                },
                minLength: {
                  value: 4,
                  message: 'this password is too short',
                },
              })}
              id='password'
              type={show ? 'text' : 'password'}
              className='w-4/5 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0'
              placeholder='Enter password'
            />
            <span
              className='absolute inset-y-0 end-[10%] grid cursor-pointer place-content-center px-4'
              onClick={() => setShow(!show)}>
              <Icon type='Visible' className='w- w-4' />
            </span>
          </div>

          {errors.password && (
            <p className='mt-1 text-sm text-red-400 opacity-90'>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={submitting}
          type='submit'
          className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>
          {!submitting ? 'Sign in' : <Spinner />}
        </button>

        <p className='text-center text-sm text-gray-500'>
          No account?
          <a className='cursor-pointer pl-1 underline' onClick={() => signUp()}>
            Sign up
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login
