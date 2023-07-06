import { FormEvent, KeyboardEvent } from 'react'

import { Cell } from '~/components'
import { CellPointer, ICell } from '~/types'

interface IProps {
  columnNames: string[]
  dataRows: Array<ICell[]>
  onUpdateCellValue(updates: CellPointer, where: CellPointer): void
}

export const Grid = ({ columnNames, dataRows, onUpdateCellValue }: IProps) => {
  const onUpdateValue = (target: HTMLInputElement) => {
    const identifierName = target.dataset['identifierName']
    const identifierValue = target.dataset['identifierValue']
    const columnName = target.dataset['columnName']

    if (!identifierName || !identifierValue || !columnName) {
      throw new Error('Не удалось прочесть данные ячейки')
    }

    onUpdateCellValue(
      {
        fieldName: columnName,
        value: target.value,
      },
      {
        fieldName: identifierName,
        value: identifierValue,
      }
    )
  }

  const onKeyDown = (
    event: KeyboardEvent<HTMLTableElement> & { target: HTMLInputElement }
  ) => {
    if (event.key !== 'Enter') {
      return
    }

    onUpdateValue(event.target)
  }

  if (columnNames.length === 0) {
    return null
  }

  return (
    <section className="border-collapse rounded-md border border-slate-300 w-full  h-fit">
      <table
        onKeyDown={onKeyDown}
        onChange={(
          event: FormEvent<HTMLTableElement> & { target: { tagName: string } }
        ) => {
          if (event.target.tagName === 'INPUT') {
            return
          }

          onUpdateValue(event.target as HTMLInputElement)
        }}
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-12">
          <tr>
            {columnNames.map((name) => (
              <th key={name} className="px-6">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 h-12 "
            >
              {row.map(
                ({
                  key,
                  payload,
                  identifierValue,
                  identifierName,
                  columnName,
                  options,
                }) => {
                  return (
                    <Cell
                      key={key}
                      payload={payload}
                      identifierName={identifierName}
                      identifierValue={identifierValue}
                      columnName={columnName}
                      options={options}
                    />
                  )
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
