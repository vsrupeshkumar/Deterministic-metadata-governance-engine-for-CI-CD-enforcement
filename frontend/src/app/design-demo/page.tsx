'use client';

import { ShaderAnimation } from "@/components/ui/shader-lines";
import { motion } from "framer-motion";

export default function DesignDemoPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <ShaderAnimation />
      
      <div className="z-10 flex flex-col items-center gap-6 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="pointer-events-none text-center text-7xl md:text-9xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-white drop-shadow-2xl">
            Hephaestus
          </span>
          <span className="text-xl md:text-2xl font-medium tracking-[0.3em] text-[#00A3FF] uppercase mt-4">
            Governance Genesis
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-md text-center"
        >
          <p className="text-[#8A949E] text-body leading-relaxed">
            Integrating deterministic metadata engines into a premium, product-grade aesthetic.
          </p>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 163, 255, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 btn-primary px-10 py-4 text-sm font-black tracking-widest uppercase"
        >
          Enter Workspace
        </motion.button>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
    </div>
  )
}
