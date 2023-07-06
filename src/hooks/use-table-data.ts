import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RELATIONS } from '~/constants.ts'
import {
  AppDispatch,
  IUpdateCellValueDto,
  recordsAsyncActions,
  RootState,
} from '~/store'
import { ICell, TableDataType, TableName } from '~/types'
import { getTableRelations, transformTableFieldName } from '~/utils'

export const useTableData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const currentTableData = useSelector((state: RootState) => {
    const currentTable = state.records.selectedTable

    if (!currentTable) {
      return []
    }

    return state.records.tables[currentTable] || []
  })
  const { currentTable, tables } = useSelector((state: RootState) => ({
    currentTable: state.records.selectedTable,
    tables: state.records.tables,
  }))

  const onSelectTableData = (name: TableName) => {
    dispatch(recordsAsyncActions.getTableData(name))
  }

  const onUpdateCellValue = (dto: IUpdateCellValueDto) =>
    dispatch(recordsAsyncActions.updateCellValue(dto))

  const columnNames = useMemo(() => {
    if (currentTableData.length === 0) {
      return []
    }

    return Object.keys(currentTableData.at(0)!)
  }, [currentTableData])

  const dataRows: Array<ICell[]> = useMemo(() => {
    if (currentTableData.length === 0 || !currentTable) {
      return []
    }

    const currentTableRelations = getTableRelations(currentTable, RELATIONS)

    const tableFieldValuesMap: Record<string, TableDataType[]> = {}
    currentTableRelations.forEach(({ table, field }) => {
      tableFieldValuesMap[transformTableFieldName(table, field)] = tables[
        table
      ].map((row) => row[field])
    })

    return currentTableData.map((row) => {
      const names = Object.keys(row)
      const identifierName = names.at(0) as keyof typeof row
      const identifierValue = row[identifierName] as Exclude<TableName, null>

      return names.map((name) => {
        const isFieldRelated = RELATIONS[currentTable]
          ?.map((item) => item.field)
          ?.includes(name)

        const relationPath = !isFieldRelated
          ? undefined
          : RELATIONS[currentTable].find((item) => item.field)

        return {
          identifierName,
          identifierValue,
          columnName: name,
          key: `${identifierName}-${identifierValue}-${name}`,
          payload: row[name],
          options: relationPath
            ? tableFieldValuesMap[
                transformTableFieldName(
                  relationPath.target.table,
                  relationPath.target.field
                )
              ]
            : undefined,
        }
      })
    })
  }, [currentTable, currentTableData, tables])

  return {
    columnNames,
    dataRows,
    onSelectTableData,
    onUpdateCellValue,
  }
}
