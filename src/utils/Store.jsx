import { create } from "zustand";

// Define the initial state
const initialState = {
  authenticated: false,
  id: "",
  email: "",
  token: "",
  host: false,
};

const useStore = create((set) => ({
  ...initialState,

  // Function to manage user store state with partial updates

  // update values in store
  setUser: (user) =>
    set((state) => ({
      ...state,
      ...user,
      authenticated: true,
    })),

  // sets the store back to initial values
  clearUser: () => {
    set(initialState);
  },
}));

export default useStore;

//  Usage example:
//    import useStore from '@utils/Store'
//
//    get value:
//      const user = useStore((state) => state.user) // all values
//      const email = useUser(state => state.email);
// 
//    use functions:
//      const setUser = useStore.getState().setUser; // !rerender
//      const setUser = useStore((state) => state.setUser()) // rerender
//      () => setUser(user: JSON object) || setUser(user)
