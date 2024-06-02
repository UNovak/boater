import Dropdown from "@components/Dropdown";
import Modal from "@components/Modal";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const dropdown = [
    { label: "FAQ", action: () => navigate("/") },
    { label: "login", action: () => setModal(true) },
    { label: "signup", action: () => navigate("registration") },
  ];

  return (
    <header className=" flex items-center justify-between bg-cyan-100">
      <div className="flex h-9 items-center justify-between">
        <NavLink className={"text-4xl text-black"} to={"/"}>
          {/* TODO: logo and title */}
          logo
        </NavLink>
      </div>

      {/* links and dropdown */}
      <nav className="flex gap-3 *:my-1 *:last:mx-1">
        <NavLink className={"btn min-h-0"} to={"renter"}>
          I like cash 💰
        </NavLink>
        <Modal /> {/* modal for picking language and cirrancy interaction */}
        {/* account options dropdown*/}
        <Dropdown label={"hower me"} links={dropdown} />
        <Modal /> {/* modal for login interaction */}
      </nav>
    </header>
  );
};

export default Navbar;
