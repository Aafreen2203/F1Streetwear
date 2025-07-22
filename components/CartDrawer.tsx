"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingCart, Plus, Minus, Fuel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, removeFromCart, updateQuantity } = useCart()

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-l border-red-500/30 z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-red-900/20 to-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white tracking-wider">PIT STOP</h2>
                    <p className="text-red-400 text-sm font-mono">CART INVENTORY</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-red-600/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-lg font-mono">YOUR GARAGE IS EMPTY</p>
                  <p className="text-gray-600 text-sm mt-2">Time to fuel up with some gear!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-red-500/50 transition-colors"
                    >
                      <div className="flex space-x-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-sm truncate">{item.name}</h3>
                          <p className="text-red-400 font-mono text-sm">${item.price}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3 mt-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-white hover:bg-red-600/20"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 1.2, color: "#ef4444" }}
                              animate={{ scale: 1, color: "#ffffff" }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="w-8 text-center font-bold text-white"
                            >
                              {item.quantity}
                            </motion.span>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-gray-400 hover:text-white hover:bg-red-600/20"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Subtotal */}
            {state.items.length > 0 && (
              <div className="p-6 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-black">
                {/* Fuel Meter Style Subtotal */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Fuel className="w-5 h-5 text-red-400" />
                      <span className="text-gray-400 font-mono">FUEL TOTAL</span>
                    </div>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.1, color: "#ef4444" }}
                      animate={{ scale: 1, color: "#ffffff" }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-2xl font-black text-white"
                    >
                      ${subtotal.toFixed(2)}
                    </motion.span>
                  </div>
                  
                  {/* Animated Fuel Bar */}
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    {subtotal < 500 ? `$${(500 - subtotal).toFixed(2)} TO FULL TANK` : "TANK FULL - READY TO RACE!"}
                  </p>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 tracking-wider"
                  onClick={onClose}
                >
                  🏁 PROCEED TO CHECKOUT
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
