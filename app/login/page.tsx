"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft, Flag, Mail, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard or previous page
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Login Form */}
        <div className="flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <Link href="/" className="inline-flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  APEX RACING
                </span>
              </Link>

              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your racing account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 h-12 bg-transparent"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 h-12 bg-transparent"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  Twitter
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                  Sign up for free
                </Link>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link href="/" className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block relative bg-gradient-to-br from-red-900/20 to-black"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          <Image
            src="/Login.jpg"
            alt="F1 Racing Experience"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-12 left-12 right-12 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                Join the Racing Elite
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Access exclusive F1-inspired collections, early drops, and championship deals.
              </p>
              <div className="flex space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Exclusive Access
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Early Drops
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  VIP Support
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
