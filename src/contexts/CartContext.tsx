import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface CartLine {
  id: number
  name: string
  qty: number
}

interface CartContextType {
  cart: CartLine[]
  addToCart: (name: string) => void
  updateLine: (id: number, patch: Partial<CartLine>) => void
  removeLine: (id: number) => void
  addLine: () => void
  cartCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([])

  const cartCount = cart.reduce((n, l) => n + (Number(l.qty) || 0), 0)

  function addToCart(name: string) {
    setCart(prev => {
      const i = prev.findIndex(l => l.name === name)
      if (i >= 0) {
        const next = [...prev]
        next[i] = { ...next[i], qty: next[i].qty + 1 }
        return next
      }
      return [...prev, { id: Date.now() + Math.random(), name, qty: 1 }]
    })
  }

  function updateLine(id: number, patch: Partial<CartLine>) {
    setCart(prev => prev.map(l => (l.id === id ? { ...l, ...patch } : l)))
  }

  function removeLine(id: number) {
    setCart(prev => prev.filter(l => l.id !== id))
  }

  function addLine() {
    setCart(prev => [...prev, { id: Date.now() + Math.random(), name: '', qty: 1 }])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateLine, removeLine, addLine, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
