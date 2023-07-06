import { IRelationMap, TableName } from '~/types'

export const TABLES_LIST: TableName[] = [
  'Categories',
  'Customers',
  'Employee_Territories',
  'Employees',
  'Order_Details',
  'Orders',
  'Products',
  'Region',
  'Suppliers',
  'Territories',
]

export const RELATIONS: IRelationMap = {
  Employee_Territories: [
    {
      field: 'employee_id',
      target: {
        table: 'Employees',
        field: 'employee_id',
      },
    },
    {
      field: 'territory_id',
      target: {
        table: 'Territories',
        field: 'territory_id',
      },
    },
  ],
  Order_Details: [
    {
      field: 'product_id',
      target: {
        table: 'Products',
        field: 'product_id',
      },
    },
  ],
  Orders: [
    {
      field: 'employee_id',
      target: {
        table: 'Employees',
        field: 'employee_id',
      },
    },
    {
      field: 'customer_id',
      target: {
        table: 'Employees',
        field: 'customer_id',
      },
    },
  ],
  Products: [
    {
      field: 'supplier_id',
      target: {
        table: 'Suppliers',
        field: 'supplier_id',
      },
    },
    {
      field: 'category_id',
      target: {
        table: 'Categories',
        field: 'category_id',
      },
    },
  ],
  Territories: [
    {
      field: 'region_id',
      target: {
        table: 'Region',
        field: 'region_id',
      },
    },
  ],
}
