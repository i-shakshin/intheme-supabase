import { TableDataType } from '~/types'

interface IProps {
  payload: TableDataType
  identifierValue: string | number
  identifierName: string
  columnName: string
  options?: TableDataType[]
}

export const Cell = ({
  payload,
  identifierValue,
  identifierName,
  columnName,
  options,
}: IProps) => {
  if (options) {
    return (
      <td className="py-0 px-6 h-full">
        <select
          data-identifier-name={identifierName}
          data-identifier-value={identifierValue}
          data-column-name={columnName}
          defaultValue={String(payload)}
          className="h-full w-full bg-white hover:bg-gray-100"
        >
          {options.map((option) => (
            <option value={String(option)} key={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
    )
  }

  return (
    <td className="py-0 px-6 h-12 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <input
        defaultValue={String(payload)}
        data-identifier-name={identifierName}
        data-identifier-value={identifierValue}
        data-column-name={columnName}
        className="h-full inline-block relative w-full hover:bg-gray-100"
      />
    </td>
  )
}
