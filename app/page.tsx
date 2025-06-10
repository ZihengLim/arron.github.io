"use client"

import { ArrowUpRight, Code, Github, Linkedin, Mail, Palette, Smartphone } from "lucide-react"
import { XIcon, MediumIcon } from "./components/icons"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedText } from "@/components/animated-text"
import { WelcomeScreen } from "@/components/welcome-screen"
import { ContactForm } from "./components/contact-form"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [contentReady, setContentReady] = useState(false)

  const { scrollYProgress } = useScroll()
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 100])

  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const experienceRef = useRef(null)
  const contactRef = useRef(null)

  const heroRef = useRef(null)
  const heroImageRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 })
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 })
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 })
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 })

  const heroYTransform = useTransform(scrollYProgress, [0, 0.5], [0, -150])
  const heroOpacityTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScaleTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  useEffect(() => {
    if (!showWelcome) {
      setTimeout(() => {
        setContentReady(true)
      }, 100)
    } else {
      setContentReady(false)
    }

    if (showWelcome) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [showWelcome])

  const renderTabsWithUniqueKeys = () => {
    return (
      <Tabs defaultValue="frontend">
        <TabsList>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
        </TabsList>

        <div>
          <TabsContent value="frontend" key="frontend-tab">
            {/* Your frontend content */}
          </TabsContent>
          <TabsContent value="backend" key="backend-tab">
            {/* Your backend content */}
          </TabsContent>
        </div>
      </Tabs>
    )
  }

  const TerminalContent = () => {
    const [history, setHistory] = useState<Array<{ type: 'command' | 'response', content: string }>>([]);
    const [inputValue, setInputValue] = useState('');
    const terminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [history]);

    const handleCommand = (command: string) => {
      const cmd = command.trim().toLowerCase();
      let response = '';

      if (cmd === 'help') {
        response = `Available commands:
- help: Show this help message
- about: Learn more about me
- skills: View my technical skills
- contact: Get my contact information
- clear: Clear the terminal`;
      } else if (cmd === 'about') {
        response = `Hi! I'm Arron Lim, a passionate Frontend Developer focused on creating exceptional digital experiences.`;
      } else if (cmd === 'skills') {
        response = `Technical Skills:
- Frontend: React, Next.js, TypeScript
- Styling: Tailwind CSS, Styled Components
- Tools: Git, Azure`;
      } else if (cmd === 'contact') {
        response = `Let's connect!
- Email: arronlim22@gmail.com
- GitHub: github.com/ZihengLim
- LinkedIn: linkedin.com/in/arronlim
- Phone: +60199159733`;
      } else if (cmd === 'clear') {
        setHistory([]);
        return;
      } else {
        response = `Command not found. Type 'help' to see available commands.`;
      }

      setHistory(prev => [...prev,
      { type: 'command', content: command },
      { type: 'response', content: response }
      ]);
    };

    return (
      <div ref={terminalRef} className="space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center flex-wrap gap-2"
        >
          <span className="text-green-500">➜</span>
          <span className="text-blue-500">~/User</span>
          <span className="text-primary">npm run dev</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-muted-foreground"
        >
          {'>'} Initializing profile...
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="space-y-2"
        >
          <div className="text-muted-foreground">{`{`}</div>
          <div className="pl-4 break-words">
            <span className="text-blue-400">name</span>: <span className="text-green-400">"Arron Lim"</span>,
          </div>
          <div className="pl-4 break-words">
            <span className="text-blue-400">role</span>: <span className="text-green-400">"Frontend Developer"</span>,
          </div>
          <div className="pl-4 break-words">
            <span className="text-blue-400">passion</span>: <span className="text-green-400">"Exploring Web3, Gaming & Tech Innovation"</span>
          </div>
          <div className="text-muted-foreground">{`}`}</div>
        </motion.div>

        {history.map((entry, index) => (
          <div key={index}>
            {entry.type === 'command' ? (
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-green-500">➜</span>
                <span className="text-blue-500">~/User</span>
                <span className="text-primary break-all">{entry.content}</span>
              </div>
            ) : (
              <div className="text-muted-foreground mt-2 mb-4 break-words whitespace-pre-line">
                {entry.content}
              </div>
            )}
          </div>
        ))}

        <div className="mt-4 flex items-center flex-wrap gap-2">
          <span className="text-green-500">➜</span>
          <span className="text-blue-500">~/User</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none outline-none text-primary font-mono w-full md:w-auto md:flex-1 focus:ring-0 min-w-[200px]"
            placeholder="Type any command..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                handleCommand(inputValue);
                setInputValue('');
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Welcome Screen */}
      {showWelcome && (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      )}

      {/* Main Content with smooth entrance animation */}
      <motion.div
        className="min-h-screen bg-gradient-to-b from-background to-muted relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: contentReady ? 1 : 0,
          y: contentReady ? 0 : 20
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.1
        }}
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: contentReady ? 1 : 0.8,
              opacity: contentReady ? 1 : 0,
              x: [0, 30, 0],
              y: [0, -30, 0]
            }}
            transition={{
              scale: { duration: 1.2, delay: 0.2 },
              opacity: { duration: 1.2, delay: 0.2 },
              x: { repeat: Infinity, duration: 20, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 20, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-primary/5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: contentReady ? 1 : 0.8,
              opacity: contentReady ? 1 : 0,
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{
              scale: { duration: 1.2, delay: 0.4 },
              opacity: { duration: 1.2, delay: 0.4 },
              x: { repeat: Infinity, duration: 25, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 25, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-primary/5"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: contentReady ? 1 : 0.8,
              opacity: contentReady ? 1 : 0,
              x: [0, 20, 0],
              y: [0, 20, 0]
            }}
            transition={{
              scale: { duration: 1.2, delay: 0.6 },
              opacity: { duration: 1.2, delay: 0.6 },
              x: { repeat: Infinity, duration: 15, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 15, ease: "easeInOut" }
            }}
          />
        </div>

        {/* Cursor Follower */}
        <motion.div
          className="fixed w-6 h-6 rounded-full bg-primary/30 pointer-events-none z-50 hidden md:block"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: contentReady ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: contentReady ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />

        <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
          <div className="container flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: contentReady ? 1 : 0, x: contentReady ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-[100px]"
            >
              <Link href="#" className="text-xl font-bold flex items-center gap-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">AL</span>
              </Link>
            </motion.div>
            <motion.nav
              className="hidden md:flex items-center gap-8 flex-1 justify-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="#about" className="text-sm hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#skills" className="text-sm hover:text-primary transition-colors">
                Skills
              </Link>
              <Link href="#projects" className="text-sm hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="#experience" className="text-sm hover:text-primary transition-colors">
                Experience
              </Link>
              <Link href="#contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </Link>
            </motion.nav>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[100px] flex justify-end"
            >
              <Button variant="default" size="sm" asChild>
                <Link href="/ArronLim-Resume.pdf" target="_blank" className="flex items-center gap-2">
                  <span>Resume</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <motion.section
            className="container py-20 md:py-32 relative"
            ref={heroRef}
            style={{
              y: heroYTransform,
              opacity: heroOpacityTransform,
              scale: heroScaleTransform,
            }}
          >
            <div className="flex flex-col items-center gap-8 md:gap-16">
              <motion.div
                className="space-y-4 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-block px-4 py-2 text-base bg-primary/10 text-primary rounded-full mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Frontend Developer
                </motion.div>
                <motion.h1
                  className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Building <AnimatedText text="exceptional" className="text-primary" /> digital experiences
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  I specialize in crafting modern web applications with React and Next.js,
                  focusing on clean code, beautiful interfaces, and exceptional user experiences.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base h-12 px-8 min-w-[200px]"
                    asChild
                  >
                    <Link href="#projects" className="flex items-center justify-center gap-2">
                      View my work
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base h-12 px-8 min-w-[200px]"
                    asChild
                  >
                    <Link href="#contact" className="flex items-center justify-center">
                      Get in touch
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Code visualization box */}
              <motion.div
                className="relative w-full max-w-2xl h-64 md:h-80 rounded-lg overflow-hidden border border-primary/20 bg-gradient-to-br from-background/80 to-background"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                {/* Terminal header */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-muted/30 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                    Terminal
                  </div>
                </div>

                {/* Terminal content */}
                <div className="absolute inset-0 pt-8">
                  <div
                    className="h-full overflow-y-auto px-3 md:px-6 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent hover:scrollbar-thumb-primary/20"
                    style={{
                      maxHeight: "calc(100% - 2rem)",
                      scrollbarWidth: 'thin',
                      msOverflowStyle: 'none'
                    }}
                  >
                    <motion.div
                      className="text-primary/70 font-mono space-y-3 text-sm md:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <TerminalContent />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="flex justify-center gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="https://github.com/ZihengLim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/arronlim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://x.com/arronlim22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <XIcon className="w-6 h-6" />
                <span className="sr-only">X (Twitter)</span>
              </motion.a>
              <motion.a
                href="https://medium.com/@arronlim22"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <MediumIcon className="w-6 h-6" />
                <span className="sr-only">Medium</span>
              </motion.a>
            </motion.div>
          </motion.section>

          {/* About Section */}
          <section id="about" ref={aboutRef} className="bg-muted/50 py-16 md:py-24 relative">
            <div className="container">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                About Me
              </motion.h2>
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="relative rounded-lg overflow-hidden bg-gradient-to-b from-background to-primary/5 border border-primary/10 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.05]" />

                  <div className="relative space-y-8">

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-primary">Hello! I'm Arron</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          I try to stay curious, stay humble, and keep learning — even when things don't make sense right away.

                          I care about the little things, move at my own pace, and believe that growth isn't a race — it's a lifelong process. Always evolving, quietly building a version of myself I'm proud of.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <h4 className="text-xl font-medium">My Approach</h4>
                          <ul className="space-y-4">
                            <li className="flex gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg">🎯</span>
                              </div>
                              <div>
                                <span className="block font-medium">Detail-Oriented</span>
                                <span className="text-muted-foreground">I pay attention to the small things that make big differences in user experience.</span>
                              </div>
                            </li>
                            <li className="flex gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-lg">💡</span>
                              </div>
                              <div>
                                <span className="block font-medium">Problem Solver</span>
                                <span className="text-muted-foreground">I enjoy tackling challenges and finding efficient solutions.</span>
                              </div>
                            </li>
                          </ul>
                        </div>


                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h4 className="text-xl font-medium">When I'm Not Coding</h4>
                            <ul className="space-y-4">
                              <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-lg">🎮</span>
                                </div>
                                <div>
                                  <span className="block font-medium">Gaming Player</span>
                                  <span className="text-muted-foreground">Passionate about gaming, especially strategy and competitive games.</span>
                                </div>
                              </li>
                              <li className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-lg">⛓️</span>
                                </div>
                                <div>
                                  <span className="block font-medium">Blockchain Researcher</span>
                                  <span className="text-muted-foreground">Exploring Web3 technologies and blockchain innovations.</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <p className="text-lg text-muted-foreground italic">
                        "The more I learn, the less I need to prove."
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" ref={skillsRef} className="py-16 md:py-24 relative">
            <div className="container">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Skills & Expertise
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={skillsInView ? "visible" : "hidden"}
              >
                <motion.div variants={fadeInUp}>
                  <Card className="bg-card/50 backdrop-blur-sm h-full overflow-hidden relative group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-2 rounded-full bg-primary/10"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                        >
                          <Code className="w-6 h-6 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">Core Technologies</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>HTML5, CSS3, JavaScript (ES6+)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>TypeScript</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>React.js & Next.js</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>Angular</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>REST APIs</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="bg-card/50 backdrop-blur-sm h-full overflow-hidden relative group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-2 rounded-full bg-primary/10"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                        >
                          <Palette className="w-6 h-6 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">UI & Styling</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>Tailwind CSS</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>CSS-in-JS (Styled Components, Emotion)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>SASS/SCSS</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <Card className="bg-card/50 backdrop-blur-sm h-full overflow-hidden relative group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          className="p-2 rounded-full bg-primary/10"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                        >
                          <Smartphone className="w-6 h-6 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">Tools & Workflow</h3>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>Git, GitLab, Github</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>Microsoft Azure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>Figma & Adobe XD</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          <span>Vercel</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" ref={projectsRef} className="bg-muted/50 py-16 md:py-24 relative">
            <div className="container">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Featured Projects
              </motion.h2>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate={projectsInView ? "visible" : "hidden"}
              >
                {[
                  {
                    title: "MyStartup",
                    imageUrl: "/images/mystartup.png",
                    description:
                      "Enhanced the dashboard functionality based on client requirements and resolved critical bugs. Implemented new features and maintained the product website according to business specifications.",
                    url: "https://www.mystartup.gov.my/"
                  },
                  {
                    title: "MyMahir",
                    imageUrl: "/images/mymahir.png",
                    description:
                      "Collaborated on the development and enhancement of the main website, implementing new features and UI improvements based on specific client requirements and user feedback.",
                    url: "https://mymahir.my"
                  },
                  {
                    title: "Solarvest",
                    imageUrl: "/images/solarvest.png",
                    description: 
                      "Developed and optimized the product dashboard interface according to client specifications, implementing custom features for both client and administrative users.",
                    url: "https://solarvest.com"
                  },
                  {
                    title: "Koodoo Merchant",
                    imageUrl: "/images/koodoo.png",
                    description: 
                      "Developed merchant dashboard and product website following business requirements, creating intuitive interfaces based on user needs and client specifications.",
                    url: "https://www.mykoodoo.com/"
                  },

                ].map((project, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      <motion.div
                        whileHover={{
                          y: -10,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="h-full"
                      >
                        <Card className="overflow-hidden group h-full bg-card/80 backdrop-blur-sm border border-border/50 transition-colors hover:border-primary/50">
                          <div className="relative h-48 bg-white/5 flex items-center justify-center p-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-70"></div>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.3 }}
                            />
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                              <div className="w-full h-full relative flex items-center justify-center">
                                <img
                                  src={project.imageUrl}
                                  alt={project.title}
                                  className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain"
                                  style={{
                                    filter: "brightness(0.95) contrast(1.05)"
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">{project.title}</h3>
                              <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
                                <span className="text-primary hover:text-primary/80">
                                  <ArrowUpRight className="w-5 h-5" />
                                  <span className="sr-only">View project</span>
                                </span>
                              </motion.div>
                            </div>
                            <p className="text-muted-foreground text-sm">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">

                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" ref={experienceRef} className="py-16 md:py-24 relative">
            <div className="container">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Work Experience
              </motion.h2>
              <motion.div
                className="max-w-3xl mx-auto space-y-8"
                variants={staggerContainer}
                initial="hidden"
                animate={experienceInView ? "visible" : "hidden"}
              >
                {[
                  {
                    period: "2024 - 2025",
                    title: "Front-End Developer",
                    company: "Agmo Studio Sdn Bhd.",
                    description:
                      "Developed web applications based on client requirements, implementing responsive designs and optimizing performance. Collaborated with designers and back-end engineers to ensure deliverables met client specifications.",
                    skills: ["Angular", "Tailwind CSS"],
                  },
                  {
                    period: "2024 - 2024",
                    title: "Intern Front-End Developer",
                    company: "Koodoo Merchant",
                    description:
                      "Developed and maintained product dashboard and web applications according to client specifications. Implemented responsive designs and features based on business requirements.",
                    skills: ["React", "JavaScript", "SCSS"],
                  },

                ].map((experience, index) => (
                  <motion.div key={index} className="relative pl-8 border-l-2 border-primary/30" variants={fadeInUp}>
                    <motion.div
                      className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                    ></motion.div>
                    <motion.div
                      className="mb-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
                    >
                      <span className="inline-block px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {experience.period}
                      </span>
                    </motion.div>
                    <h3 className="text-xl font-semibold">{experience.title}</h3>
                    <p className="text-muted-foreground mb-2">{experience.company}</p>
                    <p className="text-sm">{experience.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {experience.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.1)" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" ref={contactRef} className="bg-muted/50 py-16 md:py-24 relative">
            <div className="container max-w-4xl">
              <motion.h2
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Get In Touch
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                  <p className="text-muted-foreground">
                    Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
                  </p>
                  <div className="space-y-3 pt-4">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <span>arronlim22@gmail.com</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                      <span>linkedin.com/in/arronlim</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Github className="w-5 h-5 text-primary" />
                      <span>github.com/ZihengLim</span>
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-muted py-8">
          <div className="container text-center">
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © {new Date().getFullYear()} Arron's Portfolio. All rights reserved.
            </motion.p>
          </div>
        </footer>
      </motion.div>
    </>
  )
}
