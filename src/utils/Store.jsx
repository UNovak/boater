import { create } from "zustand";

// Define the initial state
const initialState = {
  session: {
    id: "",
    authenticated: false,
  },
  user: {
    id: "",
    email: "",
    full_name: "",
    avatar_url: "",
    host: false,
    registered: false,
  },
};

const useStore = create((set, get) => ({
  ...initialState,

  setSession: (sessionId) =>
    set((state) => ({
      session: {
        ...state.session,
        id: sessionId,
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

  // Sets the store back to initial values
  clearStore: () => {
    set(() => ({ ...initialState }));
  },
}));

export default useStore;

//  Usage example:
//    import useStore from '@utils/Store'
//
//    get value:
//      const user = useStore((state) => state.user) // all values
//      const email = useUser(state => state.email);
//
//    use functions:
//      const setUser = useStore.getState().setUser; // !rerender
//      const setUser = useStore((state) => state.setUser()) // rerender
//      () => setUser(user: JSON object) || setUser(user)
