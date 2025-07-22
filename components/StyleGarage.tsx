"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, Palette, Settings, Zap, Star, Crown } from "lucide-react"
import Image from "next/image"

interface GarageItem {
  id: string
  name: string
  category: "helmet" | "suit" | "gloves" | "accessories"
  image: string
  price: number
  rarity: "common" | "rare" | "epic" | "legendary"
  stats: {
    speed: number
    style: number
    aerodynamics: number
    prestige: number
  }
}

const garageItems: GarageItem[] = [
  {
    id: "helmet-monaco",
    name: "Monaco Champion Helmet",
    category: "helmet",
    image: "/ChamCap.jpg",
    price: 299,
    rarity: "legendary",
    stats: { speed: 95, style: 100, aerodynamics: 90, prestige: 100 }
  },
  {
    id: "suit-silverstone",
    name: "Silverstone Racing Suit",
    category: "suit", 
    image: "/SilverstoneJacket.jpg",
    price: 499,
    rarity: "epic",
    stats: { speed: 85, style: 90, aerodynamics: 95, prestige: 88 }
  },
  {
    id: "gloves-pit",
    name: "Pit Crew Pro Gloves",
    category: "gloves",
    image: "/RacingGloves.jpg", 
    price: 149,
    rarity: "rare",
    stats: { speed: 70, style: 75, aerodynamics: 60, prestige: 65 }
  }
]

const rarityColors = {
  common: "from-gray-500 to-gray-600",
  rare: "from-blue-500 to-blue-600", 
  epic: "from-purple-500 to-purple-600",
  legendary: "from-yellow-500 to-orange-600"
}

const categoryIcons = {
  helmet: "🏎️",
  suit: "🏁", 
  gloves: "🧤",
  accessories: "⚡"
}

export function StyleGarage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedItems, setSelectedItems] = useState<{[key: string]: GarageItem}>({})
  const [isCustomizing, setIsCustomizing] = useState(false)

  const categories = ["all", "helmet", "suit", "gloves", "accessories"]
  
  const filteredItems = selectedCategory === "all" 
    ? garageItems 
    : garageItems.filter(item => item.category === selectedCategory)

  const totalStats = Object.values(selectedItems).reduce((acc, item) => {
    acc.speed += item.stats.speed
    acc.style += item.stats.style 
    acc.aerodynamics += item.stats.aerodynamics
    acc.prestige += item.stats.prestige
    return acc
  }, { speed: 0, style: 0, aerodynamics: 0, prestige: 0 })

  const maxPossibleStats = Object.keys(selectedItems).length * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-900/20 to-gray-900 border-b border-red-500/30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent" />
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent tracking-wider">
                  STYLE GARAGE
                </h1>
                <p className="text-red-400 font-mono tracking-wider">CUSTOMIZE YOUR RACING PERSONA</p>
              </div>
            </div>
            
            <Badge className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/30 px-4 py-2 font-mono">
              🚧 PROTOTYPE FEATURE - COMING SOON
            </Badge>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-400">🏁 CATEGORIES</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category 
                        ? "bg-gradient-to-r from-red-600 to-red-800" 
                        : "hover:bg-red-600/20"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span className="mr-2">
                      {category === "all" ? "🏎️" : categoryIcons[category as keyof typeof categoryIcons]}
                    </span>
                    {category.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats Display */}
            {Object.keys(selectedItems).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-red-500/30"
              >
                <h4 className="text-lg font-bold mb-4 text-red-400">⚡ PERFORMANCE STATS</h4>
                <div className="space-y-3">
                  {Object.entries(totalStats).map(([stat, value]) => (
                    <div key={stat} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-mono">{stat}</span>
                        <span className="text-red-400 font-bold">{value}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${rarityColors.legendary}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(value / (maxPossibleStats || 1)) * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Items Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                {selectedCategory === "all" ? "ALL GEAR" : selectedCategory.toUpperCase()}
              </h3>
              <Button
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-600/10"
                onClick={() => setIsCustomizing(!isCustomizing)}
              >
                <Settings className="w-4 h-4 mr-2" />
                {isCustomizing ? "FINISH" : "CUSTOMIZE"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, rotateY: 5 }}
                    className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedItems[item.category] 
                        ? "border-red-500 shadow-lg shadow-red-500/20" 
                        : "border-gray-700 hover:border-red-500/50"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Rarity Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors[item.rarity]} opacity-10 group-hover:opacity-20 transition-opacity`} />

                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Rarity Badge */}
                      <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${rarityColors[item.rarity]} text-white font-bold capitalize`}>
                        {item.rarity === "legendary" && <Crown className="w-3 h-3 mr-1" />}
                        {item.rarity === "epic" && <Star className="w-3 h-3 mr-1" />}
                        {item.rarity === "rare" && <Zap className="w-3 h-3 mr-1" />}
                        {item.rarity}
                      </Badge>

                      {/* Selection Indicator */}
                      {selectedItems[item.category]?.id === item.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-red-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-black text-red-500 mb-4">${item.price}</p>

                      {/* Mini Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                        {Object.entries(item.stats).map(([stat, value]) => (
                          <div key={stat} className="flex justify-between">
                            <span className="text-gray-400 capitalize">{stat.slice(0, 4)}</span>
                            <span className="text-white font-bold">{value}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 font-bold"
                        onClick={() => {
                          setSelectedItems(prev => ({
                            ...prev,
                            [item.category]: item
                          }))
                        }}
                        disabled={!isCustomizing}
                      >
                        {selectedItems[item.category]?.id === item.id ? "✓ EQUIPPED" : "EQUIP GEAR"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Preview Section */}
            {Object.keys(selectedItems).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-red-500/30"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-red-400">
                  🏁 YOUR RACING CONFIGURATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.values(selectedItems).map((item) => (
                    <div key={item.id} className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400 capitalize">{item.category}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 font-black text-lg px-8"
                    disabled
                  >
                    🏆 SAVE CONFIGURATION (COMING SOON)
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
