import { Database } from '~/types/database.ts'

export type TableName = keyof Database['public']['Tables']
