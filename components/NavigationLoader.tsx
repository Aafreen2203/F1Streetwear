"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '@/contexts/LoadingContext'

export default function NavigationLoader() {
  const { isLoading } = useLoading()

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* F1 Car Loading Animation */}
            <div className="relative">
              <motion.div
                animate={{ x: [-30, 30, -30] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-5xl filter drop-shadow-lg"
              >
                🏎️
              </motion.div>
              {/* Racing line effect */}
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              />
            </div>
            
            {/* Dots Loading Animation */}
            <div className="flex space-x-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                />
              ))}
            </div>
            
            {/* Loading Text */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-center"
            >
              <p className="text-white font-bold tracking-widest text-sm">
                LOADING
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-2" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
