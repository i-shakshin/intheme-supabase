import { IRelationMap, IRelationTarget, TableName } from '~/types'

export const getTableRelations = (
  name: TableName,
  relationsMap: IRelationMap
): IRelationTarget[] => {
  if (!relationsMap[name]) {
    return []
  }

  return relationsMap[name].map(({ target }) => target)
}
