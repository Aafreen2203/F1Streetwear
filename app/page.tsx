"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Search, Heart, Zap, Trophy, Flag, Play, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { submitToGoogleSheets, isUserAuthenticated, getCurrentUser, logoutUser } from "@/lib/googleSheets"
import { useCart } from "@/contexts/CartContext"
import { CartDrawer } from "@/components/CartDrawer"
import { useRouter } from "next/navigation"
import { useLoading } from "@/contexts/LoadingContext"


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
  const router = useRouter()
  const { startLoading } = useLoading()
  const { state: cartState } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [heroImageBlur, setHeroImageBlur] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const [isLoadingEffect, setIsLoadingEffect] = useState(false)
  const [sparkles, setSparkles] = useState<{ x: number; y: number; id: number }[]>([])

  // Navigation with loading
  const navigateWithLoading = (path: string) => {
    setIsLoadingEffect(true)
    setTimeout(() => setIsLoadingEffect(false), 1000)
    startLoading()
    router.push(path)
  }

  // Check authentication status on component mount
  useEffect(() => {
    setIsAuthenticated(isUserAuthenticated())
    setCurrentUser(getCurrentUser())
  }, [])

  // Custom cursor tracking with mouse trail
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      
      // Add mouse trail
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() }
      setMouseTrail(prev => [...prev.slice(-8), newTrail])
      
      // Add sparkles occasionally
      if (Math.random() < 0.1) {
        const newSparkle = { x: e.clientX + (Math.random() - 0.5) * 40, y: e.clientY + (Math.random() - 0.5) * 40, id: Date.now() }
        setSparkles(prev => [...prev.slice(-5), newSparkle])
      }
    }
    
    window.addEventListener('mousemove', updateCursor)
    return () => window.removeEventListener('mousemove', updateCursor)
  }, [])

  // Clean up old trail and sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setMouseTrail(prev => prev.slice(-5))
      setSparkles(prev => prev.slice(-3))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  const handleLogout = () => {
    logoutUser()
    setIsAuthenticated(false)
    setCurrentUser(null)
    
    // Show logout toast
    const toast = document.createElement('div')
    toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-6 py-4 rounded-xl shadow-lg z-[10000] font-bold tracking-wider'
    toast.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-6 h-6 bg-gray-400 rounded-full animate-pulse"></div>
        <span>🏁 LOGGED OUT SUCCESSFULLY</span>
      </div>
    `
    document.body.appendChild(toast)
    
    // Animate in
    toast.style.transform = 'translateX(100%)'
    setTimeout(() => {
      toast.style.transform = 'translateX(0)'
      toast.style.transition = 'transform 0.5s ease-out'
    }, 100)
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => document.body.removeChild(toast), 500)
    }, 3000)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setIsSubmittingNewsletter(true)
    try {
      await submitToGoogleSheets({
        email: newsletterEmail,
        formType: 'newsletter',
        timestamp: new Date().toISOString(),
        referralSource: 'Website'
      })
      
      // Show success toast with F1 theme
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-4 rounded-xl shadow-lg z-[10000] font-bold tracking-wider'
      toast.innerHTML = `
        <div class="flex items-center space-x-3">
          <div class="w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
          <span>🏁 WELCOME TO THE PIT CREW!</span>
        </div>
      `
      document.body.appendChild(toast)
      
      // Animate in
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => {
        toast.style.transform = 'translateX(0)'
        toast.style.transition = 'transform 0.5s ease-out'
      }, 100)
      
      // Remove after 4 seconds
      setTimeout(() => {
        toast.style.transform = 'translateX(100%)'
        setTimeout(() => document.body.removeChild(toast), 500)
      }, 4000)
      
      setNewsletterEmail("")
    } catch (error) {
      alert("Subscription failed. Please try again.")
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative cursor-none">
      {/* Advanced Custom F1 Cursor with Trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          rotate: isHovering ? 360 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full flex items-center justify-center relative">
          <div className="w-4 h-4 border-2 border-white rounded-full" />
          {/* Cursor glow */}
          <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-50 animate-pulse" />
          {/* Racing stripes */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-spin" />
        </div>
      </motion.div>

      {/* Mouse Trail Effect */}
      {mouseTrail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-3 h-3 bg-red-400 rounded-full pointer-events-none z-[9998] mix-blend-screen"
          style={{
            x: point.x - 6,
            y: point.y - 6,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0.2,
          }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Sparkle Effects */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed w-1 h-1 bg-yellow-300 rounded-full pointer-events-none z-[9997]"
          style={{
            x: sparkle.x,
            y: sparkle.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            rotate: 360,
          }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Global Loading Effect */}
      <AnimatePresence>
        {isLoadingEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9996] pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 animate-pulse" />
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-full bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
   
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

      {/* Enhanced Navigation with Holographic Effect */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-red-500/20 overflow-hidden"
      >
        {/* Holographic Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-purple-500/5 to-blue-500/5 opacity-50" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        
        <div className="container mx-auto px-4 py-4 relative z-10">
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
              {[
                { name: "PRODUCTS", id: "products" },
                { name: "CATEGORIES", id: "categories" },
                { name: "DROPS", id: "drops" },
                { name: "COMMUNITY", id: "community" }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group text-sm font-bold tracking-wider hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
                >
                  {item.name}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 group-hover:w-full transition-all duration-300" />
                </button>
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-red-600/20 relative group"
                onClick={() => setIsCartOpen(true)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-xs animate-pulse flex items-center justify-center">
                  {cartState.itemCount}
                </Badge>
                <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
              </Button>
              
              {/* User Authentication */}
              {isAuthenticated ? (
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-red-600/20 relative group"
                    onClick={handleLogout}
                    title={`Logged in as ${currentUser}`}
                  >
                    <User className="w-5 h-5 text-green-400" />
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
                  </Button>
                  {/* User indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-red-600/20 relative group cursor-pointer"
                  onClick={() => navigateWithLoading('/login')}
                >
                  <User className="w-5 h-5" />
                  <div className="absolute inset-0 bg-red-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setHeroImageBlur(true)}
        onMouseLeave={() => setHeroImageBlur(false)}
      >
        {/* F1 Racing Background Image with Motion Blur */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1652090379496-4219a00c8ebf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHNlYXJjaHwxfHxGMSUyMHJhY2luZ3xlbnwwfHx8fDE3NTMyMDY1ODl8MA&ixlib=rb-4.1.0&q=85"
            alt="F1 Racing Background"
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              filter: heroImageBlur ? 'blur(2px) brightness(1.2)' : 'blur(0px) brightness(1)',
              transform: heroImageBlur ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          {/* Energy Grid Effect */}
          <AnimatePresence>
            {heroImageBlur && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-5"
              >
                {/* Grid Lines */}
                <div className="absolute inset-0">
                  {/* Vertical Lines */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={`v-${i}`}
                      className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-red-400/60 to-transparent"
                      style={{ left: `${10 + i * 12}%` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                  
                  {/* Horizontal Lines */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`h-${i}`}
                      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400/60 to-transparent"
                      style={{ top: `${15 + i * 15}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.3 + i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                {/* Energy Pulses */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`pulse-${i}`}
                    className="absolute w-3 h-3 bg-red-400 rounded-full shadow-lg"
                    style={{
                      left: `${10 + (i % 4) * 25}%`,
                      top: `${20 + Math.floor(i / 4) * 20}%`,
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
                    }}
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                      opacity: [0.3, 1, 0.3],
                      boxShadow: [
                        '0 0 10px rgba(239, 68, 68, 0.4)',
                        '0 0 30px rgba(239, 68, 68, 1)',
                        '0 0 10px rgba(239, 68, 68, 0.4)'
                      ],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}

                {/* Circuit Connections */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`circuit-${i}`}
                    className="absolute h-0.5 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-400"
                    style={{
                      left: `${15 + (i % 3) * 30}%`,
                      top: `${25 + Math.floor(i / 3) * 25}%`,
                      width: '20%',
                      transform: `rotate(${Math.random() * 60 - 30}deg)`,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.5, 1, 0],
                      scaleX: [0, 1, 1, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Button
                  size="lg"
                  onClick={() => navigateWithLoading('/products')}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-12 py-4 text-lg font-bold tracking-wider border-0 relative group overflow-hidden cursor-pointer"
                >
                  <Trophy className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">ENTER THE RACE</span>
                  
                  {/* Multiple overlay effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ 
                      x: ['100%', '200%'],
                      transition: { 
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-red-500/30 to-orange-600/30"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  
                  {/* Particle burst on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    whileHover={{
                      background: [
                        'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0) 0%, rgba(239, 68, 68, 0) 100%)',
                        'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0) 70%)',
                        'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0) 0%, rgba(239, 68, 68, 0) 100%)',
                      ],
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Scroll Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center space-y-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, 10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-red-500"
              />
            ))}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ 
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="text-red-400 text-xs font-mono tracking-wider mt-2"
            >
              SCROLL FOR MORE
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* View All Products Section */}
      <motion.section 
        id="products"
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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Button
              size="lg"
              onClick={() => navigateWithLoading('/products')}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-16 py-6 text-xl font-bold tracking-wider border-0 relative group overflow-hidden cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              VIEW ALL PRODUCTS
                
                {/* Racing Line Animation */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ 
                    x: ['100%', '200%'],
                    transition: { 
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }}
                />
                
                {/* Engine Rev Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-red-500/20 to-orange-600/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.1, 1.2],
                    transition: { 
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }}
                />
              </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section id="categories" className="py-32 relative">
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
      <section id="drops" className="py-32 relative">
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
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
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

                  {/* Tire Skid Lines Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{
                          top: `${20 + i * 8}%`,
                          width: '60%',
                          right: '10%',
                          transform: `rotate(${-15 + Math.random() * 10}deg)`,
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ 
                          scaleX: 1, 
                          opacity: [0, 1, 0.5],
                          transition: { 
                            duration: 0.8,
                            delay: i * 0.1,
                          }
                        }}
                        viewport={{ once: false }}
                      />
                    ))}
                  </motion.div>

                  {/* Exhaust Smoke Effect */}
                  <motion.div
                    className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100"
                    initial={false}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-gray-400/20 rounded-full blur-sm"
                        style={{
                          left: i * 8,
                          bottom: i * 4,
                        }}
                        animate={{
                          y: [0, -30, -60],
                          x: [0, Math.random() * 20 - 10],
                          opacity: [0, 0.6, 0],
                          scale: [0.5, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.div>

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

                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 tracking-wider border-0 relative group overflow-hidden"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">ACQUIRE NOW</span>
                    
                    {/* Enhanced button effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-red-500/30 to-orange-600/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.2, 1],
                        transition: {
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" 
                    />
                    
                    {/* Racing stripe effect */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="community" className="py-32 relative">
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

      {/* Enhanced Footer */}
      <footer className="bg-black border-t border-red-500/20 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        
        {/* Floating particles in footer */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`footer-particle-${i}`}
            className="absolute w-1 h-1 bg-red-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

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

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Action Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <Button
            size="lg"
            onClick={() => navigateWithLoading('/products')}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white border-0 shadow-2xl relative overflow-hidden group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ShoppingCart className="w-6 h-6" />
            
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            
            {/* Notification badge */}
            <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yellow-500 text-black text-xs font-bold animate-bounce">
              {cartState.itemCount}
            </Badge>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
