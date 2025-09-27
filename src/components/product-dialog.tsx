"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Product, CreateProductData, UpdateProductData } from "@/types/product"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Package, DollarSign, Hash, FileText } from "lucide-react"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  onSave: (data: CreateProductData | UpdateProductData) => Promise<Product>
  onClose: () => void
}

export function ProductDialog({ open, onOpenChange, product, onSave, onClose }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const isEditing = !!product

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (open) {
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          quantity: product.quantity.toString(),
          description: product.description || "",
        })
      } else {
        setFormData({
          name: "",
          price: "",
          quantity: "",
          description: "",
        })
      }
      setErrors({})
    }
  }, [open, product])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Preço é obrigatório"
    } else {
      const price = Number.parseFloat(formData.price)
      if (isNaN(price) || price < 0) {
        newErrors.price = "Preço deve ser um número válido"
      }
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantidade é obrigatória"
    } else {
      const quantity = Number.parseInt(formData.quantity)
      if (isNaN(quantity) || quantity < 0) {
        newErrors.quantity = "Quantidade deve ser um número válido"
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      const data = {
        name: formData.name.trim(),
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity),
        description: formData.description.trim(),
      }

      if (isEditing) {
        await onSave({ ...data, id: product.id })
      } else {
        await onSave(data)
      }

      onClose()
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass border-border/50">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-semibold">
                {isEditing ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
              <DialogDescription className="text-base">
                {isEditing ? "Faça as alterações necessárias no produto." : "Preencha os dados do novo produto."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Nome do Produto *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Digite o nome do produto"
              className={`h-12 text-base ${errors.name ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
            />
            {errors.name && <p className="text-sm text-destructive flex items-center gap-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Preço *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0,00"
                className={`h-12 text-base ${errors.price ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
              />
              {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
            </div>

            <div className="space-y-3">
              <Label htmlFor="quantity" className="text-sm font-medium flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Quantidade *
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="0"
                className={`h-12 text-base ${errors.quantity ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
              />
              {errors.quantity && <p className="text-sm text-destructive">{errors.quantity}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Descrição *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Digite a descrição do produto"
              rows={4}
              className={`text-base resize-none ${errors.description ? "border-destructive focus-visible:ring-destructive/50" : ""}`}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="px-6 py-2.5 gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEditing ? "Salvar Alterações" : "Criar Produto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
