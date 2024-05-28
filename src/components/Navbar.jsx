import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar mb-6 flex w-full justify-center bg-primary text-primary-content">
      <NavLink className="btn m-2 h-6 min-h-0" to={"/"}>
        Home
      </NavLink>
      <NavLink className="btn m-2 h-6 min-h-0" to={"registration"}>
        Register
      </NavLink>
      <NavLink className="btn m-2 h-6 min-h-0" to={"host"}>
        Host
      </NavLink>
      <NavLink className="btn m-2 h-6 min-h-0" to={"renter/listing"}>
        Listing
      </NavLink>
      <NavLink className="btn m-2 h-6 min-h-0 " to={"renter"}>
        Renter
      </NavLink>
    </div>
  );
};

export default Navbar;
