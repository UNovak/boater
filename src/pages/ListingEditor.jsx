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
      title: "",
      type: "",
      location: {
        city: "",
        zip: "",
        country: "",
      },
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
            {errors.title?.type === "required" && (
              <span role="alert" className="mt-1 text-xs text-red-500">
                *
              </span>
            )}
          </label>

          <input
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300  bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200  focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            {...register("title", { required: true })}
            aria-invalid={errors.title ? "true" : "false"}
          />
        </div>

        <div>
          <label
            htmlFor="fileUpload"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          ></label>
          <ImageCollector images={images} setImages={setImages} />
        </div>

        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 dark:bg-gray-700" />

        <div className="flex w-full flex-col gap-1 sm:flex-row sm:gap-4">
          <div>
            <label
              htmlFor="type"
              className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-white"
            >
              Select the type of your boat
            </label>
            <select
              id="type"
              {...register("type", {
                required: {},
              })}
              className="mb-2 inline w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:mb-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            >
              <option>Sailboat</option>
              <option>Rubber dinghie</option>
              <option>Jetski</option>
              <option>Yacht</option>
              <option>Catamaran</option>
              <option>Canoe</option>
              <option>Other</option>
            </select>
          </div>
          <div className="">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
            >
              Where is the boat located
            </label>
            <div className="grid w-full grid-cols-8 gap-1">
              <input
                type="text"
                id="city"
                placeholder="Koper"
                className="col-span-4 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500  focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("location.city", {
                  required: {},
                })}
              />
              <input
                type="text"
                id="zip"
                placeholder="6000"
                className="col-span-2 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500  focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("location.zip", {
                  required: {},
                })}
              />
              <input
                type="text"
                id="country"
                placeholder="Slovenia"
                className="col-span-2 block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 shadow-md focus:border-blue-500 focus:shadow-blue-200 focus:outline-none focus:ring-0 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("location.country", {
                  required: {},
                })}
              />
            </div>
          </div>
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

        <hr className="mx-auto my-2 h-1 w-48 rounded border-0 bg-gray-100 md:my-10 dark:bg-gray-700" />

        <input
          type="submit"
          value="Post listing"
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
// - Add more fields: attibutes picker, price per day, space, speed, power
