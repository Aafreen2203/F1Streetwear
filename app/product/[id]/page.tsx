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
  const [searchFocused, setSearchFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Enhanced search functionality with all products
  const allProducts = [
    { id: 1, name: "Monaco GP Tee", category: "Racing Tees", price: 89 },
    { id: 2, name: "Silverstone Jacket", category: "Speed Jackets", price: 299 },
    { id: 3, name: "Championship Cap", category: "Victory Caps", price: 59 },
    { id: 4, name: "Pit Crew Hoodie", category: "Racing Tees", price: 149 },
    { id: 5, name: "Track Day Shorts", category: "Track Accessories", price: 79 },
    { id: 6, name: "Victory Polo", category: "Racing Tees", price: 119 },
    { id: 7, name: "Speed Demon Tee", category: "Racing Tees", price: 69 },
    { id: 8, name: "Racing Gloves", category: "Track Accessories", price: 89 },
  ]

  // Fuzzy search function
  const fuzzySearch = (text: string, searchTerm: string) => {
    if (!searchTerm) return false
    
    const searchLower = searchTerm.toLowerCase()
    const textLower = text.toLowerCase()
    
    // Exact match
    if (textLower.includes(searchLower)) return true
    
    // Fuzzy match - check if characters appear in order
    let searchIndex = 0
    for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
      if (textLower[i] === searchLower[searchIndex]) {
        searchIndex++
      }
    }
    return searchIndex === searchLower.length
  }

  const searchResults = searchQuery ? allProducts.filter(
    (product) =>
      fuzzySearch(product.name, searchQuery) ||
      fuzzySearch(product.category, searchQuery)
  ).slice(0, 5) : null

  const handleAddToCart = () => {
    try {
      setIsLoading(true)
      setError(null)

      // Validation
      if (!selectedSize && product.sizes.length > 1) {
        throw new Error("⚠️ GEAR CHECK: Please select a size before adding to your racing arsenal!")
      }
      if (!selectedColor && product.colors.length > 1) {
        throw new Error("🎨 LIVERY SELECTION: Choose your championship colors!")
      }
      if (quantity <= 0) {
        throw new Error("📊 QUANTITY ERROR: Invalid quantity selected!")
      }
      if (!product.inStock) {
        throw new Error("🏁 SOLD OUT: This champion's gear is currently out of stock!")
      }

      // Simulate loading
      setTimeout(() => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          category: product.category,
          size: selectedSize,
          color: selectedColor,
          quantity,
        })
        
        // Success toast
        const toast = document.createElement('div')
        toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-4 rounded-xl shadow-lg z-[10000] font-bold tracking-wider'
        toast.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            <span>🏁 ADDED TO RACING ARSENAL!</span>
          </div>
        `
        document.body.appendChild(toast)
        
        setTimeout(() => {
          toast.style.transform = 'translateX(100%)'
          toast.style.transition = 'transform 0.5s ease-out'
          setTimeout(() => document.body.removeChild(toast), 500)
        }, 3000)
        
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "❌ SYSTEM ERROR: Unable to add item to cart")
      setIsLoading(false)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Navigation for error state */}
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-red-600/20"
                  onClick={() => {
                    startLoading()
                    router.push('/products')
                  }}
                >
                  <Search className="w-5 h-5" />
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
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced 404 Error State */}
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4 max-w-2xl mx-auto"
          >
            {/* F1-Themed 404 Visual */}
            <div className="relative w-48 h-48 mx-auto mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-8 bg-gray-800 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-8 border-red-500 rounded-full border-t-transparent"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-red-400">404</span>
              </div>
            </div>

            <motion.h1 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black mb-6 text-red-400 tracking-wider"
            >
              🏁 OFF THE RACING LINE!
            </motion.h1>
            
            <p className="text-xl text-gray-300 mb-8 font-mono">
              CHAMPIONSHIP GEAR NOT FOUND — THIS PRODUCT CRASHED OUT OF THE RACE
            </p>

            <div className="bg-gray-900/50 border border-red-600/30 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">!</span>
                </div>
                <span className="text-red-400 font-mono font-bold">RACE CONTROL ALERT</span>
              </div>
              <p className="text-gray-300 text-left">
                Product ID <span className="text-red-400 font-mono">#{id}</span> is not in our current racing arsenal. 
                It may have been retired from this season or moved to a different racing category.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => {
                    startLoading()
                    router.push('/products')
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 font-bold tracking-wider px-8 py-3"
                >
                  🏎️ BACK TO THE GRID
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  onClick={() => {
                    startLoading()
                    router.push('/')
                  }}
                  className="border-red-600/50 text-red-400 hover:bg-red-600/10 font-bold tracking-wider px-8 py-3"
                >
                  🏁 RACE START (HOME)
                </Button>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm font-mono">
                LOOKING FOR SPECIFIC GEAR? TRY OUR CHAMPIONSHIP SEARCH ABOVE
              </p>
            </div>
          </motion.div>
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
              {/* Search Input */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="🏁 Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className={`w-64 pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 ${
                    searchFocused ? 'border-red-500 shadow-lg shadow-red-500/20' : 'focus:border-red-600'
                  }`}
                />
                {searchFocused && searchResults && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-b-lg mt-1 z-50 max-h-80 overflow-y-auto"
                  >
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        <p className="text-xs text-gray-400 font-mono mb-2 px-2">
                          🏎️ SEARCH RESULTS ({searchResults.length})
                        </p>
                        {searchResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => {
                              startLoading()
                              router.push(`/product/${result.id}`)
                            }}
                            className="w-full text-left p-3 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-white font-medium group-hover:text-red-400 transition-colors">
                                {result.name}
                              </p>
                              <p className="text-xs text-gray-400">{result.category}</p>
                            </div>
                            <span className="text-red-400 font-bold">${result.price}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-gray-400 font-mono text-sm">
                          🏁 NO MATCHES FOUND
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Try "Monaco", "Racing", "Cap", etc.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Mobile Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-red-600/20 md:hidden"
                onClick={() => {
                  startLoading()
                  router.push('/products')
                }}
              >
                <Search className="w-5 h-5" />
              </Button>

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

              {/* Validation Feedback */}
              <div className="space-y-3">
                {!selectedSize && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">🏁</span>
                      <p className="text-yellow-400 font-mono text-sm">
                        SELECT SIZE: Choose your racing fit to continue
                      </p>
                    </div>
                  </motion.div>
                )}
                
                {!selectedColor && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-blue-900/20 border border-blue-600/50 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">🎨</span>
                      <p className="text-blue-400 font-mono text-sm">
                        PICK COLOR: Select your team colors to proceed
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 mb-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                      <p className="text-red-400 font-mono text-sm">{error}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setError(null)}
                      className="mt-2 text-red-400 hover:text-red-300 p-0 h-auto font-mono text-xs"
                    >
                      ✕ DISMISS
                    </Button>
                  </motion.div>
                )}

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isLoading || !product.inStock}
                  className={`w-full py-4 text-lg font-bold tracking-wider transition-all duration-300 ${
                    !product.inStock 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : isLoading
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25'
                  } text-white relative overflow-hidden group`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      ADDING TO ARSENAL...
                    </>
                  ) : !product.inStock ? (
                    <>
                      🏁 SOLD OUT
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      ADD TO RACING ARSENAL - ${product.price * quantity}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ 
                          x: ['100%', '200%'],
                          transition: { duration: 0.6, ease: "easeOut" }
                        }}
                      />
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-gray-700 hover:bg-gray-800 bg-transparent hover:border-red-600/50 transition-all duration-300 font-bold tracking-wider"
                    disabled={isLoading || !product.inStock}
                  >
                    🚀 BUY NOW
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`border-gray-700 hover:bg-gray-800 bg-transparent transition-all duration-300 font-bold tracking-wider ${
                      isWishlisted ? 'border-red-600 text-red-400' : 'hover:border-red-600/50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                    {isWishlisted ? 'FAVORITED' : 'FAVORITE'}
                  </Button>
                </div>

                {/* Stock Warning */}
                {product.stockCount <= 5 && product.inStock && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">⚠️</span>
                      <p className="text-yellow-400 font-mono text-sm">
                        RACE ALERT: Only {product.stockCount} left in stock!
                      </p>
                    </div>
                  </motion.div>
                )}
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
