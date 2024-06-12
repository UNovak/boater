import { NavLink } from "react-router-dom";
import Dropdown from "@components/Dropdown";
import Icon from "@icons";
import Modal from "@components/Modal";
import useAuth from "@utils/useAuth";
import useStore from "@utils/Store";

const Navbar = () => {
  const authenticated = useStore((state) => state.session.authenticated);
  const hosting = useStore((state) => state.user.host);
  const user = useStore((state) => state.user.id);
  const { logout } = useAuth();

  // Dropdown links

  // type defines for who the item is rendered
  // host - authenticated && hosting >> all, host
  // user - authenticated && !hosting >> all, user
  // guest - not authenticated >> all, guest
  // all - eveyone can see >> always

  // const data = [...]
  // const filters = [f1, f2, f3, ...]
  // const filteredData = filters.reduce((d, f) => d.filter(f) , data)

  // label is what is shown on the item
  // icon determines if and what icon to render

  // action - renders a button
  // path - renders <NavLink/>

  // Your dropdownLinks array remains unchanged
  // Your dropdownLinks array remains unchanged

  const filters = [
    (link) => link.type === "all",
    (link) => link.type === "auth" && authenticated,
    (link) => link.type === "guest" && !authenticated,
    (link) => link.type === "host" && authenticated && hosting,
    (link) => link.type === "user" && authenticated && !hosting,
  ];

  const dropdownLinks = [
    { type: "host", label: "Dashboard", path: `/host/${user}` },
    { type: "all", label: "FAQ", path: "/" },
    { type: "host", label: "ListingEditor", path: "/host/listing/create" },
    { type: "guest", label: "Signup", path: "/registration" },
    { type: "auth", label: "Logout", icon: "Logout", action: logout },
    {
      type: "guest",
      label: "Login",
      icon: "Login",
      action: () => document.getElementById("login_modal").showModal(),
    },
  ].filter((link) => filters.some((filter) => filter(link)));

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
                <span className="rounded bg-slate-50 p-2 text-2xl shadow-sm sm:hidden">
                  ⛵️
                </span>
                <span className="hidden sm:flex">Rent your boat</span>
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
