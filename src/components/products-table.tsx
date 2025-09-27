"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Package } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface ProductsTableProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export function ProductsTable({ products, loading, onEdit, onDelete }: ProductsTableProps) {


 

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { label: "Sem estoque", variant: "destructive" as const }
    } else if (quantity < 10) {
      return { label: "Estoque baixo", variant: "secondary" as const }
    } else {
      return { label: "Em estoque", variant: "default" as const }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
          <div>
            <p className="text-lg font-medium">Carregando produtos</p>
            <p className="text-muted-foreground">Aguarde um momento...</p>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Package className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Comece criando seu primeiro produto e construa seu catálogo
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden flex justify-center">
        <Table>
        <TableHeader>
            <TableRow className="border-border/50 hover:bg-muted/30">
                <TableHead className="font-semibold text-center">Nome</TableHead>
                <TableHead className="font-semibold text-center">Preço</TableHead>
                <TableHead className="font-semibold text-center">Quantidade</TableHead>
                <TableHead className="font-semibold text-center">Status</TableHead>
                <TableHead className="font-semibold text-center">Descrição</TableHead>
                <TableHead className="w-12 text-center"></TableHead>
            </TableRow>
        </TableHeader>
          <TableBody>
            {products.map((product, idx) => {
                const rowKey = product?.id ?? `tmp-${idx}`
              const stockStatus = getStockStatus(product.quantity)
              return (
                <TableRow key={rowKey} className="border-border/50 hover:bg-muted/30 transition-colors">
                  
                  <TableCell className="font-medium text-foreground text-center">{product.name}</TableCell>
                  <TableCell className="font-mono font-medium text-primary text-center">{formatCurrency(product.price)}</TableCell>
                  <TableCell className="font-medium text-center">{product.quantity}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={stockStatus.variant} className="font-medium">
                      {stockStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground text-center">{product.description}</TableCell>
                  <TableCell className="pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuItem onClick={() => onEdit(product)} className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(product.id)}
                          className="gap-2 text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
