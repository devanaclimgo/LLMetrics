import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { 
  Activity, 
  BarChart3, 
  DollarSign, 
  Zap,
  ArrowRight,
  LineChart,
  Bell,
  Code2
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function HeroGraph() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2, ease: "easeInOut" as const },
        opacity: { duration: 0.5 }
      }
    }
  }

  const areaVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1, delay: 1.5 }
    }
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3 * i, duration: 0.3 }
    })
  }

  const points = [
    { x: 0, y: 80 },
    { x: 60, y: 65 },
    { x: 120, y: 75 },
    { x: 180, y: 45 },
    { x: 240, y: 55 },
    { x: 300, y: 30 },
    { x: 360, y: 40 },
    { x: 420, y: 20 },
  ]

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L 420 100 L 0 100 Z`

  return (
    <motion.div 
      className="relative mx-auto mt-16 max-w-2xl"
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent blur-3xl" />
      <svg viewBox="0 0 420 100" className="w-full h-auto" preserveAspectRatio="none">
        <defs>
          <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.2 250)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 250)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.65 0.2 250)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 250)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#graphGradient)"
          variants={areaVariants}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
        />
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="oklch(0.09 0 0)"
            stroke="oklch(0.65 0.2 250)"
            strokeWidth="2"
            custom={i}
            variants={dotVariants}
          />
        ))}
      </svg>
      <div className="absolute -bottom-4 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
      </div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const features = [
  {
    icon: DollarSign,
    title: "Cost Monitoring",
    description: "Monitor expenses by model, endpoint and functionality. Visualize costs in real-time and history."
  },
  {
    icon: LineChart,
    title: "Detailed Analytics",
    description: "Interactive charts and detailed metrics to understand usage patterns and identify opportunities for cost savings."
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive notifications when costs exceed limits or when we detect anomalies in usage."
  },
  {
    icon: BarChart3,
    title: "Model Comparison",
    description: "Compare costs and performance between different models to choose the best option for each case."
  },
  {
    icon: Code2,
    title: "Simple Integration",
    description: "Lightweight SDK and REST API to integrate with any application. Support for OpenAI, Anthropic, Cohere and more."
  },
  {
    icon: Zap,
    title: "Automatic Insights",
    description: "Automated optimization suggestions based on your usage patterns and industry best practices."
  }
]

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon
  
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 transition-colors hover:border-primary/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <CardContent className="relative flex flex-col gap-4 p-6">
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-6 w-6 text-primary" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function LandingPage() {
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Gradient Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Navigation */}
      <motion.header 
        className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Activity className="h-4 w-4 text-primary-foreground" />
            </motion.div>
            <span className="text-lg font-semibold text-foreground">LLMetrics</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild>
                <Link to="/signup">Create Account</Link>
              </Button>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="px-6 py-24 lg:py-32">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New: Support for Claude 3.5 and GPT-4 Turbo
            </motion.div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Monitor your AI costs{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                in real-time
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              Gain complete visibility into the usage and costs of your LLM APIs. Identify bottlenecks, optimize spending, and make data-driven decisions.
            </p>
            <motion.div 
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="group" asChild>
                  <Link to="/signup">
                    Start Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard">View Demo</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <HeroGraph />
        </section>

        {/* Features Section */}
        <section className="border-t border-border/50 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Everything you need to control your costs
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                A complete platform to monitor, analyze, and optimize your AI spending.
              </p>
            </motion.div>

            <motion.div 
              ref={featuresRef}
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
            >
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature}/>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-border/50 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div 
              ref={statsRef}
              className="grid gap-8 sm:grid-cols-3"
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.div 
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 text-center backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.02, borderColor: "oklch(0.65 0.2 250 / 0.5)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative text-5xl font-bold text-primary">
                  <AnimatedCounter value={30} suffix="%" />
                </p>
                <p className="relative mt-3 text-sm text-muted-foreground">
                  Average cost reduction
                </p>
              </motion.div>
              <motion.div 
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 text-center backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.02, borderColor: "oklch(0.65 0.2 250 / 0.5)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative text-5xl font-bold text-primary">
                  <AnimatedCounter value={10} suffix="M+" />
                </p>
                <p className="relative mt-3 text-sm text-muted-foreground">
                  Requests monitored
                </p>
              </motion.div>
              <motion.div 
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 text-center backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.02, borderColor: "oklch(0.65 0.2 250 / 0.5)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative text-5xl font-bold text-primary">
                  <AnimatedCounter value={500} suffix="+" />
                </p>
                <p className="relative mt-3 text-sm text-muted-foreground">
                  Companies trust us
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border/50 px-6 py-24">
          <motion.div 
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Ready to optimize your AI costs?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Create your free account and start monitoring in less than 5 minutes.
              No credit card required.
            </p>
            <motion.div 
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="group" asChild>
                <Link to="/signup">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Activity className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground">LLMetrics</span>
          </div>
          <p className="text-xs text-muted-foreground">
            2026 LLMetrics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}