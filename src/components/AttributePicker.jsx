import Icon from '@components/Icon'
import { useState } from 'react'
import { useController } from 'react-hook-form'

const AttributePicker = ({ control, name }) => {
  const { field } = useController({
    control,
    name,
  })
  const [attributes, setAttributes] = useState([
    { label: 'autopilot', icon: 'Autopilot', checked: false },
    { label: 'bedroom', icon: 'Bed', checked: false },
    { label: 'diving gear', icon: 'ScubaDiving', checked: false },
    { label: 'electricity', icon: 'Bolt', checked: false },
    { label: 'kitchen', icon: 'Kitchen', checked: false },
    { label: 'pets allowed', icon: 'Pets', checked: false },
    { label: 'shower', icon: 'Shower', checked: false },
    { label: 'toilet', icon: 'Restroom', checked: false },
  ])

  return (
    <div className='mx-auto grid min-w-80 max-w-sm grid-cols-2 gap-2 rounded-lg border border-solid border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-md focus:border-blue-500 sm:min-w-0 sm:max-w-none sm:grid-cols-4 xl:grid-cols-8 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'>
      {attributes.map((attribute, index) => (
        <div key={attribute.label} className='col-span-1 xl:col-span-2'>
          <input
            type='checkbox'
            value={attribute.label}
            id={attribute.label}
            className='peer hidden'
            checked={attribute.checked}
            onChange={(e) => {
              const _attributes = [...attributes]

              // update checkbox value
              _attributes[index].checked = e.target.checked

              // send data to react hook form
              field.onChange(
                _attributes
                  .filter((attribute) => attribute.checked)
                  .map((attribute) => {
                    return attribute
                  }),
              )

              // update local state
              setAttributes(_attributes)
            }}
          />
          <label
            htmlFor={attribute.label}
            className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-2 text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg hover:shadow-blue-200 peer-checked:border-gray-400 peer-checked:bg-gray-100 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300'>
            <div className='flex w-full flex-col items-center justify-center'>
              <span className='mb-1 w-full text-xs'>{attribute.label}</span>
              <Icon type={attribute.icon} className='size-6' />
            </div>
          </label>
        </div>
      ))}
    </div>
  )
}

export default AttributePicker
