import supabase from '@utils/supabase'
import useStore from '@utils/Store'

const useUsers = () => {
  // update user values in local store
  const getUser = async (fields = '*') => {
    const id = useStore.getState().session.id
    console.log(id)
    // fetch current user data from supabase
    let { data: profiles, error } = await supabase
      .from('profiles')
      .select(fields)
      .eq('id', id)

    // error when fetching
    if (error) {
      console.error(error)
      return { data: null, error }
    }

    // update zustand store if user data returned
    if (profiles) {
      const { host, email, full_name, avatar_url } = profiles[0]
      useStore.getState().setUser({
        host: host,
        email: email,
        full_name: full_name,
        avatar_url: avatar_url,
      })
    }

    // return fetched data
    return { profiles, error: null }
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
      return { data: null, error }
    }
    return { data, error: null }
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
    getUser,
    updateUser,
    modeSwitch,
  }
}

export default useUsers
