import supabase from "./supabase";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const logIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: "test@test.com",
      password: "password",
    });
    if (error) {
      console.error(error);
    } else {
      console.log("success");
      console.log(data);
    }
  };

  const logOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      navigate("/");
    }
  };

  const signUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: "test@test.com",
      password: "password",
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
