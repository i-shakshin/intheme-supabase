import { TableName } from '~/types/table-name.ts'

export interface IRelationTarget {
  table: TableName
  field: string
}

export interface IRelationMap {
  [name: string]: Array<{
    field: string
    target: IRelationTarget
  }>
}
