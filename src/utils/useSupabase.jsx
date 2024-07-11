import supabase from './supabase'
import useStore from './Store'

export const useSupabase = () => {
  const id = useStore((state) => state.session.id)

  // fetch user data from supabase
  // stores it in global store
  // returns the currently stored data
  const updateUser = async (id, fields = '*') => {
    // fetch from supabase
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select(fields)
      .eq('id', id)

    // error when fetching
    if (error) {
      console.error(error)
      return { data: null, error }
    }

    if (profiles) {
      // update global store
      const { host_view, ...profile } = profiles[0]
      useStore.getState().setUser({
        host: host_view,
        ...profile,
      })
    }

    // return fetched data
    return { profiles, error: null }
  }

  // uploads a single file to spacified path
  const uploadFile = async (file, id, path, bucket) => {
    const filePath = `${id}/${bucket}/${path}/${file.name}`
    const { error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      return { data: null, error }
    }
    let data = supabase.storage.from(bucket).getPublicUrl(filePath)
      .data.publicUrl
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
          const result = await uploadFile(image.file, id, boat_id, 'boats')
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

  // insert new boat
  const createBoat = async (form, id, images) => {
    console.log('create boat params: ', form, id, images)
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
    let boat_id = data[0].id

    // if images are to be added runs uploadFile on each
    if (images) {
      const errors = []
      const urls = []

      await Promise.all(
        images.map(async (image) => {
          const result = await uploadFile(image.file, id, boat_id, 'boats')
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

  const getBoats = async () => {
    const { data, error } = await supabase.from('boats').select('*')

    if (error) return { data: null, error }
    return { data, error: null }
  }

  const modeSwitch = async () => {
    // fetch current view from zustand
    const current = useStore.getState().getHost()

    // attempt updating host_view in supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({ host_view: !current })
      .eq('id', id)
      .select()

    // if update fails return the error
    if (error) return { data: null, error }

    // else update local store value
    useStore.getState().setUser({ host: data[0].host_view })
    return { data, error: null }
  }

  return {
    createBoat,
    updateBoat,
    getBoats,
    modeSwitch,
  }
}

export default useSupabase
