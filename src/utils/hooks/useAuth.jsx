import useStore from '@utils/Store'
import supabase from '@utils/supabase'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate()
  const updateSession = useStore((state) => state.setSession)

  const login = async (form) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    // fetch error
    if (error) return { data: null, error }
    if (data) {
      updateSession(data.user.id)
      return { data, error: null }
    }
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
      updateSession(data.user.id)
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
