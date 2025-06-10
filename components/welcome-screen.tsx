"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Code, ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
    onComplete: () => void
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
    const [isExiting, setIsExiting] = useState(false)

    const handleExplore = () => {
        setIsExiting(true)
        setTimeout(() => {
            onComplete()
        }, 600)
    }

    const words = ["Purpose", "Learning", "Building", "Growth"]

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            {/* Dynamic background elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-[0.05]" />
                
                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-3 text-center">
                {/* Rotating words */}
                <motion.div 
                    className="mb-6 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-base text-primary">Driven by</span>
                        <div className="h-6 overflow-hidden relative w-[4.3rem] flex items-center justify-center">
                            {words.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className="absolute text-base font-medium whitespace-nowrap left-0"
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ 
                                        y: [-40, 0, 0, 40],
                                        opacity: [0, 1, 1, 0],
                                    }}
                                    transition={{
                                        times: [0, 0.1, 0.9, 1],
                                        duration: 2,
                                        delay: i * 2,
                                        repeat: Infinity,
                                        repeatDelay: (words.length - 1) * 2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main content */}
                <div className="space-y-8">
                    <motion.div
                        className="relative inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 blur-sm" />
                        <div className="relative px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/10">
                            <Code className="w-5 h-5 text-primary inline-block mr-2" />
                            <span className="text-sm font-medium">Frontend Developer</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-6xl font-bold tracking-tight leading-tight md:leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <span className="inline-block">Hi, I'm</span>{" "}
                        <span className="inline-block text-primary">Arron</span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
Always exploring, always creating — sometimes through code, sometimes through life. I like to keep things simple, thoughtful, and a little fun.                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <Button
                            onClick={handleExplore}
                            size="lg"
                            className="px-8 py-6 text-base relative group"
                            disabled={isExiting}
                        >
                            <span className="relative z-10">Explore My Work</span>
                            <motion.div
                                className="absolute inset-0 bg-primary/10 rounded-md"
                                initial={false}
                                animate={{ scale: 0.95 }}
                                whileHover={{ scale: 1 }}
                            />
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.div>
                </div>

                {/* Bottom accent */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                />
            </div>
        </motion.div>
    )
}