"use client"

import { useState, useEffect, useCallback } from "react"
import type { Product, CreateProductData, UpdateProductData } from "@/types/product"
import { productsApi } from "@/lib/api"
import { toast } from "sonner"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)


  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await productsApi.getProducts()
      setProducts(response.data)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar produtos"
      setError(msg)
      toast.error("Erro ao carregar produtos", { description: msg })
    } finally {
      setLoading(false)
    }
  }, [])

  const createProduct = async (data: CreateProductData) => {
    try {
      setLoading(true)
      const newProduct = await productsApi.createProduct(data)
      setProducts(prev => [newProduct, ...prev])
      toast.success("Produto criado com sucesso!", { description: `${newProduct.name} foi adicionado ao catálogo` })
      return newProduct
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (data: UpdateProductData) => {
    try {
      setLoading(true)
      const updated = await productsApi.updateProduct(data)
      console.log(updated)
      setProducts(prev => prev.map(p => (p.id === data.id ? updated : p)))
      toast.success("Produto atualizado com sucesso!", { description: `${updated.name} foi modificado` })
      return updated
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setLoading(true)
      const toDelete = products.find(p => p.id === id)
      await productsApi.deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success("Produto excluído com sucesso!", {
        description: toDelete ? `${toDelete.name} foi removido do catálogo` : "Produto removido",
      })
    } finally {
      setLoading(false)
    }
  }

  const bulkDeleteProducts = async (ids: number[]) => {
    try {
      setLoading(true)
      await productsApi.bulkDeleteProducts(ids)
      setProducts(prev => prev.filter(p => !ids.includes(p.id)))
      toast.success("Produtos excluídos com sucesso!", {
        description: `${ids.length} ${ids.length === 1 ? "produto foi removido" : "produtos foram removidos"} do catálogo`,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return {
    products, loading, error, total, 
     fetchProducts,
    createProduct, updateProduct, deleteProduct, bulkDeleteProducts,
  }
}
