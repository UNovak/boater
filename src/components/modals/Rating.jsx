import { useForm } from 'react-hook-form'
import useRating from '@hooks/useRating'
import Icon from '@components/Icon'

const Rating = ({ boat_id, booking_id }) => {
  const { createRating } = useRating()
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      rating: 1,
    },
  })
  const currentRating = watch('rating')

  const onSubmit = async (form) => {
    form = {
      ...form,
      boat_id: boat_id,
      booking: booking_id,
    }

    const { data, error } = await createRating(form)
    if (data) console.log(data)
    if (error) console.log(error)
    console.log('form data: ', form)
  }

  return (
    <div className='flex h-full w-full flex-col items-center gap-4 bg-white'>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row'>
          {[...Array(5)].map((_, index) => (
            <label key={index} className='appearance-none'>
              <input
                className='appearance-none'
                type='radio'
                value={index + 1}
                {...register('rating')}
                checked={currentRating === index + 1}
                onChange={() => setValue('rating', index + 1)}
              />
              <Icon
                type={'Star'}
                className={`size-9 ${currentRating >= index + 1 ? 'text-yellow-500' : 'text-gray-400'} `}
              />
            </label>
          ))}
        </div>
      </form>
      <button
        type='submit'
        className='flex w-full max-w-16 justify-center rounded-lg border border-transparent bg-blue-600 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:max-w-20'>
        Rate
      </button>
    </div>
  )
}

export default Rating
