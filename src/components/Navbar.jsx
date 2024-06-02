import Dropdown from "@components/Dropdown";
import Modal from "@components/Modal";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Svg from "@icons";

const Navbar = () => {
  const navigate = useNavigate();

  const dropdown = [
    { label: "FAQ", action: () => navigate("/") },
    {
      label: "login",
      action: () => document.getElementById("login_modal").showModal(),
    },
    { label: "signup", action: () => navigate("registration") },
  ];

  return (
    <header className=" flex items-center justify-between bg-cyan-100">
      <NavLink
        className={
          "ml-4 flex h-10 w-32 items-center justify-center text-4xl text-black"
        }
        to={"/"}
      >
        <Svg.Logo />
      </NavLink>

      {/* links and dropdown */}
      <nav className="flex gap-3 *:my-1 *:last:mx-1">
        <NavLink className={"btn min-h-0"} to={"renter"}>
          I like cash 💰
        </NavLink>
        {/* <Modal /> modal for picking language and cirrancy interaction */}
        {/* account options dropdown*/}
        <Dropdown label={"hower me"} links={dropdown} />
        {/* modal for login interaction */}
        <Modal />
      </nav>
    </header>
  );
};

export default Navbar;
