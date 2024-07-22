import Icon from '@components/Icon'
import { useState } from 'react'
import { useController } from 'react-hook-form'

const AttributePicker = ({ control, name }) => {
  const { field } = useController({
    control,
    name,
  })
  const [attributes, setAttributes] = useState([
    { label: 'kitchen', icon: 'Pen', checked: false },
    { label: 'toilet', icon: 'Toilet', checked: false },
    { label: 'pets allowed', icon: 'Dog', checked: false },
    { label: 'bedrooms', icon: 'Bed', checked: false },
    { label: 'diving gear', icon: 'Goggles', checked: false },
    { label: 'shower', icon: 'ShowerHead', checked: false },
    { label: 'autopilot', icon: 'Avtopilot', checked: false },
    { label: 'electricity', icon: 'Electricity', checked: false },
  ])

  return (
    <div className='flex h-fit w-full flex-wrap gap-2 rounded-lg border border-solid border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-md  focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'>
      {attributes.map((attribute, index) => {
        return (
          <div key={attribute.label}>
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
                    .map((attribute) => attribute.label),
                )

                // update local state
                setAttributes(_attributes)
              }}
            />
            <label
              htmlFor={attribute.label}
              className='inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-2 text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg hover:shadow-blue-200 peer-checked:border-gray-400 peer-checked:bg-gray-100 peer-checked:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300 '>
              <div className='flex flex-col items-center justify-center'>
                <span className='mb-1 w-full text-xs'>{attribute.label}</span>
                <Icon />
              </div>
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default AttributePicker
