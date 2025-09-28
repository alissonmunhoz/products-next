"use client"

import { useMemo, useState, useDeferredValue } from "react"

import { Button } from "@/components/ui/button"
import { Plus, Package, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

import type { CreateProductData, Product, UpdateProductData } from "@/types/product"

import { ProductsTable } from "./products-table"
import { ProductDialog } from "./product-dialog"
import { useProducts } from "@/hooks/use-products"
import { SearchBar } from "./search"

function normalize(text: string) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

export function ProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchValue, setSearchValue] = useState("")
  const deferredSearch = useDeferredValue(searchValue)

  const { products, loading, createProduct, updateProduct, deleteProduct } = useProducts()

  const handleCreateProduct = () => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }


  const totalProducts = products.length
  const lowStockProducts = products.filter((p) => p.quantity < 10 && p.quantity > 0).length
  const outOfStockProducts = products.filter((p) => p.quantity === 0).length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)


  const filteredProducts = useMemo(() => {
    const query = normalize(deferredSearch).trim()
    if (!query) return products

    const tokens = query.split(/\s+/).filter(Boolean)

    return products.filter((p) => {
      const haystack = normalize(
        [
          p.name,
          p.description,
          String(p.id ?? ""),
          String(p.price ?? ""),
          String(p.quantity ?? ""),
        ].join(" ")
      )


      return tokens.every((t) => haystack.includes(t))
    })
  }, [products, deferredSearch])

  return (
  
    <div className="min-h-screen bg-background grid-pattern">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="gradient-text">Gestão de Produtos</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Plataforma completa para gerenciar seu catálogo de produtos com elegância e eficiência
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button onClick={handleCreateProduct} size="lg" className="gap-2 px-8 py-6 text-lg">
                <Plus className="h-5 w-5" />
                Novo Produto
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Produtos</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div className="w-full">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold">{lowStockProducts}</p>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <CheckCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sem Estoque</p>
                <p className="text-2xl font-bold">{outOfStockProducts}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
             <div>
            <h2 className="text-3xl font-semibold">Catálogo</h2>
            <p className="text-muted-foreground mt-1">Gerencie todos os seus produtos</p>
          </div>
          <SearchBar value={searchValue} onChange={setSearchValue} placeholder="Buscar produtos..." />
        </div>

    
        <div className="glass rounded-2xl overflow-hidden">
          <ProductsTable
            products={filteredProducts}
            loading={loading}
            onEdit={handleEditProduct}
            onDelete={deleteProduct}
          />
        </div>
      </div>

        <ProductDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          product={editingProduct}
          onSave={(data) => editingProduct
            ? updateProduct(data as UpdateProductData)
            : createProduct(data as CreateProductData)}
          onClose={handleCloseDialog}
        />
      </div>
    </div>
  
        )
      }