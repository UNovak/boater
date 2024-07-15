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

  return { uploadImage }
}

export default useBucket
