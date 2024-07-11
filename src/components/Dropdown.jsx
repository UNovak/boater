import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '@icons'

export const Dropdown = ({ label, links }) => {
  const [hovered, setHovered] = useState(false)

  const getClassName = (label) => {
    let className = 'm-auto block w-full rounded-lg px-4 py-2 text-sm'

    label === 'Logout'
      ? (className +=
          'rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-red-50 hover:text-red-700')
      : (className +=
          'rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700')

    return className
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className='inline-flex items-center overflow-hidden rounded-md border'>
        <div
          role='button'
          className='flex rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700'>
          {label}
        </div>
      </div>

      <div className='absolute z-10 -mt-3 flex h-8 w-full' />
      {hovered && (
        <div
          className='absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-l border border-gray-100 bg-white shadow-lg'
          role='menu'>
          {links.map((link, index) => (
            <div className='p-2' key={index}>
              {link.path ? (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    'm-auto block w-full rounded-lg px-4 py-2 text-sm' +
                    (isActive
                      ? ' pointer-events-none text-blue-500'
                      : ' text-gray-500 hover:bg-gray-50 hover:text-gray-700 ')
                  }>
                  <span className='flex w-full items-center justify-between'>
                    {link.label}
                    {link.icon && <Icon type={link.icon} />}
                  </span>
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    link.action()
                    setHovered(false)
                  }}
                  className={getClassName(link.label)}>
                  <span className='flex w-full items-center justify-between'>
                    {link.label}
                    {link.icon && <Icon type={link.icon} />}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
