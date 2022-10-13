export interface Cart {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  quantity?: number;
}
