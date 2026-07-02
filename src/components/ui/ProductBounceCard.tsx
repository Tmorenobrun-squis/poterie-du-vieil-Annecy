"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface ProductBounceCardProps {
  src: string;
  alt?: string;
  height?: number;
}

export const ProductBounceCard: React.FC<ProductBounceCardProps> = ({
  src,
  alt = "Produit de la boutique",
  height = 260,
}) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ height }}
    >
      {/* Wrapper blend mode séparé — mix-blend-mode sur le wrapper,
          pas sur le motion.img, pour ne pas bloquer les transforms CSS */}
      <div style={{ mixBlendMode: "multiply" }}>
        <motion.img
          src={src}
          alt={alt}
          className="w-auto object-contain"
          style={{ height, transformStyle: "preserve-3d" }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, -10, 0],
          }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Ombre statique au sol */}
      <div
        className="absolute bottom-0 rounded-full bg-black/20 blur-md"
        style={{ width: height * 0.46, height: 20 }}
      />
    </div>
  );
};
