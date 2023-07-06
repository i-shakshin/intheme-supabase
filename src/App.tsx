import { useDispatch, useSelector } from 'react-redux'

import { Grid, TablesList } from '~/components'
import { RELATIONS, TABLES_LIST } from '~/constants.ts'
import { useTableData } from '~/hooks'
import {
  AppDispatch,
  recordsActions,
  recordsAsyncActions,
  RootState,
} from '~/store'
import { CellPointer, TableName } from '~/types'
import { getTableRelations } from '~/utils'

export const App = () => {
  const { selectedTable } = useSelector((state: RootState) => ({
    selectedTable: state.records.selectedTable,
  }))
  const dispatch = useDispatch<AppDispatch>()

  const { columnNames, dataRows, onSelectTableData, onUpdateCellValue } =
    useTableData()

  const onUpdateValue = (updates: CellPointer, where: CellPointer) => {
    if (!selectedTable) {
      return
    }

    void onUpdateCellValue({ updates, where, table: selectedTable })
  }

  const onSelectTable = (name: TableName) => {
    dispatch(recordsActions.setSelectedTable(name))
    void onSelectTableData(name)

    getTableRelations(name, RELATIONS)
      .map((target) => target.table)
      .map((name) => dispatch(recordsAsyncActions.getTableData(name)))
  }

  return (
    <main className="flex gap-10 m-10">
      <TablesList
        list={TABLES_LIST}
        selectedTable={selectedTable}
        onSelectTable={onSelectTable}
      />
      <Grid
        key={selectedTable}
        columnNames={columnNames}
        dataRows={dataRows}
        onUpdateCellValue={onUpdateValue}
      />
    </main>
  )
}
