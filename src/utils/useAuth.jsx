import supabase from "./supabase";
import { useNavigate } from "react-router-dom";
import useStore from "./Store";

const useAuth = () => {
  const navigate = useNavigate();
  const user = {
    email: 'test@test.com',
    password: 'password',
  };

  const logIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      console.error(error);
    } else {
      const user = {
        id: data.user.id,
        email: data.user.email,
        token: data.session.access_token,
      }
      console.log("logged in successfully as: ", data.user);
      useStore.getState().setUser(user)
      // TODO:
      // fetch registration status and redirect accordingly
    }
  };

  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      useStore.getState().clearUser();
      navigate("/");
      console.log("logged out");
    }
  };

  const signUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };

  return { logIn, logOut, signUp };
};

export default useAuth;
