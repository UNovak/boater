import Account from "./account_circle.svg?react";
import Close from "./close.svg?react";
import Hidden from "./hidden.svg?react";
import Logo from "./logo.svg?react";
import MenuOpen from "./menu_open.svg?react";
import Trash_closed from "./trashcan_closed.svg?react";
import Trash_open from "./trashcan_open.svg?react";
import Person from "./person.svg?react";
import Visible from "./visible.svg?react";

const icon = {
  Account,
  Close,
  Hidden,
  Logo,
  MenuOpen,
  Person,
  Trash_closed,
  Trash_open,
  Person,
  Visible,
};

const Icon = ({ className = "w-6 h-6 content-center", type = "Eye" }) => {
  const Icon = icon[type];

  // Ensure the selected component exists before rendering
  if (!Icon) {
    console.log("error getting svg", type);
    return null;
  }

  console.log();
  return (
    <div className={className}>
      <Icon className={"fill-current"} />
    </div>
  );
};

export default Icon;
