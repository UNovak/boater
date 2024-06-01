import Dropdown from "@components/Dropdown";
import Modal from "@components/Modal";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [modal, setModal] = useState(false);

  return (
    <header className="navbar bg-cyan-100">
      <div className="">
        <NavLink className={"text-4xl text-black "} to={"/"}>
          {/* TODO: logo and title */}
        </NavLink>
      </div>

      {/* links and dropdown */}
      <nav>
        <NavLink className={"btn"} to={"renter"}>
          I like cash 💰
        </NavLink>
        <Dropdown label={"lang"} /> {/* dropdown for language */}
        <Dropdown label={"user"} /> {/* account options dropdown*/}
        <Modal /> {/* modal for login interaction */}
      </nav>
    </header>
  );
};

export default Navbar;
