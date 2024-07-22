import useUsers from '@hooks/useUsers'
import { router } from '@utils/Routing'
import useStore from '@utils/Store'
import supabase from '@utils/supabase'
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import './App.css'

const App = () => {
  const { getUser } = useUsers()
  const clearStore = useStore((state) => state.clearStore)
  const setSession = useStore((state) => state.setSession)
  const [loading, setLoading] = useState(true)

  const updateStatus = (id) => {
    setSession(id)
    getUser()
  }

  useEffect(() => {
    const initializeSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        updateStatus(session.user.id)
      }
      setLoading(false)
    }

    initializeSession()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        (session && event === 'INITIAL_SESSION') ||
        event === 'SIGNED_IN' ||
        event === 'TOKEN_REFRESHED' ||
        event === 'USER_UPDATED'
      ) {
        updateStatus(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        clearStore()
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <RouterProvider router={router} />
}

export default App
