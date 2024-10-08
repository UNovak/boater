import useStore from '@utils/Store'
import supabase from '@utils/supabase'
import toast from 'react-hot-toast'

const useUsers = () => {
  const getSelf = async (fields = '*') => {
    const id = useStore.getState().session.id
    // fetch current user data from supabase
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(fields)
      .eq('id', id)
      .single()

    // error when fetching
    if (error) {
      console.error(error)
      toast.error('Failed fetching user')
      return { data: null, error }
    }

    // update zustand store if user data returned
    if (profile) {
      useStore.getState().setUser({
        host: profile.host,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        registration_complete: profile.registration_complete,
      })
    }

    // return fetched data
    return { profile }
  }

  const getUser = async (id) => {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('full_name,email,avatar_url')
      .eq('id', id)

    if (error) toast.error(error.message || 'Unknown error')
    if (profiles) return { data: profiles[0] }
  }

  const updateUser = async (values) => {
    const id = useStore.getState().session.id
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...values })
      .eq('id', id)
      .select()

    if (error) {
      console.error(error)
      toast.error(error.message)
      return
    }
    toast.success('user update success')
    return { data }
  }

  const modeSwitch = async () => {
    const current = useStore.getState().getHost()
    const id = useStore.getState().session.id

    // attempt updating value of host in supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({ host: !current })
      .eq('id', id)
      .select()

    // if update fails return the error
    if (error) return { data: null, error }

    // else update local store value
    useStore.getState().setUser({ host: data[0].host })
    return { data, error: null }
  }

  return {
    getSelf,
    getUser,
    modeSwitch,
    updateUser,
  }
}

export default useUsers
