"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface ServiceFlipCardProps {
  title: string;
  frontDesc: string;
  imageSrc: string;
  backDetails: React.ReactNode;
}

export default function ServiceFlipCard({ title, frontDesc, imageSrc, backDetails }: ServiceFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group h-[450px] w-full [perspective:1000px]">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of Card */}
        <div 
          className={`absolute inset-0 w-full h-full bg-surface border border-border rounded-2xl overflow-hidden flex flex-col shadow-lg [backface-visibility:hidden] ${isFlipped ? 'pointer-events-none' : ''}`}
        >
          <div className="h-[200px] relative overflow-hidden bg-surface-alt">
            <Image 
              src={imageSrc} 
              alt={title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-6 flex flex-col flex-grow relative z-10 bg-surface">
            <h3 className="font-heading font-bold text-xl mb-3 text-text-primary">{title}</h3>
            <p className="text-text-secondary text-sm mb-6 flex-grow">{frontDesc}</p>
            <button
              onClick={() => setIsFlipped(true)}
              className="relative inline-flex items-center text-sm font-semibold text-primary mt-auto w-max group/btn"
            >
              Learn more
              <ChevronRight className="w-4 h-4 ml-1 opacity-80 group-hover/btn:translate-x-1 transition-all" />
              <div className="absolute -bottom-1 left-0 h-[2px] bg-primary w-0 group-hover/btn:w-full transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className={`absolute inset-0 w-full h-full bg-surface-alt border border-primary/30 rounded-2xl overflow-hidden flex flex-col shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] ${!isFlipped ? 'pointer-events-none' : ''}`}
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-50" />
          
          <div className="p-8 flex flex-col h-full relative z-10 overflow-y-auto custom-scrollbar">
            <h3 className="font-heading font-bold text-2xl mb-4 text-primary">{title}</h3>
            <div className="text-sm text-text-secondary flex-grow mb-6">
              {backDetails}
            </div>
            
            <button
              onClick={() => setIsFlipped(false)}
              className="inline-flex items-center px-6 py-2 bg-background border border-border rounded-full text-sm font-semibold hover:bg-border transition-colors w-max mt-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
