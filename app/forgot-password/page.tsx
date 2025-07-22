"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Flag, Mail, Lock, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

type Step = "email" | "otp" | "reset" | "success"

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep("otp")
    }, 2000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      if (otp === "123456") {
        // Mock OTP
        setCurrentStep("reset")
      } else {
        alert("Invalid OTP. Try 123456 for demo.")
      }
    }, 1500)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep("success")
    }, 2000)
  }

  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">Forgot Password?</h1>
              <p className="text-gray-400">No worries! Enter your email and we'll send you a reset code.</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
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
                    placeholder="Enter your email address"
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 h-12"
                    required
                  />
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
                    <span>Sending Code...</span>
                  </div>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          </motion.div>
        )

      case "otp":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
              <p className="text-gray-400">We've sent a 6-digit verification code to</p>
              <p className="text-white font-medium">{email}</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Verification Code
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 h-12 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  Demo code: <span className="text-red-400 font-mono">123456</span>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={() => setCurrentStep("email")}
                    className="text-red-400 hover:text-red-300 font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        )

      case "reset":
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-gray-400">Create a new password for your account</p>
            </div>

            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-600 h-12"
                    required
                  />
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
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </motion.div>
        )

      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2 text-green-400">Password Reset!</h1>
              <p className="text-gray-400 mb-8">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
            </div>

            <Link href="/login">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-medium">
                Sign In Now
              </Button>
            </Link>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column - Form */}
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
            </div>

            {renderStep()}

            {/* Back to Login */}
            {currentStep !== "success" && (
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-gray-400 hover:text-red-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            )}
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
          <Image src="/placeholder.svg?height=1080&width=800" alt="F1 Racing Speed" fill className="object-cover" />

          <div className="absolute bottom-12 left-12 right-12 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-red-400 bg-clip-text text-transparent">
                Secure & Fast Recovery
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Get back to racing with our secure password recovery system. Your account security is our priority.
              </p>
              <div className="flex space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Email Verification
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Secure Process
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  Quick Recovery
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
