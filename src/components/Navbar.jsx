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
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between text-center ">
          <div className=" block md:flex md:items-center md:gap-12">
            <NavLink
              to={"/"}
              className=" ml-4 flex h-10 w-32 items-center justify-center text-4xl text-black"
            >
              <Icon type="Logo" className="ml-2 w-44" />
            </NavLink>
          </div>

          <div className="hidden md:block">Search</div>

          <div className="block items-center gap-4 md:flex">
            <div className="flex gap-4">
              <NavLink
                className={({ isActive }) =>
                  "m-auto block rounded px-3 py-2  " +
                  (isActive
                    ? " pointer-events-none border-0 bg-transparent text-blue-600"
                    : " p-0 text-gray-900 hover:bg-gray-100 hover:bg-transparent hover:text-blue-600 md:border-0")
                }
                to={"registration"}
              >
                Rent your boat
              </NavLink>
              <div className="block md:flex">
                <Dropdown
                  label={
                    authenticated ? (
                      <>
                        <Icon type="MenuOpen" className="h-8 w-8" />
                        <Icon
                          type="Person"
                          className="hidden h-8 w-8 md:flex"
                        />
                      </>
                    ) : (
                      <>
                        <Icon type="MenuOpen" className="h-8 w-8" />
                        <Icon
                          type="Account"
                          className="hidden h-8 w-8 md:flex"
                        />
                      </>
                    )
                  }
                  links={dropdownLinks}
                />
                <Modal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// TODO:
// - Fix button on small screen
// Adjust rent your boat button
