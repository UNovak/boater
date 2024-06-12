import supabase from "./supabase";
import useStore from "./Store";

export const useSupabase = () => {
  // fetch user data from supabase
  // stores it in global store
  // returns the currently stored data
  const updateUser = async (id, fields = "*") => {
    // fetch from supabase

    let { data: profiles, error } = await supabase
      .from("profiles")
      .select(fields)
      .eq("id", id);

    // error when fetching
    if (error) {
      console.error(error);
      return { data: null, error };
    }

    if (profiles) {
      // update global store
      const { host_view, ...profile } = profiles[0];
      useStore.getState().setUser({
        host: host_view,
        ...profile,
      });
    }

    // return fetched data
    return { profiles, error: null };
  };

  return { updateUser };
};

export default useSupabase;
