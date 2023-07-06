import { TableDataType } from '~/types'

export interface ICell {
  identifierName: string
  identifierValue: Exclude<TableDataType, null>
  columnName: string
  key: string
  payload: TableDataType
  options?: TableDataType[]
}
