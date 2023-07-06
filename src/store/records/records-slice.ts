import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { recordsAsyncActions } from '~/store'
import { TableDataType, TableName } from '~/types'
import { showToast } from '~/utils'

interface IRecordsSlice {
  selectedTable?: TableName
  tables: {
    [name: string]: Array<Record<string, TableDataType>>
  }
}

const recordsSlice = createSlice({
  name: 'records',
  initialState: {
    tables: {
      Categories: [],
      Customers: [],
      Employee_Territories: [],
      Employees: [],
      Order_Details: [],
      Orders: [],
      Products: [],
      Region: [],
      Suppliers: [],
      Territories: [],
    },
  } as IRecordsSlice,
  reducers: {
    setSelectedTable: (draft, { payload }: PayloadAction<TableName>) => {
      draft.selectedTable = payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        recordsAsyncActions.getTableData.fulfilled,
        (draft, { payload, meta }) => {
          draft.tables[meta.arg] = payload
        }
      )
      .addCase(recordsAsyncActions.getTableData.rejected, (_, { meta }) => {
        showToast(
          `Произошла ошибка при загрузке содержимого таблицы: ${meta.arg}`,
          'error'
        )
      })
      .addCase(
        recordsAsyncActions.updateCellValue.fulfilled,
        (draft, { meta }) => {
          const row = draft.tables[meta.arg.table].find(
            (item) =>
              String(item[meta.arg.where.fieldName]) === meta.arg.where.value
          )

          if (!row) {
            return
          }

          row[meta.arg.updates.fieldName] = meta.arg.updates
            .value as TableDataType
        }
      )
      .addCase(
        recordsAsyncActions.updateCellValue.rejected,
        (_, { payload }) => {
          showToast(
            `Произошла ошибка при обновлении значения ячейки: ${payload}`,
            'error'
          )
        }
      ),
})

export const recordsReducer = recordsSlice.reducer
export const recordsActions = recordsSlice.actions
