import Dropdown from "@components/Dropdown";
import Modal from "@components/Modal";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "@icons";
import useStore from "@utils/Store";
import useAuth from "@utils/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = useStore((state) => state.authenticated);
  const { logout } = useAuth();

  const dropdownLinks = [
    { type: "all", label: "FAQ", path: "/" },
    {
      type: "guest",
      label: "Login",
      icon: "Login",
      action: () => document.getElementById("login_modal").showModal(),
    },
    { type: "guest", label: "Signup", path: "/registration" },
    { type: "auth", label: "Logout", icon: "Logout", action: logout },
  ].filter((link) =>
    authenticated ? link.type !== "guest" : link.type !== "auth",
  );

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <NavLink
              to={"/"}
              className=" ml-4 flex h-10 w-32 items-center justify-center text-4xl text-black"
            >
              <Icon type="Logo" className="ml-2 w-44" />
            </NavLink>
          </div>

          <div className="hidden md:block">Search</div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <NavLink
                className="content-center rounded-md bg-teal-600 px-2 py-1 align-middle text-sm font-medium text-white shadow"
                to={"registration"}
              >
                Rent your boat
              </NavLink>

              <div className="hidden sm:flex">
                <Dropdown
                  label={
                    authenticated ? (
                      <>
                        <Icon type="MenuOpen" className="md:show block w-8" />
                        <Icon type="Person" className="h-8 w-8" />
                      </>
                    ) : (
                      <>
                        <Icon type="MenuOpen" className="md:show block w-8" />
                        <Icon type="Account" className="w-8" />
                      </>
                    )
                  }
                  links={dropdownLinks}
                />
                <Modal />
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <Icon type="MenuOpen" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
