import supabase from '@utils/supabase'
import useStore from '@utils/Store'

const useBucket = () => {
  const id = useStore((state) => state.session.id)

  // uploads a single file to spacified path
  const uploadImage = async (file, path, bucket) => {
    const filePath = `${id}/${bucket}/${path}/${file.name}`
    const { error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) return { data: null, error }

    const data = supabase.storage.from(bucket).getPublicUrl(filePath)
      .data.publicUrl
    return { data, error: null }
  }

  // path ==> path to folder containing the images
  // to delete meme.png from bucket memes located at: user1/meme_photos/meme.png
  // deleteFiles('memes', 'user1/meme_photos')
  const deleteFiles = async (bucket, path) => {
    const { data, error } = await supabase.storage.from(bucket).list(path)

    if (error) return { data: null, error }
    if (data) {
      const errors = []
      for (const file of data) {
        const { error } = await supabase.storage
          .from(bucket)
          .remove([`${path}/${file.name}`])
        if (error) throw error
      }
      if (errors != []) return { errors, data: null }
    }
    return { error: null, data: [] }
  }

  return { uploadImage, deleteFiles }
}

export default useBucket
