import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ImageCollector from "@components/ImageCollector";
import useStore from "@utils/Store";
import useSupabase from "@utils/useSupabase";

export const ListingEditor = (type) => {
  const id = useStore((state) => state.session.id);
  const [images, setImages] = useState([]);

  const { createBoat } = useSupabase();
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      attributes: {},
      description: "",
      location: {},
      title: "",
      type: "",
    },
  });

  const onErrors = (errors) => {
    console.log(errors);
  };

  const onSubmit = async (form) => {
    console.log("form values: ", form);
    let res = await createBoat(form, id, images);
    if (res.error) console.error(res.errors);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onErrors)}
        noValidate
        className="mx-auto my-10 max-w-2xl px-5 *:mb-5"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
          >
            Boat name
          </label>
          <input
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300  bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200  focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("title", { required: true })}
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          {errors.firstName?.type === "required" && (
            <p role="alert">First name is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="fileUpload"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Show off
          </label>
          <ImageCollector images={images} setImages={setImages} />
        </div>
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Describe your boat
          </label>
          <textarea
            id="description"
            rows="4"
            className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Whats special about it?"
            {...register("description", {
              required: {},
            })}
          />
        </div>

        <input
          type="submit"
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        />
      </form>
      <DevTool control={control} />
    </>
  );
};

export default ListingEditor;

// TODO
// - Use real form data
// - Redirect after confirmation
// - Add more fields
