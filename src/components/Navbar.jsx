import Dropdown from '@components/Dropdown'
import Icon from '@components/Icon'
import Modal from '@components/Modal'
import useAuth from '@hooks/useAuth'
import Auth from '@modal/Auth'
import useStore from '@utils/Store'
import { NavLink, useNavigate } from 'react-router-dom'
import useUsers from '@hooks/useUsers'

const Navbar = () => {
  const authenticated = useStore((state) => state.session.authenticated)
  const hosting = useStore((state) => state.user.host)
  const toggleModal = useStore((state) => state.toggleModal)
  const { logout } = useAuth()
  const { modeSwitch } = useUsers()
  const navigate = useNavigate()

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
    (link) => link.type === 'all',
    (link) => link.type === 'auth' && authenticated,
    (link) => link.type === 'guest' && !authenticated,
    (link) => link.type === 'host' && authenticated && hosting,
    (link) => link.type === 'user' && authenticated && !hosting,
  ]

  const dropdownLinks = [
    { type: 'all', label: 'About', path: 'about' },
    { type: 'user', label: 'Dashboard', path: '/user' },
    { type: 'host', label: 'Dashboard', path: '/host' },
    {
      type: 'user',
      label: 'Switch to host',
      action: () => {
        modeSwitch()
        navigate('/')
      },
    },
    { type: 'auth', label: 'Logout', icon: 'Logout', action: logout },
    {
      type: 'guest',
      label: 'Login/Sign up',
      icon: 'Login',
      action: () => toggleModal(),
    },
  ].filter((link) => filters.some((filter) => filter(link)))

  return (
    <header className='bg-white'>
      <div className='mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between text-center '>
          <div className=' block md:flex md:items-center md:gap-12'>
            <NavLink
              to={'/'}
              className=' ml-4 flex h-10 w-32 items-center justify-center text-4xl text-black'>
              <Icon type='Logo' className='ml-2 w-44' />
            </NavLink>
          </div>

          <div className='hidden md:block'>Search</div>

          <div className='block items-center gap-4 md:flex'>
            <div className='flex gap-4'>
              <div className='block md:flex'>
                <Dropdown
                  label={<Icon type='MenuOpen' className='size-8' />}
                  links={dropdownLinks}
                />
                <Modal
                  content={<Auth />}
                  className={'min-h-fit min-w-fit bg-white p-10'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
