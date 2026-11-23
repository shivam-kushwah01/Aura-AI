import './intro.css';

import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const lines = ["Say it.", "Type it.", "Hear it."];

export const Skiper58 = () => {
  return (
    <section className="intro">
      <h1 className="sr-only">Say it. Type it. Hear it. Aura makes it seamless.</h1>
      <ul className="intro-list" aria-hidden="true">
        {lines.map((line) => (
          <li key={line}>
            <TextRoll center className="intro-headline">
              {line}
            </TextRoll>
          </li>
        ))}
        <li className="intro-last">
          <TextRoll center className="intro-headline">
            Aura makes it
          </TextRoll>
          <span className="intro-script">seamless.</span>
        </li>
      </ul>

      <p className="intro-sub">
        Turn text into lifelike speech, transform voices and translate between
        languages — all from one simple, fast workspace.
      </p>

      <div className="intro-cta">
        <Link to="/text-to-speech" className="btn-primary">
          <i className="ri-play-circle-line" aria-hidden="true"></i>
          Try it free
        </Link>
        <a href="#tools" className="btn-ghost">
          Explore tools
          <i className="ri-arrow-down-line" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  );
};

const STAGGER = 0.035;

// Each letter rolls up and is replaced by a copy rolling in from below
const TextRoll = ({ children, className, center = false }) => {
  if (children == null) return null;

  const text = typeof children === "string" ? children : String(children);

  const renderLetters = (variants) =>
    text.split("").map((l, i) => {
      const delay = center
        ? STAGGER * Math.abs(i - (text.length - 1) / 2)
        : STAGGER * i;

      return (
        <motion.span
          variants={variants}
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
          {l === " " ? " " : l}
        </motion.span>
      );
    });

  return (
    <motion.span
      initial="initial"
      animate="animated"
      className={cn("relative block overflow-hidden whitespace-nowrap", className)}
      style={{ lineHeight: 0.9 }}
    >
      <div>{renderLetters({ initial: { y: 0 }, animated: { y: "-100%" } })}</div>
      <div className="absolute inset-0">
        {renderLetters({ initial: { y: "100%" }, animated: { y: 0 } })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
