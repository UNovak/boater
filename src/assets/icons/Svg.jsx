import Account from './account_circle.svg?react'
import Bed from './bed.svg?react'
import Bolt from './bolt.svg?react'
import ChevronForward from './chevron_forward.svg?react'
import Close from './close.svg?react'
import Facebook from './facebook.svg?react'
import Autopilot from './hands_free.svg?react'
import Hidden from './hidden.svg?react'
import Human from './human.svg?react'
import Kitchen from './kitchen.svg?react'
import LocationPin from './location_pin.svg?react'
import Login from './login.svg?react'
import Logo from './logo.svg?react'
import Logout from './logout.svg?react'
import MenuOpen from './menu_open.svg?react'
import Person from './person.svg?react'
import Pets from './pets.svg?react'
import Restroom from './restroom.svg?react'
import Sailboat from './sailboat.svg?react'
import ScubaDiving from './scuba_diving.svg?react'
import Shower from './shower.svg?react'
import Trash_closed from './trashcan_closed.svg?react'
import Trash_open from './trashcan_open.svg?react'
import Twitter from './twitter.svg?react'
import Unknown from './unknown.svg?react'
import Upload from './upload.svg?react'
import Visible from './visible.svg?react'
import Youtube from './youtube.svg?react'

const icon = {
  Account,
  Autopilot,
  Bed,
  Bolt,
  ChevronForward,
  Close,
  Facebook,
  Hidden,
  Human,
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
  Shower,
  Trash_closed,
  Trash_open,
  Twitter,
  Unknown,
  Upload,
  Visible,
  Youtube,
}

const Icon = ({ className = 'size-4', type = 'Unknown' }) => {
  const Icon = icon[type]

  // Ensure the selected component exists before rendering
  if (!Icon || type == '') {
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
