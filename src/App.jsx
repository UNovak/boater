import { mainRouter } from '@utils/Routing'
import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '@utils/supabase'
import useStore from '@utils/Store'
import useSupabase from '@utils/useSupabase'

import './App.css'

const App = () => {
  const { updateUser } = useSupabase()
  const clearStore = useStore((state) => state.clearStore)
  const setSession = useStore((state) => state.setSession)
  const [loading, setLoading] = useState(true)

  const updateStatus = (id) => {
    setSession(id)
    updateUser(id)
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

  return <RouterProvider router={mainRouter} />
}

export default App
