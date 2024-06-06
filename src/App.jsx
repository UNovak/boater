import { mainRouter } from "@utils/Routing";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import supabase from "@utils/supabase";
import useStore from "@utils/Store";

import "./App.css";

const App = () => {
  const setSession = useStore((state) => state.setSession);
  const session_data = useStore((state) => state.session);
  const user_data = useStore((state) => state.user);
  const clear = useStore((state) => state.clearStore);

  useEffect(() => {
    let shouldClear = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session.user.id);
        shouldClear = false;
      } else {
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session.user.id);
        shouldClear = false;
      }
    });

    if (shouldClear) clear();
  }, []);

  useEffect(() => {
    console.log("session: ", session_data);
    console.log("user: ", user_data);
  }, [session_data, user_data]);

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
};

export default App;
