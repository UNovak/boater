import useStore from '@utils/Store'
import supabase from '@utils/supabase'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const navigate = useNavigate()
  const updateSession = useStore((state) => state.setSession)

  const login = async (form) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    // fetch error
    if (error) {
      return { data: null, error }
    }
    if (data) {
      updateSession(data.user.id)
      toast.success(`logged in as ${data.user.email}`)
      return { data, error: null }
    }
  }

  const signup = async (form) => {
    // register new user in supabase.auth
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    // problem with auth
    if (error) {
      toast.error(error.message)
      return { data: null, error }
    }
    if (data) {
      updateSession(data.user.id)
      toast.success(`account created for ${data.user.email}`)
      return { data, error: null }
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Logged out successfully')
    navigate('/')
  }

  return {
    login,
    signup,
    logout,
  }
}

export default useAuth
