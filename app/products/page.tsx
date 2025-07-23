"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, User, Search, Heart, Grid, List, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useLoading } from "@/contexts/LoadingContext"

const products = [
  {
    id: 1,
    name: "Monaco GP Tee",
    price: 89,
    category: "Racing Tees",
    image: "/MonacoGPTee.jpg",
    badge: "New",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Silverstone Jacket",
    price: 299,
    category: "Speed Jackets",
    image: "/SilverstoneJacket.jpg",
    badge: "Hot",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Championship Cap",
    price: 59,
    category: "Victory Caps",
    image: "/ChamCap.jpg",
    badge: "Limited",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Pit Crew Hoodie",
    price: 149,
    category: "Racing Tees",
    image: "/PitCrewHoodie.jpg",
    badge: "",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Track Day Shorts",
    price: 79,
    category: "Track Accessories",
    image: "/TrackDayShorts.jpg",
    badge: "New",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Victory Polo",
    price: 119,
    category: "Racing Tees",
    image: "/VictoryPolo.jpg",
    badge: "",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Speed Demon Tee",
    price: 69,
    category: "Racing Tees",
    image: "/SpeedDemonTee.jpg",
    badge: "Hot",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Racing Gloves",
    price: 89,
    category: "Track Accessories",
    image: "/RacingGloves.jpg",
    badge: "Limited",
    rating: 4.9,
  },
]

export default function ProductsPage() {
  const router = useRouter()
  const { startLoading } = useLoading()
  const { addToCart, state: cartState } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchFocused, setSearchFocused] = useState(false)

  // Enhanced fuzzy search
  const fuzzySearch = (text: string, searchTerm: string) => {
    if (!searchTerm) return true
    
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

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        fuzzySearch(product.name, searchQuery) ||
        fuzzySearch(product.category, searchQuery),
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [searchQuery, sortBy])

  const suggestedProducts = searchQuery && filteredProducts.length === 0 
    ? products.slice(0, 3) // Show first 3 as suggestions
    : []

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
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
                className="hover:bg-red-600/20 relative cursor-pointer"
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
                className="hover:bg-red-600/20 cursor-pointer"
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
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-red-900/20 to-black">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                All Products
              </h1>
              <p className="text-xl text-gray-400">Discover our complete collection of F1-inspired streetwear</p>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="🏁 Search F1 gear..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className={`pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 ${
                      searchFocused ? 'border-red-500 shadow-lg shadow-red-500/20' : 'focus:border-red-600'
                    }`}
                  />
                  {searchFocused && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-b-lg p-2 mt-1 z-10"
                    >
                      <p className="text-xs text-gray-400 font-mono">
                        💡 Try: "Monaco", "Racing", "Cap", etc.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-red-600"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>

                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-700"}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-700"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-center py-20"
              >
                {/* F1-Themed Empty State */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-full opacity-20 animate-pulse" />
                  <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-red-500 rounded-full border-t-transparent"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="w-8 h-8 text-red-400" />
                  </div>
                </div>

                <motion.h3 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-black mb-4 text-red-400 tracking-wider"
                >
                  🏁 TIRES SCREECH TO A HALT
                </motion.h3>
                
                <p className="text-xl text-gray-300 mb-6 font-mono">
                  NO RESULTS FOUND — TRY ANOTHER GEAR?
                </p>

                {suggestedProducts.length > 0 && (
                  <div className="mb-8">
                    <p className="text-gray-400 mb-4 font-mono tracking-wider">
                      🔧 SUGGESTED GEAR FROM THE PIT:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {suggestedProducts.map((product) => (
                        <Button
                          key={product.id}
                          variant="outline"
                          size="sm"
                          className="border-red-600/50 text-red-400 hover:bg-red-600/10"
                          onClick={() => setSearchQuery(product.name)}
                        >
                          {product.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => setSearchQuery("")} 
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 font-bold tracking-wider"
                  >
                    🏎️ RESTART ENGINE
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-red-600/50 text-red-400 hover:bg-red-600/10"
                  >
                    🏁 BROWSE ALL GEAR
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div
                className={`grid gap-8 ${
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/50 transition-all duration-300 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "h-80"}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                          className="absolute top-4 right-4 bg-black/50 hover:bg-red-600/80 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                            {product.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-400">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-red-500 mb-4">${product.price}</p>
                        <Button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
