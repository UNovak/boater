import Account from "./account_circle.svg?react";
import ChevronForward from "./chevron_forward.svg?react";
import Close from "./close.svg?react";
import Facebook from "./facebook.svg?react";
import Hidden from "./hidden.svg?react";
import Human from "./human.svg?react";
import LocationPin from "./location_pin.svg?react";
import Login from "./login.svg?react";
import Logo from "./logo.svg?react";
import Logout from "./logout.svg?react";
import MenuOpen from "./menu_open.svg?react";
import Person from "./person.svg?react";
import Sailboat from "./sailboat.svg?react";
import Trash_closed from "./trashcan_closed.svg?react";
import Trash_open from "./trashcan_open.svg?react";
import Twitter from "./twitter.svg?react";
import Unknown from "./unknown.svg?react";
import Upload from "./upload.svg?react";
import Visible from "./visible.svg?react";
import Youtube from "./youtube.svg?react";

const icon = {
  Account,
  ChevronForward,
  Close,
  Facebook,
  Hidden,
  Human,
  LocationPin,
  Login,
  Logo,
  Logout,
  MenuOpen,
  Person,
  Person,
  Sailboat,
  Trash_closed,
  Trash_open,
  Twitter,
  Unknown,
  Upload,
  Visible,
  Youtube,
};

const Icon = ({ className = "w-6 h-6 content-center", type = "Unknown" }) => {
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
