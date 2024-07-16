import { Link } from 'react-router-dom'
import Icon from '@icons'

const ListingCard = ({ boat }) => {
  const getIcon = () => {
    if (boat.type) return boat.type.charAt(0).toUpperCase() + boat.type.slice(1)
    return 'Sailboat'
  }

  return (
    <div className='group flex w-full max-w-sm flex-col gap-3 rounded-lg border border-gray-200 bg-white shadow-lg duration-100 ease-in-out hover:shadow-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-800'>
      <div className='overflow-hidden'>
        <img
          className='h-64 w-full rounded-t-lg object-cover'
          src={
            boat.image_urls != null && boat.image_urls.length > 0
              ? boat.image_urls[0]
              : 'https://images.unsplash.com/photo-1544189360-0c4ef5ccd5f1?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt='card thumbnail - boats best photo'
        />
      </div>
      <div className='w-fit px-5 text-left'>
        <Link
          to={`listing/${boat.id}`}
          className='mb-2 cursor-default text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          <h5>{boat.title.charAt(0).toUpperCase() + boat.title.slice(1)}</h5>
        </Link>
        <div
          className=' flex flex-nowrap justify-start gap-8 py-2
          text-sm font-normal text-gray-700 *:flex-none dark:text-gray-400'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-1'>Boat type</div>
            <div className='flex flex-row items-center '>
              <Icon className='h-5 w-5' type={getIcon()} />
              <span className='text-xs'>{boat.type}</span>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-1'>Space</div>
            <div className='flex flex-row'>
              <Icon className=' w-5' type='Human' />
              <span className=' text-md font-semibold'>{boat.space || 5}</span>
            </div>
          </div>
          <div className='flex flex-col items-center  justify-center'>
            <div className='mb-1 flex flex-row items-center'>
              <div>Location</div>
              <Icon className='h-4 w-4' type='LocationPin' />
            </div>
            <span className='flex h-5 items-center text-xs'>
              {`${boat.location?.city}, ${boat.location?.country}`}
            </span>
          </div>
        </div>
      </div>
      <div className='flex w-full items-center justify-between px-5 pb-3'>
        <Link
          to={`listing/${boat.id}`}
          className='group/button inline-flex shrink-0 items-center justify-between
          rounded-md border border-blue-600 bg-blue-600 px-3 text-center
          text-sm font-medium text-white transition
          hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring
          focus:ring-blue-300 active:text-blue-500 dark:bg-blue-600 dark:focus:ring-blue-300'>
          Details
          <Icon
            type='ChevronForward'
            className='-mb-px -mr-2 w-7 transition-transform duration-200 ease-linear group-hover/button:rotate-90'
          />
        </Link>
        <span className='align-middle text-sm'>{boat.price} $ / Day</span>
      </div>
    </div>
  )
}

export default ListingCard
