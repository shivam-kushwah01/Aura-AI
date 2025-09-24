import './intro.css';
"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Say it.", description: "[0]" },
  { name: "Type it.", description: "[1]" },
  { name: "Hear it.", description: "[2]" },
  { name: "Aura makes it seamless.", description: "[3]" },
];

export const Skiper58 = () => {
  return (
    <ul className="bs flex flex-col items-start justify-center gap-5 rounded-2xl px-7 py-9 backdrop-blur-sm">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const STAGGER = 0.035;

const TextRoll = ({ children, className, center = false }) => {
  if (children == null) return null;

  const text = typeof children === "string" ? children : String(children);

  return (
    <motion.span
      initial="initial"
      animate="animated"
      className={cn("relative block overflow-hidden", className)}
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {text.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (text.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{ initial: { y: 0 }, animated: { y: "-100%" } }}
              transition={{
                ease: "easeInOut",
                delay,
                duration: 0.5,      // duration of each animation
                repeat: Infinity,    // repeat indefinitely
                repeatType: "reverse", // reverse after each animation
                repeatDelay: 2.5,    // 2.5s wait before reversing (so total ~3s)
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {text.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (text.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{ initial: { y: "100%" }, animated: { y: 0 } }}
              transition={{
                ease: "easeInOut",
                delay,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2.5,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
