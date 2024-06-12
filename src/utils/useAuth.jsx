import { useNavigate } from "react-router-dom";
import supabase from "./supabase";
import useStore from "./Store";
import useSupabase from "./useSupabase";

const useAuth = () => {
  const navigate = useNavigate();
  const { updateUser } = useSupabase();

  const login = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // fetch error
    if (error) {
      console.error(error);
      return { data: null, error };
    }

    updateUser(data.session.user.id);

    return { data, error: null };
  };

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      return { data: null, error };
    }
    const user = {
      id: data.user.id,
      email: data.user.email,
      token: data.session.access_token,
    };
    useStore.getState().setUser(user);
    return { data, error: null };
  };

  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      navigate("/");
      console.log("logged out");
    }
  };

  return { login, logout, signup };
};

export default useAuth;
