"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Search, Heart, Zap, Trophy, Flag, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { submitToGoogleSheets } from "@/lib/googleSheets"


const categories = [
  {
    id: 1,
    name: "RACING TEES",
    slug: "racing-tees",
    image: "/RacingTee1.jpg",
    count: 24,
    color: "from-red-600 to-red-800",
  },
  {
    id: 2,
    name: "SPEED JACKETS",
    slug: "speed-jackets",
    image: "/SpeedJackets.jpg",
    count: 18,
    color: "from-orange-600 to-red-600",
  },
  {
    id: 3,
    name: "VICTORY CAPS",
    slug: "victory-caps",
    image: "/ChamCap.jpg",
    count: 32,
    color: "from-yellow-600 to-orange-600",
  },
  {
    id: 4,
    name: "TRACK GEAR",
    slug: "track-accessories",
    image: "/TrackGear.jpg",
    count: 45,
    color: "from-blue-600 to-purple-600",
  },
  {
    id: 5,
    name: "LIMITED DROPS",
    slug: "limited-edition",
    image: "/LimitedEditions.jpg",
    count: 8,
    color: "from-purple-600 to-pink-600",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "MONACO VICTORY",
    price: 89,
    image: "/MonacoGPTee.jpg",
    badge: "NEW DROP",
    rarity: "LEGENDARY",
  },
  {
    id: 2,
    name: "SILVERSTONE FURY",
    price: 299,
    image: "/SilverstoneJacket.jpg",
    badge: "HOT",
    rarity: "EPIC",
  },
  {
    id: 3,
    name: "CHAMPIONSHIP CROWN",
    price: 59,
    image: "/ChamCap.jpg",
    badge: "LIMITED",
    rarity: "RARE",
  },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setIsSubmittingNewsletter(true)
    try {
      await submitToGoogleSheets({
        email: newsletterEmail,
        formType: 'newsletter'
      })
      alert("Successfully subscribed! Data saved to Google Sheets.")
      setNewsletterEmail("")
    } catch (error) {
      alert("Subscription failed. Please try again.")
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
   
      {/* Animated Background Particles */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900/20" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-red-500/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center transform rotate-45">
                  <Flag className="w-5 h-5 text-white transform -rotate-45" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-lg blur-lg opacity-50 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                  APEX
                </span>
                <span className="text-xs text-red-400 font-mono tracking-widest">RACING</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["PRODUCTS", "CATEGORIES", "DROPS", "COMMUNITY"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative group text-sm font-bold tracking-wider hover:text-red-400 transition-colors"
                >
                  {item}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-red-600/20 relative group">
                <Search className="w-5 h-5" />
                <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-red-600/20 relative group">
                <Heart className="w-5 h-5" />
                <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="hover:bg-red-600/20 relative group">
                  <ShoppingCart className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-xs animate-pulse">
                    3
                  </Badge>
                  <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hover:bg-red-600/20 relative group">
                  <User className="w-5 h-5" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* F1 Racing Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1652090379496-4219a00c8ebf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHNlYXJjaHwxfHxGMSUyMHJhY2luZ3xlbnwwfHx8fDE3NTMyMDY1ODl8MA&ixlib=rb-4.1.0&q=85"
            alt="F1 Racing Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-10" />

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20 z-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating Smoke Particles */}
        <div className="absolute inset-0 z-14 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`smoke-${i}`}
              className="absolute w-2 h-2 bg-gray-300/20 rounded-full blur-sm"
              style={{
                right: `${Math.random() * 100}%`,
                top: `${50 + Math.random() * 40}%`,
              }}
              animate={{
                y: [0, -100, -200, -300],
                x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
                opacity: [0, 0.8, 0.5, 0],
                scale: [0.5, 1, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 8,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 8,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Heat Distortion Effect */}
        <div className="absolute inset-0 z-11 pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-500/10 via-orange-400/5 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.5, 0.7],
              scaleY: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-8"
            >
              <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-2 text-sm font-bold tracking-wider border-0 relative">
                <Zap className="w-4 h-4 mr-2" />
                SEASON 2024 • LIVE NOW
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 blur-lg opacity-50 animate-pulse" />
              </Badge>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none"
            >
              <span className="block bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                VICTORY
              </span>
              <span className="block text-2xl md:text-4xl lg:text-5xl font-mono text-red-400 tracking-[0.2em] mt-2">
                AWAITS
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light tracking-wide"
            >
              PREMIUM F1-INSPIRED STREETWEAR FOR CHAMPIONS WHO DOMINATE THE STREETS
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-12 py-4 text-lg font-bold tracking-wider border-0 relative group overflow-hidden"
                >
                  <Trophy className="w-6 h-6 mr-3" />
                  ENTER THE RACE
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-red-500 text-red-400 hover:bg-red-500/10 px-12 py-4 text-lg font-bold tracking-wider bg-transparent relative group overflow-hidden"
              >
                <Play className="w-6 h-6 mr-3" />
                WATCH TRAILER
                <div className="absolute inset-0 bg-red-500/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-8 h-12 border-2 border-red-500/50 rounded-full flex justify-center relative"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-4 bg-gradient-to-b from-red-500 to-transparent rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* View All Products Section */}
      <motion.section 
        className="py-16 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/products">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-16 py-6 text-xl font-bold tracking-wider border-0 relative group overflow-hidden"
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                VIEW ALL PRODUCTS
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-red-600/20 text-red-400 border border-red-500/30 mb-6 px-4 py-2 font-mono tracking-wider">
              COLLECTION STATUS
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              RACING ARSENAL
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              GEAR UP WITH CHAMPIONSHIP-GRADE STREETWEAR DESIGNED FOR SPEED DEMONS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-red-500/50 transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link href={index === 0 ? `/category/${category.slug}` : "#"}>
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-40 transition-opacity`}
                    />

                    {/* Holographic Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <Badge className="absolute top-4 right-4 bg-black/80 text-red-400 border border-red-500/30 font-mono">
                      {category.count} ITEMS
                    </Badge>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-black mb-3 group-hover:text-red-400 transition-colors tracking-wider">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-mono tracking-wider">
                      {index === 0 ? "AVAILABLE NOW" : "COMING SOON"}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full bg-gray-800 rounded-full h-1">
                      <motion.div
                        className={`h-1 rounded-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-black to-red-900/10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-gradient-to-r from-red-600 to-red-800 text-white mb-6 px-4 py-2 font-mono tracking-wider border-0">
              LEGENDARY DROPS
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              HALL OF FAME
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              EXCLUSIVE CHAMPIONSHIP PIECES FOR THE ULTIMATE RACING ELITE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -20, rotateX: 10 }}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  {/* Rarity Glow */}
                  <div
                    className={`absolute inset-0 ${
                      product.rarity === "LEGENDARY"
                        ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20"
                        : product.rarity === "EPIC"
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                          : "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <Badge
                    className={`absolute top-4 left-4 ${
                      product.badge === "NEW DROP"
                        ? "bg-green-600"
                        : product.badge === "HOT"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                    } text-white font-bold px-3 py-1`}
                  >
                    {product.badge}
                  </Badge>

                  <Badge
                    className={`absolute top-4 right-4 ${
                      product.rarity === "LEGENDARY"
                        ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                        : product.rarity === "EPIC"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600"
                    } text-white font-mono text-xs px-2 py-1`}
                  >
                    {product.rarity}
                  </Badge>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-4 right-4 bg-black/80 hover:bg-red-600/80 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-3 group-hover:text-red-400 transition-colors tracking-wider">
                    {product.name}
                  </h3>
                  <p className="text-3xl font-black text-red-500 mb-6">${product.price}</p>

                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 tracking-wider border-0 relative group overflow-hidden">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    ACQUIRE NOW
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-black to-red-900/20" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="bg-red-600/20 text-red-400 border border-red-500/30 mb-8 px-6 py-3 font-mono tracking-wider text-lg">
              JOIN THE ELITE
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
              CHAMPIONSHIP ACCESS
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
              GET EXCLUSIVE ACCESS TO LIMITED DROPS, RACING INSIGHTS, AND VIP CHAMPIONSHIP DEALS
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 px-6 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 font-mono tracking-wider backdrop-blur-sm"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmittingNewsletter}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-4 font-bold tracking-wider border-0 rounded-xl disabled:opacity-50"
              >
                {isSubmittingNewsletter ? "JOINING..." : "ACTIVATE"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/20 py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center transform rotate-45">
                    <Flag className="w-6 h-6 text-white transform -rotate-45" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-lg blur-lg opacity-50" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                    APEX
                  </span>
                  <span className="text-sm text-red-400 font-mono tracking-widest">RACING</span>
                </div>
              </div>
              <p className="text-gray-400 font-light leading-relaxed">
                PREMIUM F1-INSPIRED STREETWEAR FOR RACING CHAMPIONS WORLDWIDE.
              </p>
            </div>

            {[
              { title: "ARSENAL", items: ["ALL PRODUCTS", "RACING TEES", "SPEED JACKETS", "VICTORY CAPS"] },
              { title: "SUPPORT", items: ["SIZE GUIDE", "SHIPPING INFO", "RETURNS", "CONTACT"] },
              { title: "CONNECT", items: ["INSTAGRAM", "TWITTER", "YOUTUBE", "DISCORD"] },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-black mb-6 text-white tracking-wider text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-red-400 transition-colors font-mono tracking-wide text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400 font-mono tracking-wider">
              © 2024 APEX RACING. ALL RIGHTS RESERVED. BUILT FOR SPEED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
