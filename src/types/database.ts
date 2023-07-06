export interface Database {
  public: {
    Tables: {
      Categories: {
        Row: {
          category_id: number
          category_name: string
        }
        Insert: {
          category_id?: number
          category_name?: string
        }
        Update: {
          category_id?: number
          category_name?: string
        }
        Relationships: []
      }
      Customers: {
        Row: {
          company_name: string
          customer_id: number
        }
        Insert: {
          company_name?: string
          customer_id?: number
        }
        Update: {
          company_name?: string
          customer_id?: number
        }
        Relationships: []
      }
      Employee_Territories: {
        Row: {
          employee_id: number
          territory_id: number
        }
        Insert: {
          employee_id: number
          territory_id: number
        }
        Update: {
          employee_id?: number
          territory_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Employee_Territories_employee_id_fkey'
            columns: ['employee_id']
            referencedRelation: 'Employees'
            referencedColumns: ['employee_id']
          },
          {
            foreignKeyName: 'Employee_Territories_territory_id_fkey'
            columns: ['territory_id']
            referencedRelation: 'Territories'
            referencedColumns: ['territory_id']
          }
        ]
      }
      Employees: {
        Row: {
          employee_id: number
          first_name: string
        }
        Insert: {
          employee_id?: number
          first_name?: string
        }
        Update: {
          employee_id?: number
          first_name?: string
        }
        Relationships: []
      }
      Order_Details: {
        Row: {
          order_id: number
          product_id: number
          quantity: number
        }
        Insert: {
          order_id?: number
          product_id: number
          quantity: number
        }
        Update: {
          order_id?: number
          product_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Order_Details_order_id_fkey'
            columns: ['order_id']
            referencedRelation: 'Orders'
            referencedColumns: ['order_id']
          },
          {
            foreignKeyName: 'Order_Details_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'Products'
            referencedColumns: ['product_id']
          }
        ]
      }
      Orders: {
        Row: {
          customer_id: number | null
          employee_id: number | null
          order_date: string | null
          order_id: number
        }
        Insert: {
          customer_id?: number | null
          employee_id?: number | null
          order_date?: string | null
          order_id?: number
        }
        Update: {
          customer_id?: number | null
          employee_id?: number | null
          order_date?: string | null
          order_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Orders_customer_id_fkey'
            columns: ['customer_id']
            referencedRelation: 'Customers'
            referencedColumns: ['customer_id']
          },
          {
            foreignKeyName: 'Orders_employee_id_fkey'
            columns: ['employee_id']
            referencedRelation: 'Employees'
            referencedColumns: ['employee_id']
          }
        ]
      }
      Products: {
        Row: {
          category_id: number | null
          product_id: number
          product_name: string
          supplier_id: number | null
        }
        Insert: {
          category_id?: number | null
          product_id?: number
          product_name?: string
          supplier_id?: number | null
        }
        Update: {
          category_id?: number | null
          product_id?: number
          product_name?: string
          supplier_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'Products_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'Categories'
            referencedColumns: ['category_id']
          },
          {
            foreignKeyName: 'Products_supplier_id_fkey'
            columns: ['supplier_id']
            referencedRelation: 'Suppliers'
            referencedColumns: ['supplier_id']
          }
        ]
      }
      Region: {
        Row: {
          region_description: string
          region_id: number
        }
        Insert: {
          region_description?: string
          region_id?: number
        }
        Update: {
          region_description?: string
          region_id?: number
        }
        Relationships: []
      }
      Suppliers: {
        Row: {
          company_name: string
          supplier_id: number
        }
        Insert: {
          company_name?: string
          supplier_id?: number
        }
        Update: {
          company_name?: string
          supplier_id?: number
        }
        Relationships: []
      }
      Territories: {
        Row: {
          region_id: number
          territory_description: string
          territory_id: number
        }
        Insert: {
          region_id: number
          territory_description?: string
          territory_id?: number
        }
        Update: {
          region_id?: number
          territory_description?: string
          territory_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'Territories_region_id_fkey'
            columns: ['region_id']
            referencedRelation: 'Region'
            referencedColumns: ['region_id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
