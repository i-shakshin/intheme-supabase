import clsx from 'clsx'

import { TableName } from '~/types'

interface IProps {
  list: TableName[]
  selectedTable: TableName | undefined
  onSelectTable(table: TableName): void
}

export const TablesList = ({ list, selectedTable, onSelectTable }: IProps) => {
  return (
    <section className="w-auto rounded-md border border-slate-300 py-4">
      <h2 className="text-xl font-bold px-4">Список таблиц</h2>
      <ul className="m-0 mt-2">
        {list.map((name) => (
          <li
            key={name}
            onClick={() => onSelectTable(name)}
            className={clsx('px-4 py-2 hover:bg-gray-100 cursor-pointer', {
              'font-medium bg-gray-200': selectedTable === name,
            })}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
