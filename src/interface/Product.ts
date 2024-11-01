export default interface Product {
  _id?: string;
  full_name?: string;
  description?: string;
  sku?: string;
  price: number;
  thumbnail?: string;
  stock: number;
  sold: number;
  categories?: Array<string>
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

export interface ProductCreate {
  _id?: string;
  full_name?: string;
  description?: string;
  sku?: string;
  price: number;
  thumbnail: File;
  stock: number;
  sold: number;
  images: Array<File>;
  categories: Array<string>
}

export interface ProductError {
  name: string,
  message: string
}