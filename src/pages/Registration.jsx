import Icon from "@icons";
import useAuth from "@utils/useAuth";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const Registration = () => {
  const { sign } = useAuth;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const onErrors = (errors) => {
    console.log(errors);
  };

  // console.log(watch("email"));
  // console.log(watch("password"));
  // console.log(watch("firstName"));
  // console.log(watch("lastName"));

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* on image in wide */}

        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full lg:rounded-r-xl xl:col-span-6">
          <img
            alt="sailboat on calm blue sea"
            src="https://images.unsplash.com/photo-1563187867-2cd158d07999?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80  lg:rounded-r-xl "
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Boater ⛵️
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Your platform for finding the perfect boat regardless of your
              location preferences or budget. We have it all.
            </p>
          </div>
        </section>

        {/* above form on small */}

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Boater ⛵️
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Your platform for finding the perfect boat regardless of your
                location preferences or budget. We have it all.
              </p>
            </div>

            {/* form content */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "first name required",
                    },
                  })}
                  id="firstName"
                  type="text"
                  className="w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0"
                  placeholder="John"
                />
                {/* {errors.[replace] && (
                    <p className="mt-1 text-sm text-red-400 opacity-90">
                      {errors.[replace].message}
                    </p>
                  )} */}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "last name required",
                    },
                  })}
                  id="firstName"
                  type="text"
                  className="w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0"
                  placeholder="Doe"
                />
                {/* {errors.[replace] && (
                    <p className="mt-1 text-sm text-red-400 opacity-90">
                      {errors.[replace].message}
                    </p>
                  )} */}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    pattern: {
                      value: /.+@.+\..+/,
                      message: "Invalid format",
                    },
                  })}
                  className="w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0"
                  id="email"
                  placeholder="john.doe@example.com"
                  type="email"
                  autoComplete="email"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  id="password"
                  type="password"
                  className="w-full rounded-lg border-gray-300 p-2 text-sm shadow-md focus:shadow-blue-200 focus:outline-none focus:ring-0"
                  placeholder=""
                  autoComplete="new-password webauthn"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating an account, you agree to our
                  <Link to={"#"} className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </Link>
                  and
                  <Link to={"#"} className="ml-1 text-gray-700 underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="#" className="ml-1 text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
      <DevTool control={control} />
    </section>
  );
};

export default Registration;
