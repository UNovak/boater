import supabase from '@utils/supabase'

const useRating = () => {
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
    if (data) return { data: data[0], error: null }
  }

  return { createRating }
}

export default useRating
