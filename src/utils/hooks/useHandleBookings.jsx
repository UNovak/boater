import supabase from '@utils/supabase'

const useHandleBookings = () => {
  const createBooking = async (form) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          boat: form.boat_id,
          host: form.host,
          start_date: form.start,
          end_date: form.end,
          price: form.boat_price,
          confirmed: false,
          thumbnail_url: form.thumbnail_url,
        },
      ])
      .select()

    // if there is an error creating a new boat entry exit
    if (error) return { data: null, error }
    if (data) return { data: data[0], error: null }
  }

  return { createBooking }
}

export default useHandleBookings