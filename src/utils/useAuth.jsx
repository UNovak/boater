import supabase from "./supabase";
import { useNavigate } from "react-router-dom";
import useStore from "./Store";

const useAuth = () => {
  const navigate = useNavigate();

  const login = async (email, password) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      return error;
    } else {
      const user = {
        id: data.user.id,
        email: data.user.email,
        token: data.session.access_token,
      };
      console.log("logged in successfully as: ", data.user);
      useStore.getState().setUser(user);

      // TODO:
      // fetch registration status and redirect accordingly
    }
  };

  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      useStore.getState().clearUser();
      navigate("/");
      console.log("logged out");
    }
  };

  const signup = async (email, password) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      // signup failed
      console.error(error);
      return error;
    } else {
      // successfoul registration
      const user = {
        id: data.user.id,
        email: data.user.email,
        token: data.session.access_token,
      };
      console.log("registered successfully as: ", data.user);
      useStore.getState().setUser(user);
      return data;
    }
  };

  return { login, logout, signup };
};

export default useAuth;
