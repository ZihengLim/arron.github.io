"use client"

import { useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const controls = useAnimationControls()

  useEffect(() => {
    const animateText = async () => {
      await controls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      })

      await controls.start({
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: "easeInOut",
        },
      })
    }

    animateText()
  }, [controls])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={controls}
      style={{
        display: "inline-block",
        backgroundImage:
          "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.7) 50%, hsl(var(--primary)) 100%)",
        backgroundSize: "200% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </motion.span>
  )
}
