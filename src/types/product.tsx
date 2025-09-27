export interface Product {
  id: number
  name: string
  price: number
  quantity: number
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductData {
  name: string
  price: number
  quantity: number
  description: string
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: number
}

export interface ProductsResponse {
  data: Product[]
}



