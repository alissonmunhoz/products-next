import axios from "axios"
import type { Product, CreateProductData, UpdateProductData, ProductsResponse } from "@/types/product"



const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use(
  (config) => {

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)





export const productsApi = {

  getProducts: async (page = 1, limit = 10, search?: string): Promise<ProductsResponse> => {
 

   
    const response = await api.get(`/products`)
    console.log('response', response)
    return response.data
  },


  getProduct: async (id: number): Promise<Product> => {


    const response = await api.get(`/products/${id}`)
    return response.data
  },


  createProduct: async (data: CreateProductData): Promise<Product> => {
   

    const response = await api.post("/product", data)
    console.log(response)
    return response.data.data
  },


  updateProduct: async (data: UpdateProductData): Promise<Product> => {
  

    const { id, ...updateData } = data
    const response = await api.put(`/product`, updateData, {params: {id}})
    console.log("updade",response)
    return response.data.data
  },


  deleteProduct: async (id: number): Promise<void> => {
   

    await api.delete(`/product`, {params: {id}})
  },


  bulkDeleteProducts: async (ids: number[]): Promise<void> => {
   

    await api.post("/products/bulk-delete", { ids })
  },
}

export default api
