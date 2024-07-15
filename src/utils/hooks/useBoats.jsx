import supabase from '@utils/supabase'
import useStore from '@utils/Store'
import useBucket from '@hooks/useBucket'

const useBoats = () => {
  const { uploadImage } = useBucket()

  // create a new boat row in supabase
  const createBoat = async (form, id, images) => {
    const { data, error } = await supabase
      .from('boats')
      .insert([
        {
          owner_id: id,
          title: form.title,
          description: form.description,
          attributes: form.attributes,
          location: form.location,
          price: form.price,
          type: form.type,
        },
      ])
      .select()

    // if there is an error creating a new boat entry
    if (error) return { data: null, error }
    const boat_id = data[0].id

    // if images are to be added runs uploadFile on each
    if (images) {
      const errors = []
      const urls = []

      await Promise.all(
        images.map(async (image) => {
          const result = await uploadImage(image.file, boat_id, 'boats')
          if (result.error) errors.push(result.error) // error uploading a spacific image
          if (result.data) urls.push(result.data) // image uploded sucessfully => gets publicURL
        }),
      )

      if (errors.length > 0) return { data: null, error: errors } // if error when uploading images

      // if images were uploaded update the images_url and thumbnail
      if (urls) {
        const { data, error } = await updateBoat(boat_id, id, {
          image_urls: urls,
        })

        if (error) return { data: null, error }
        return { data, error: null }
      }
    }
    return { data, error: null }
  }

  // updates boat with new data
  // boat has to be of form:
  // {
  //   column-to-change: new-value,
  //   other -column-to-change: other-new-value,
  // }
  const updateBoat = async (boat_id, id, boat, images) => {
    if (images) {
      // upload images to boat/boat_id/... bucket if they exist
      const urls = []
      const errors = []
      await Promise.all(
        images.map(async (image) => {
          const result = await uploadImage(image.file, id, boat_id, 'boats')
          if (result.error) errors.push(result.error) // error uploading a spacific image
          if (result.data) urls.push(result.data) // image uploded sucessfully => gets publicURL
        }),
      )

      if (errors.length > 0) return { data: null, errors } // if an error accoures during image upload

      // otherwise add urls to boat object
      boat = {
        ...boat,
        image_urls: urls,
      }
    }

    // update database values for boat
    const { data, error } = await supabase
      .from('boats')
      .update({
        ...boat,
      })
      .eq('id', boat_id)
      .eq('owner_id', id)
      .select()

    if (error) return { data: null, error }
    return { data, error: null }
  }

  const getAllBoats = async () => {
    const { data, error } = await supabase.from('boats').select('*')

    if (error) return { data: null, error }
    return { data, error: null }
  }

  return {
    createBoat,
    updateBoat,
    getAllBoats,
  }
}

export default useBoats
