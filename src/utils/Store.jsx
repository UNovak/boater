import { create } from 'zustand'

// Define the initial state
const initialState = {
  session: {
    id: '',
    authenticated: undefined,
  },
  user: {
    registration_complete: undefined,
    email: '',
    full_name: '',
    avatar_url: '',
    host: false,
  },
  modal: {
    isOpen: false,
  },
}

const useStore = create((set, get) => ({
  ...initialState,

  setSession: (new_id) =>
    set((state) => ({
      session: {
        ...state.session,
        id: new_id,
        authenticated: true,
      },
    })),

  // Function to manage user store state with partial updates
  setUser: (updates) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updates,
      },
    })),

  getHost: () => get().user.host,

  // modal state handlers
  toggleModal: () =>
    set((state) => ({
      modal: {
        isOpen: !state.modal.isOpen,
      },
    })),

  // Sets the store back to initial values
  clearStore: () => {
    set(() => ({ ...initialState }))
  },
}))

export default useStore
