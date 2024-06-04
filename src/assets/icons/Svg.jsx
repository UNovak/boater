import Account from "./account_circle.svg?react";
import Close from "./close.svg?react";
import Facebook from "./facebook.svg?react";
import Hidden from "./hidden.svg?react";
import Logo from "./logo.svg?react";
import MenuOpen from "./menu_open.svg?react";
import Person from "./person.svg?react";
import Trash_closed from "./trashcan_closed.svg?react";
import Trash_open from "./trashcan_open.svg?react";
import Twitter from "./twitter.svg?react";
import Visible from "./visible.svg?react";
import Youtube from "./youtube.svg?react";

const icon = {
  Account,
  Close,
  Facebook,
  Hidden,
  Logo,
  MenuOpen,
  Person,
  Person,
  Trash_closed,
  Trash_open,
  Twitter,
  Visible,
  Youtube,
};

const Icon = ({ className = "w-6 h-6 content-center", type = "" }) => {
  const Icon = icon[type];

  // Ensure the selected component exists before rendering
  if (!Icon || type == "") {
    console.log("error finding an icon", type || undefined);
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
