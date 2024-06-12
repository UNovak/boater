import { mainRouter } from "@utils/Routing";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import supabase from "@utils/supabase";
import useStore from "@utils/Store";
import useSupabase from "@utils/useSupabase";

import "./App.css";

const App = () => {
  const { updateUser } = useSupabase();
  const clearStore = useStore((state) => state.clearStore);
  const setSession = useStore((state) => state.setSession);

  const updateStatus = (id) => {
    setSession(id);
    updateUser(id);
  };

  // mounts supabse listeners
  useEffect(() => {
    // try reading from session storage
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        updateStatus(session.user.id);
      }
    });

    // user authentication status change
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        updateStatus(session.user.id);
      } else if (event === "SIGNED_OUT") {
        clearStore();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
};

export default App;
