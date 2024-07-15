import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import Icon from '@icons'

export const Modal = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const close = () => {
    document.getElementById('login_modal').close()
    reset()
  }

  const signUp = () => {
    navigate('registration')
    close()
  }

  // runs when any button is clicked
  // validation passes
  const onSubmit = async (data) => {
    let res = await login(data.email, data.password)
    if (res.error) {
      console.error(
        'Login failed:',
        res.error.message || 'An unknown error occurred.',
      )
      return
    } else {
      // if login successfoul close the modal
      close()
    }
  }

  // runs when frontend validation fails
  const onErrors = (errors) => {
    console.log(errors)
  }

  // uncomment for realtime values of fields
  // console.log(watch("email"));
  // console.log(watch("password"));

  return (
    <dialog
      id='login_modal'
      className='modal modal-bottom visible text-clip sm:modal-middle '>
      <div className='modal-box'>
        {/* close modal button */}
        <button
          className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'
          onClick={() => close()}>
          <Icon type='Close' className='h-7 w-7' />
        </button>

        <div className='mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-lg'>
            <h4>Login or sign up</h4>
            <h1 className='mt-2 text-center text-2xl font-bold text-blue-400 hover:text-blue-600 sm:text-3xl'>
              Welcome to Boater
            </h1>

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

                {/* 
                TODO: Improve error message displaying 
                 */}

                <div className='relative'>
                  <input
                    {...register('email', {
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
                    })}
                    id='password'
                    type='password'
                    className='w-4/5 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0'
                    placeholder='Enter password'
                  />
                  <span className='color-red-200 absolute inset-y-0 end-[10%] grid place-content-center px-4'>
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
                type='submit'
                className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>
                Sign in
              </button>

              <p className='text-center text-sm text-gray-500'>
                No account?
                <a
                  className='cursor-pointer pl-1 underline'
                  onClick={() => signUp()}>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <DevTool control={control} />
      <form method='dialog' className='modal-backdrop'>
        <button className='cursor-default'>close</button>
      </form>
    </dialog>
  )
}

export default Modal
