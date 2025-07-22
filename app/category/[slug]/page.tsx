"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, User, Search, Heart, ArrowLeft, Grid, List, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"

const categoryProducts = {
  "racing-tees": [
    {
      id: 1,
      name: "Monaco GP Tee",
      price: 89,
      image: "/placeholder.svg?height=400&width=300",
      badge: "New",
      rating: 4.8,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
      name: "Pit Crew Hoodie",
      price: 149,
      image: "/placeholder.svg?height=400&width=300",
      badge: "",
      rating: 4.6,
      sizes: ["M", "L", "XL", "XXL"],
    },
    {
      id: 6,
      name: "Victory Polo",
      price: 119,
      image: "/placeholder.svg?height=400&width=300",
      badge: "",
      rating: 4.8,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 7,
      name: "Speed Demon Tee",
      price: 69,
      image: "/placeholder.svg?height=400&width=300",
      badge: "Hot",
      rating: 4.7,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 9,
      name: "Championship Long Sleeve",
      price: 99,
      image: "/placeholder.svg?height=400&width=300",
      badge: "Limited",
      rating: 4.9,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 10,
      name: "Track Master Tee",
      price: 79,
      image: "/placeholder.svg?height=400&width=300",
      badge: "",
      rating: 4.5,
      sizes: ["M", "L", "XL"],
    },
  ],
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [filteredProducts, setFilteredProducts] = useState(
    categoryProducts[slug as keyof typeof categoryProducts] || [],
  )

  const categoryName = slug === "racing-tees" ? "Racing Tees" : "Category"

  useEffect(() => {
    const products = categoryProducts[slug as keyof typeof categoryProducts] || []
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
  }, [searchQuery, sortBy, slug])

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
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="hover:bg-red-600/20 relative">
                  <ShoppingCart className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-xs">3</Badge>
                </Button>
              </Link>
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
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">{categoryName}</span>
          </div>
        </div>

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
                  href="/"
                  className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                  {categoryName}
                </h1>
                <p className="text-xl text-gray-400">
                  Premium F1-inspired {categoryName.toLowerCase()} for racing enthusiasts
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-900 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={`Search ${categoryName.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-red-600"
                  />
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
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-300">No products found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery ? `No products match "${searchQuery}"` : "No products available in this category"}
                </p>
                {searchQuery && (
                  <Button onClick={() => setSearchQuery("")} className="bg-red-600 hover:bg-red-700">
                    Clear Search
                  </Button>
                )}
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
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-400">{product.rating}</span>
                          </div>
                          <div className="flex space-x-1">
                            {product.sizes.slice(0, 3).map((size) => (
                              <Badge key={size} variant="outline" className="text-xs text-gray-400 border-gray-600">
                                {size}
                              </Badge>
                            ))}
                            {product.sizes.length > 3 && (
                              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                +{product.sizes.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-2xl font-bold text-red-500 mb-4">${product.price}</p>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Add to Cart</Button>
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
