"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Heart, ArrowLeft, Plus, Minus, Trash2, Tag, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const initialCartItems = [
  {
    id: 1,
    name: "Monaco GP Tee",
    price: 89,
    image: "/placeholder.svg?height=200&width=200",
    size: "L",
    color: "Black",
    quantity: 2,
  },
  {
    id: 2,
    name: "Silverstone Jacket",
    price: 299,
    image: "/placeholder.svg?height=200&width=200",
    size: "M",
    color: "Red",
    quantity: 1,
  },
  {
    id: 3,
    name: "Championship Cap",
    price: 59,
    image: "/placeholder.svg?height=200&width=200",
    size: "One Size",
    color: "Navy",
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <Flag className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                APEX RACING
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-red-600/20">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-red-600/20 relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-xs">
                  {cartItems.length}
                </Badge>
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hover:bg-red-600/20">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
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
                <Link
                  href="/products"
                  className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
                <p className="text-xl text-gray-400">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShoppingCart className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-300">Your cart is empty</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any racing gear to your cart yet. Start building your championship
                  collection!
                </p>
                <Link href="/products">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                    Start Shopping
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        ) : (
          /* Cart Items */
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                              <div className="flex space-x-4 text-sm text-gray-400">
                                <span>Size: {item.size}</span>
                                <span>Color: {item.color}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-400 hover:bg-red-600/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-gray-700 rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="hover:bg-gray-700"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-4 py-2 min-w-[60px] text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="hover:bg-gray-700"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="text-right">
                              <p className="text-2xl font-bold text-red-500">${item.price * item.quantity}</p>
                              <p className="text-sm text-gray-400">${item.price} each</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-900 rounded-2xl p-6 border border-gray-800 h-fit sticky top-24"
                >
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Promo Code</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                      />
                      <Button
                        onClick={applyPromoCode}
                        variant="outline"
                        className="border-gray-700 hover:bg-gray-800 bg-transparent"
                      >
                        <Tag className="w-4 h-4" />
                      </Button>
                    </div>
                    {discount > 0 && (
                      <p className="text-green-400 text-sm mt-2">✓ {discount * 100}% discount applied!</p>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount ({discount * 100}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-red-500">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg mb-4">
                    Proceed to Checkout
                  </Button>

                  <div className="text-center text-sm text-gray-400">
                    <p>Secure checkout with SSL encryption</p>
                  </div>

                  {/* Benefits */}
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        Free shipping on orders over $100
                      </div>
                      <div className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        30-day easy returns
                      </div>
                      <div className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        1-year warranty included
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
