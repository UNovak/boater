import { useNavigate } from 'react-router-dom'
import supabase from '@utils/supabase'
import useStore from '@utils/Store'
import useUsers from '@hooks/useUsers'

const useAuth = () => {
  const navigate = useNavigate()
  const { setUser } = useUsers()

  const login = async (form) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    // fetch error
    if (error) return { data: null, error }
    if (data) {
      console.log(data)
      useStore.getState().setUser()
      return { data, error: null }
    }

    return { data, error: null }
  }

  const signup = async (form) => {
    // register new user in supabase.auth
    let { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    // problem with auth
    if (error) return { data: null, error }
    if (data) {
      const { data, error } = await setUser(
        form.filter((entry) => entry.key != 'password'),
      ) // update user values in supabase
      if (error) return { error, data: null }
      return { data, error: null }
    }
  }

  const logout = async () => {
    let { error } = await supabase.auth.signOut()
    if (error) return error
    navigate('/')
  }

  return {
    login,
    signup,
    logout,
  }
}

export default useAuth
