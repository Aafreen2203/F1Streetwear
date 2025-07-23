"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Heart, ArrowLeft, Plus, Minus, Trash2, Tag, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useLoading } from "@/contexts/LoadingContext"

export default function CartPage() {
  const router = useRouter()
  const { startLoading } = useLoading()
  const { state: cartState, updateQuantity, removeFromCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  // Navigation with loading
  const navigateWithLoading = (path: string) => {
    startLoading()
    router.push(path)
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "racing10") {
      setDiscount(0.1)
    } else if (promoCode.toLowerCase() === "speed20") {
      setDiscount(0.2)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = cartState.total
  const discountAmount = subtotal * discount
  const shipping = subtotal > 100 ? 0 : 15
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-600/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigateWithLoading('/')}
              className="flex items-center space-x-3 bg-transparent border-0 cursor-pointer"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center transform rotate-45">
                  <Flag className="w-5 h-5 text-white transform -rotate-45" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-lg blur-lg opacity-50" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                APEX RACING
              </span>
            </button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-red-600/20">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-red-600/20 relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-xs">
                  {cartState.itemCount}
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-red-600/20"
                onClick={() => navigateWithLoading('/login')}
              >
                  <User className="w-5 h-5" />
                </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-red-900/20 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <Button 
                    variant="ghost" 
                    className="text-red-400 hover:text-white hover:bg-red-600/20"
                    onClick={() => navigateWithLoading('/products')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </div>
                <h1 className="text-4xl font-black mb-2">YOUR CART</h1>
                <p className="text-gray-400">
                  {cartState.itemCount} {cartState.itemCount === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {cartState.items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Start shopping to add items to your cart</p>
                <Button 
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-3"
                  onClick={() => navigateWithLoading('/products')}
                >
                  Browse Products
                </Button>
              </motion.div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {cartState.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-red-500/30 transition-colors"
                      >
                        <div className="flex gap-6">
                          <div className="relative w-24 h-24 bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <p className="text-gray-400">{item.category}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-400 hover:bg-red-600/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-red-600/20"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-red-600/20"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-red-500">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-gray-400">${item.price} each</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 sticky top-24"
                  >
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                        />
                        <Button
                          onClick={applyPromoCode}
                          className="bg-red-600 hover:bg-red-700 text-white px-6"
                        >
                          <Tag className="w-4 h-4" />
                        </Button>
                      </div>
                      {discount > 0 && (
                        <p className="text-green-400 text-sm mt-2">✓ Promo code applied!</p>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-700 pt-3">
                        <div className="flex justify-between text-xl font-bold">
                          <span>Total</span>
                          <span className="text-red-500">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-4 text-lg font-bold">
                      PROCEED TO CHECKOUT
                    </Button>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-400">
                        Free shipping on orders over $100
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
