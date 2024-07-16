import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import ImageCollector from '@components/ImageCollector'
import AttributePicker from '@components/AttributePicker'
import useStore from '@utils/Store'
import useBoats from '@hooks/useBoats'

export const ListingEditor = (type) => {
  const { createBoat } = useBoats()
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      attributes: [],
      description: '',
      title: '',
      type: 'Sailboat',
      price: 500,
      location: {
        city: '',
        zip: '',
        country: '',
      },
    },
  })
  const id = useStore((state) => state.session.id)
  const [images, setImages] = useState([])
  const descriptionCount = watch('description').length

  const onErrors = (errors) => {
    console.log(errors)
  }

  const onSubmit = async (form) => {
    const res = await createBoat(form, id, images)
    if (res.error) console.error(res.errors)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        noValidate
        className='mx-auto my-10 max-w-2xl px-5 *:mb-5'>
        <div>
          <label
            htmlFor='title'
            className='mb-2 block text-sm font-medium text-gray-700 dark:text-white'>
            Boat name
            {errors.title?.type === 'required' && (
              <span role='alert' className='mt-1 text-xs text-red-500'>
                *
              </span>
            )}
          </label>

          <input
            type='text'
            id='title'
            className='block w-full rounded-lg border border-gray-300  bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200  focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            {...register('title', {
              required: true,
              minLength: {
                value: 3,
                message: 'Title should be at least 3 characters long',
              },
            })}
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && (
            <span className='mt-1 text-xs text-red-500'>
              {errors.title?.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor='fileUpload'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'></label>
          <ImageCollector images={images} setImages={setImages} />
        </div>

        <hr className='mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 dark:bg-gray-700' />

        <div className='flex w-full flex-col gap-1 sm:flex-row sm:gap-4'>
          <div>
            <label
              htmlFor='type'
              className='mb-2 inline-block text-sm font-medium text-gray-700 dark:text-white'>
              Boat type
            </label>
            <select
              id='type'
              {...register('type', {
                required: true,
              })}
              className='w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 sm:mb-0 dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400  dark:focus:border-blue-500 dark:focus:ring-blue-500'>
              <option>Sailboat</option>
              <option>Rubber dinghie</option>
              <option>Jetski</option>
              <option>Yacht</option>
              <option>Catamaran</option>
              <option>Canoe</option>
              <option>Other</option>
            </select>
          </div>
          <div className=''>
            <label
              htmlFor='location'
              className='mb-2 block text-sm font-medium text-gray-700 dark:text-white'>
              Where is the boat located
            </label>
            <div className='grid w-full grid-cols-8 gap-1'>
              <input
                type='text'
                id='city'
                placeholder='Koper'
                className='col-span-4 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500  focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                {...register('location.city', {
                  required: true,
                })}
              />
              <input
                type='text'
                id='zip'
                placeholder='6000'
                className='col-span-2 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500  focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                {...register('location.zip', {
                  required: true,
                })}
              />
              <input
                type='text'
                id='country'
                placeholder='Slovenia'
                className='col-span-2 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                {...register('location.country', {
                  required: true,
                })}
              />
            </div>
            {errors.location && (
              <span className='mt-1 text-xs text-red-500'>
                All filds are required
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor='description'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
            Describe your boat
          </label>
          <textarea
            id='description'
            rows='4'
            className='block  w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Whats special about it?'
            {...register('description', {
              maxLength: {
                value: 299,
                message: 'too long',
              },
            })}
          />
          {errors.description ? (
            <span className='mt-1 text-[0.6rem] text-red-500'>
              {errors.description.message}
            </span>
          ) : (
            <span className='mt-1 text-[0.6rem] text-gray-500'>
              {descriptionCount >= 300
                ? 'Limit reached'
                : 300 - descriptionCount}
            </span>
          )}
        </div>

        <div className='container mx-auto h-full w-full'>
          <label
            htmlFor='base price'
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
            Price:
            <span className='text-xs text-slate-500 dark:text-slate-400'>
              {' ' + watch('price') + ' $'}
            </span>
          </label>

          <div className='flex w-full items-center justify-center gap-4 text-slate-700 dark:text-slate-300'>
            <span className='text-xs text-gray-500'>0</span>
            <input
              type='range'
              id='price'
              className='h-2 w-1/2 appearance-none rounded-full bg-slate-100 focus:outline-blue-700 dark:bg-slate-800 dark:focus:outline-blue-600 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-blue-700 active:[&::-moz-range-thumb]:scale-110 [&::-moz-range-thumb]:dark:bg-blue-600 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-blue-700 active:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:dark:bg-blue-600'
              defaultValue='500'
              max='1000'
              min='0'
              step='10'
              {...register('price')}
            />
            <span className='text-xs text-gray-500'>1000</span>
          </div>
        </div>

        <AttributePicker control={control} name='attributes' />

        <hr className='mx-auto my-2 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 dark:bg-gray-700' />

        <input
          type='submit'
          value='Post listing'
          className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'
        />
      </form>
      <DevTool control={control} />
    </>
  )
}

export default ListingEditor
