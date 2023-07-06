import { createAsyncThunk } from '@reduxjs/toolkit'

import { supabase } from '~/lib'
import { CellPointer, TableName } from '~/types'
import { showToast } from '~/utils'

export interface IUpdateCellValueDto {
  table: TableName
  updates: CellPointer
  where: CellPointer
}

interface State {
  records: { tables: unknown[] }
}

export const recordsAsyncActions = {
  getTableData: createAsyncThunk(
    'records/getTableData',
    async (name: TableName, thunkAPI) => {
      const state = thunkAPI.getState() as State

      if (state.records.tables[name].length > 0) {
        return thunkAPI.fulfillWithValue(state.records.tables[name])
      }

      const response = await supabase.from(name).select()

      showToast(`Загружено содержимое таблицы: ${name}`)

      return response.data || []
    }
  ),
  updateCellValue: createAsyncThunk(
    'records/updateCellValue',
    async (
      { updates, where, table }: IUpdateCellValueDto,
      { rejectWithValue }
    ) => {
      const { error, data } = await supabase
        .from(table)
        .update({
          [updates.fieldName]: updates.value,
        })
        .eq(where.fieldName, where.value)
        .select()

      if (error) {
        return rejectWithValue(error.message)
      }

      showToast('Значение ячейки обновлено')

      const [row] = data
      return row
    }
  ),
}
