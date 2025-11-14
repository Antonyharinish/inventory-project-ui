export interface Item {
  id?: number;
  name: string;
  sku: string;
  description?: string;
  price: number;
  weight_kg?: number;
  manufacturer?: string;
  country_of_origin?: string;
  stock_quantity: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
