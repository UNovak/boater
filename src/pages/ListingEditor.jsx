import { useForm } from "react-hook-form";
import FileUpload from "@components/FileUpload";
import { DevTool } from "@hookform/devtools";

export const ListingEditor = (type) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      location: {},
      attributes: {},
      type: "",
    },
  });

  const onErrors = (errors) => {
    console.log(errors);
  };

  const onSubmit = (form) => {
    console.log(form);
  };

  // images display the title of uploaded images
  // title - text
  // description - user text
  // location - Geodata ?
  // attributes - JSON
  // type - select from sailboat dingy fishing yacht cruiser

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
          <FileUpload />
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

        <div className="h-fit w-full">
          <label className="inline-block cursor-pointer items-center">
            <input
              id="toggle"
              type="checkbox"
              value=""
              className="peer sr-only"
              {...register("toggle")}
            />
            <div className="peer relative h-6 w-11 justify-center rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            <span className=" ms-3 hidden text-sm font-medium text-gray-900 dark:text-gray-300"></span>
          </label>
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
