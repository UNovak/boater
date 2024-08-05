import Account from '@icon/account_circle.svg?react'
import Add from '@icon/add.svg?react'
import Bed from '@icon/bed.svg?react'
import Bolt from '@icon/bolt.svg?react'
import ChevronForward from '@icon/chevron_forward.svg?react'
import Close from '@icon/close.svg?react'
import Facebook from '@icon/facebook.svg?react'
import Autopilot from '@icon/hands_free.svg?react'
import Hidden from '@icon/hidden.svg?react'
import Home from '@icon/home.svg?react'
import Human from '@icon/human.svg?react'
import Inbox from '@icon/inbox.svg?react'
import Kitchen from '@icon/kitchen.svg?react'
import LocationPin from '@icon/location_pin.svg?react'
import Login from '@icon/login.svg?react'
import Logo from '@icon/logo.svg?react'
import Logout from '@icon/logout.svg?react'
import MenuOpen from '@icon/menu_open.svg?react'
import Person from '@icon/person.svg?react'
import Pets from '@icon/pets.svg?react'
import Restroom from '@icon/restroom.svg?react'
import Sailboat from '@icon/sailboat.svg?react'
import ScubaDiving from '@icon/scuba_diving.svg?react'
import Search from '@icon/search.svg?react'
import Settings from '@icon/settings.svg?react'
import Shower from '@icon/shower.svg?react'
import Trash_closed from '@icon/trashcan_closed.svg?react'
import Trash_open from '@icon/trashcan_open.svg?react'
import Twitter from '@icon/twitter.svg?react'
import Unknown from '@icon/unknown.svg?react'
import Upload from '@icon/upload.svg?react'
import Visible from '@icon/visible.svg?react'
import Youtube from '@icon/youtube.svg?react'

const icon = {
  Account,
  Add,
  Autopilot,
  Bed,
  Bolt,
  ChevronForward,
  Close,
  Facebook,
  Hidden,
  Home,
  Human,
  Inbox,
  Kitchen,
  LocationPin,
  Login,
  Logo,
  Logout,
  MenuOpen,
  Person,
  Pets,
  Restroom,
  Sailboat,
  ScubaDiving,
  Search,
  Settings,
  Shower,
  Trash_closed,
  Trash_open,
  Twitter,
  Unknown,
  Upload,
  Visible,
  Youtube,
}

const Icon = ({ className = 'size-6', type = 'Unknown' }) => {
  const Icon = icon[type]

  // Ensure the selected component exists before rendering
  if (!Icon || type === '') {
    console.log('error finding an icon', type || undefined)
    return null
  }

  const clas = `${className} content-center`

  return (
    <div className={clas}>
      <Icon className={'fill-current'} />
    </div>
  )
}

export default Icon
