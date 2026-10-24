"use client";

import { motion, useReducedMotion } from "motion/react";

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  delay?: number;
};

/** Reveals a heading word by word, each word sliding up from behind a mask. */
export function AnimatedHeading({ text, as = "h2", className, delay = 0 }: AnimatedHeadingProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: reduce ? { y: 0 } : { y: "110%" },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
