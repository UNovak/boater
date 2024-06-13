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

  // uploads a single file to spacified path
  const uploadFile = async (file, id, path, bucket) => {
    const filePath = `${id}/${bucket}/${path}/${file.name}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      return { data: null, error };
    }
    let data = supabase.storage.from(bucket).getPublicUrl(filePath)
      .data.publicUrl;
    return { data, error: null };
  };

  // insert new boat
  const createBoat = async (form, id, images) => {
    const { data, error } = await supabase
      .from("boats")
      .insert([
        {
          owner_id: id,
          title: form.title,
          description: form.description,
          attributes: { attribute1: "some attribute" },
        },
      ])
      .select();

    // if there is an error creating a new boat entry
    if (error) {
      console.error(error);
      return { data: null, error };
    }

    // upload images to boat/boatid bucket
    const errors = [];
    const urls = [];
    await Promise.all(
      images.map(async (image) => {
        const result = await uploadFile(image.file, id, data[0].id, "boats");
        if (result.error) errors.push(result.error); // error uploading a spacific image
        if (result.data) urls.push(result.data); // image uploded sucessfully => gets publicURL
      }),
    );

    // if any image fails to upload
    if (errors.length > 0) return { data: null, error: errors };

    if (urls) {
      const { data: full_data, error: update_error } = await supabase
        .from("boats")
        .update({
          image_urls: urls,
          thumbnail_url: urls[0],
        })
        .eq("id", data[0].id)
        .eq("owner_id", id)
        .select();

      if (update_error) return { data: null, error: update_error };
    }

    return { data, error: null };
  };

  return { updateUser, uploadFile, createBoat };
};

export default useSupabase;
