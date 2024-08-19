import Icon from '@components/Icon'
import useAuth from '@hooks/useAuth'
import useUsers from '@hooks/useUsers'
import useStore from '@utils/Store'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Sidebar = ({ type }) => {
  const { logout } = useAuth()
  const { modeSwitch } = useUsers()
  const navigate = useNavigate()
  const user = useStore((state) => state.user)
  const links = [
    { text: 'Dashboard', path: `/${type}`, icon: 'Home' },
    { text: 'Messages', path: 'inbox', icon: 'Inbox' },
    { text: 'Settings', path: 'settings', icon: 'Settings' },
    { text: 'Listings', path: '/', icon: 'Search', type: 'user' },
  ].filter((link) => !link.type || link.type === type)

  const getAvatar = () => {
    // if we have an avatar image load that
    if (user.avatar_url !== '')
      return (
        <img
          src={user.avatar_url}
          className='size-10 rounded-lg'
          alt="user's avatar"
        />
      )

    // if there is no image get initials
    const name = user.full_name.split(' ')
    if (name.length > 1)
      return `${name[0].charAt(0).toUpperCase()}${name[1].charAt(0).toUpperCase()}`
    return '00'
  }

  const modeToggle = () => {
    type === 'user' ? navigate('/host') : navigate('/user')
    modeSwitch()
  }

  return (
    <div className='flex h-screen w-16 flex-col justify-between border-e bg-white'>
      <div>
        <Link to='account'>
          <div className='group relative inline-flex size-16 items-center justify-center '>
            <span className='grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600'>
              {getAvatar()}
            </span>
          </div>
        </Link>

        <div className='border-t border-gray-100'>
          <ul className='space-y-1 border-t border-gray-100 pt-4'>
            {links.map((link) => {
              return (
                <li key={link.text}>
                  <NavLink
                    end
                    to={link.path}
                    className={({ isActive }) =>
                      `group relative flex justify-center rounded bg-gray-50 px-2 py-1.5 ${
                        isActive
                          ? 'text-blue-600'
                          : 'hover:bg-gray-100 hover:text-blue-600'
                      }`
                    }>
                    <Icon type={link.icon} />

                    <span className='invisible absolute start-full top-1/2 z-20 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                      {link.text}
                    </span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className='sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2'>
        <div className='group container mx-auto inline-flex shrink-0 flex-wrap content-center justify-center gap-3 align-middle'>
          <label className='relative inline-block h-4 w-7 cursor-pointer rounded-full bg-gray-300 transition duration-300 [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-600'>
            <input
              type='checkbox'
              checked={user.host}
              className='peer sr-only'
              onChange={() => modeToggle()}
            />
            <span className='absolute inset-y-0 start-0 m-0.5 size-3 rounded-full bg-white transition-all peer-checked:start-3' />
          </label>
          <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
            {user.host ? 'Toggle host off' : 'Toggle host on'}
          </span>
        </div>

        <button
          type='button'
          onClick={() => logout()}
          className='group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-700'>
          <Icon type='Logout' />

          <span className='invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
