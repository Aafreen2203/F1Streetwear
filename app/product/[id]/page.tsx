"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ShoppingCart,
  User,
  Search,
  Heart,
  ArrowLeft,
  Plus,
  Minus,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Flag,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useLoading } from "@/contexts/LoadingContext"

const productData = {
  1: {
    id: 1,
    name: "Monaco GP Tee",
    price: 89,
    originalPrice: 109,
    category: "Racing Tees",
    images: [
      "/MonacoGPTee.jpg",
      "/RacingTee1.jpg",
      "/RacingTee2.jpg",
      "/RacingTee3.jpg",
    ],
    badge: "New",
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Red", "Navy"],
    description:
      "Celebrate the glamour of Monaco with this premium racing tee. Featuring authentic F1-inspired graphics and premium cotton blend fabric for ultimate comfort on and off the track.",
    features: [
      "100% Premium Cotton Blend",
      "Official F1-Inspired Design",
      "Pre-shrunk for Perfect Fit",
      "Reinforced Collar and Seams",
      "Machine Washable",
    ],
    inStock: true,
    stockCount: 15,
  },
  2: {
    id: 2,
    name: "Silverstone Jacket",
    price: 299,
    originalPrice: 349,
    category: "Speed Jackets",
    images: [
      "/SilverstoneJacket.jpg",
      "/SpeedJackets.jpg",
      "/RacingTee4.jpg",
      "/RacingTee5.jpg",
    ],
    badge: "Hot",
    rating: 4.9,
    reviews: 89,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Red", "Blue"],
    description:
      "Premium racing jacket inspired by the legendary Silverstone circuit. Built for speed demons who demand style and performance in every thread.",
    features: [
      "Weather Resistant Fabric",
      "Racing-Inspired Design",
      "Multiple Interior Pockets",
      "Reinforced Stitching",
      "Breathable Lining",
    ],
    inStock: true,
    stockCount: 8,
  },
  3: {
    id: 3,
    name: "Championship Cap",
    price: 59,
    originalPrice: 79,
    category: "Victory Caps",
    images: [
      "/ChamCap.jpg",
      "/placeholder.jpg",
      "/placeholder.jpg",
      "/placeholder.jpg",
    ],
    badge: "Limited",
    rating: 4.7,
    reviews: 156,
    sizes: ["One Size"],
    colors: ["Black", "Red", "White", "Navy"],
    description:
      "Show your championship spirit with this premium racing cap. Perfect for track days or street wear with authentic F1-inspired styling.",
    features: [
      "Adjustable Fit",
      "Moisture Wicking Fabric",
      "Embroidered Logo",
      "UV Protection",
      "Machine Washable",
    ],
    inStock: true,
    stockCount: 22,
  },
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { startLoading } = useLoading()
  const { addToCart, state: cartState } = useCart()
  const id = Number.parseInt(params.id as string)
  const product = productData[id as keyof typeof productData]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock search functionality
  const searchResults = searchQuery ? [] : null

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button 
            onClick={() => {
              startLoading()
              router.push('/products')
            }}
            className="bg-red-600 hover:bg-red-700"
          >
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-red-600/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                startLoading()
                router.push('/')
              }}
              className="flex items-center space-x-2 bg-transparent border-0 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                <Flag className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                APEX RACING
              </span>
            </button>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-red-600/20">
                <Heart className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-red-600/20 relative"
                onClick={() => {
                  startLoading()
                  router.push('/cart')
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-xs">{cartState.itemCount}</Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-red-600/20"
                onClick={() => {
                  startLoading()
                  router.push('/login')
                }}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <button 
              onClick={() => {
                startLoading()
                router.push('/')
              }}
              className="hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button 
              onClick={() => {
                startLoading()
                router.push('/products')
              }}
              className="hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
            >
              Products
            </button>
            <span>/</span>
            <button 
              onClick={() => {
                startLoading()
                router.push(`/category/racing-tees`)
              }}
              className="hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
            >
              {product.category}
            </button>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-600"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mt-4">
              {searchResults && searchResults.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900 rounded-lg p-6 text-center"
                >
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found for "{searchQuery}"</h3>
                  <p className="text-gray-400 mb-4">Try different keywords or browse our categories</p>
                  <Button onClick={() => setSearchQuery("")} variant="outline">
                    Clear Search
                  </Button>
                </motion.div>
              ) : null}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/products"
            className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="relative mb-4">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={600}
                  className="w-full h-96 lg:h-[600px] object-cover rounded-2xl"
                />
                {product.badge && (
                  <Badge
                    className={`absolute top-4 left-4 ${
                      product.badge === "New"
                        ? "bg-green-600"
                        : product.badge === "Hot"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                    }`}
                  >
                    {product.badge}
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 ${
                    isWishlisted ? "bg-red-600 text-white" : "bg-black/50 hover:bg-red-600/80"
                  } transition-colors`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-red-600" : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <Badge variant="outline" className="text-red-400 border-red-600 mb-2">
                  {product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 ml-2">({product.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-red-500">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <Badge className="bg-green-600">Save ${product.originalPrice - product.price}</Badge>
                  )}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Size</h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 border rounded-lg text-center transition-colors ${
                        selectedSize === size
                          ? "border-red-600 bg-red-600/20 text-red-400"
                          : "border-gray-700 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-red-600 scale-110" : "border-gray-700 hover:border-gray-500"
                      } ${
                        color === "Black"
                          ? "bg-black"
                          : color === "White"
                            ? "bg-white"
                            : color === "Red"
                              ? "bg-red-600"
                              : color === "Navy"
                                ? "bg-blue-900"
                                : "bg-gray-500"
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-700 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="hover:bg-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-400">{product.stockCount} items left</span>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg"
                  disabled={!selectedSize || !selectedColor}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${product.price * quantity}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                    Buy Now
                  </Button>
                  <Button variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                </div>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gray-800 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-semibold">Free Shipping</p>
                      <p className="text-sm text-gray-400">Orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-semibold">Easy Returns</p>
                      <p className="text-sm text-gray-400">30-day policy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-semibold">Secure Payment</p>
                      <p className="text-sm text-gray-400">SSL encrypted</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
