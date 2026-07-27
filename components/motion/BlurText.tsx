"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, Ref } from "react";
import { motion } from "framer-motion";

export default function BlurText({
  text,
  as = "p",
  className,
  style,
  startDelay = 0,
}: {
  text: string;
  as?: "p" | "span";
  className?: string;
  style?: CSSProperties;
  /** extra delay in seconds, added on top of the per-word stagger */
  startDelay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag
      ref={ref as Ref<HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "0.1em", ...style }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            inView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : undefined
          }
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: startDelay + (i * 100) / 1000,
          }}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
