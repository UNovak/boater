import useHandleBookings from '@hooks/useHandleBookings'
import supabase from '@utils/supabase'
import toast from 'react-hot-toast'

const useRating = () => {
  const { updateBooking } = useHandleBookings()

  const createRating = async (form) => {
    const { data, error } = await supabase
      .from('ratings')
      .insert([
        {
          boat_id: form.boat_id,
          booking_id: form.booking,
          rating: form.rating,
        },
      ])
      .select()

    // if there is an error creating a new rating entry exit
    if (error) {
      return { data: null, error }
    }
    if (data) {
      // if rating was success mark booking as rated
      const { error } = await updateBooking(form.booking, {
        reviewed: true,
      })
      if (error) {
        console.error(error)
        return { data: null, error }
      }
      return { data: data[0], error: null }
    }
  }

  const getAverage = async (id) => {
    const { data, error } = await supabase
      .from('ratings')
      .select('rating.avg()')
      .eq('boat_id', id)

    if (error) toast.error(error.message || 'Failed to get average rating')
    return data ? data[0].avg : null
  }

  return { createRating, getAverage }
}

export default useRating
