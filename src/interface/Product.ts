export default interface Product {
  _id?: string;
  full_name?: string;
  description?: string;
  sku?: string;
  price: number;
  thumbnail?: string;
  stock: number;
  sold: number;
}

export interface ProductOrder {
  productId: string;
  quantity: number
}

export interface ProductData {
  product?: Product;
  images?: Array<string>;
  videos?: Array<string>;
}
