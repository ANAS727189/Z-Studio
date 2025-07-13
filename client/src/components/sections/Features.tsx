import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Code, 
  Zap, 
  Globe, 
  Layers, 
  Cpu, 
  ChevronRight,
  Sparkles,
  Terminal,
  Play,
  Settings,
  Star,
  Orbit,
  ArrowRight
} from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  highlights: string[];
  color: string;
};

interface FeatureCardProps {
  feature: Feature;
  index: number;
  isHovered: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, isHovered, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  const isActive = isHovered === index;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className={`group relative transform-gpu ${
        index % 2 === 0 ? 'lg:translate-y-8' : 'lg:-translate-y-8'
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Morphing Background Blob */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        isActive 
          ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl scale-150 rotate-12' 
          : 'bg-gradient-to-br from-slate-600/5 to-slate-800/5 blur-xl scale-110'
      }`} />
      
      {/* Floating Ring Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-4 rounded-full border-2 border-dashed transition-all duration-500 ${
            isActive ? 'border-cyan-400/40' : 'border-slate-700/20'
          }`}
        />
      </div>
      
      {/* Main Card Container */}
      <div className={`relative overflow-hidden rounded-3xl transition-all duration-700 transform-gpu ${
        isActive 
          ? 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/30 scale-105 rotate-2' 
          : 'bg-slate-900/60 backdrop-blur-sm border border-slate-700/40 hover:border-slate-600/60'
      }`}>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} transition-all duration-500`} />
          <motion.div
            animate={isActive ? { x: [0, 100, 0], y: [0, -50, 0] } : {}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"
          />
        </div>
        
        <div className="relative p-8">
          {/* Unconventional Icon Design */}
          <div className="relative mb-8">
            <div className="flex items-center justify-between">
              <div className="relative">
                <motion.div
                  animate={isActive ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${
                    isActive 
                      ? `bg-gradient-to-br ${feature.color} scale-110 rotate-12` 
                      : 'bg-slate-800/80 hover:bg-slate-700/80'
                  }`}
                >
                  <feature.icon className={`w-10 h-10 transition-all duration-500 ${
                    isActive ? 'text-white' : 'text-cyan-400'
                  }`} />
                </motion.div>
                
                {/* Orbiting Micro Elements */}
                {isActive && (
                  <div className="absolute inset-0">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotate: i * 120 }}
                        animate={{ rotate: i * 120 + 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="absolute -top-2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Feature Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                className={`text-6xl font-bold opacity-20 transition-all duration-500 ${
                  isActive ? 'text-cyan-400' : 'text-slate-700'
                }`}
                style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>
            </div>
          </div>
          
          {/* Dynamic Title */}
          <motion.h3 
            className={`text-2xl font-bold mb-4 transition-all duration-500 ${
              isActive ? 'text-cyan-300' : 'text-slate-200'
            }`} 
            style={{ fontFamily: 'Poppins, sans-serif' }}
            whileHover={{ scale: 1.05 }}
          >
            {feature.title}
          </motion.h3>
          
          {/* Flowing Description */}
          <motion.p 
            className="text-slate-400 leading-relaxed mb-6 text-lg" 
            style={{ fontFamily: 'Poppins, sans-serif' }}
            animate={isActive ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {feature.description}
          </motion.p>
          
          {/* Creative Highlights */}
          <div className="space-y-3">
            {feature.highlights.map((highlight: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + i * 0.1 }}
                className="group/highlight flex items-center gap-3 text-slate-300"
              >
                <motion.div
                  animate={isActive ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-cyan-400/20' : 'bg-slate-700/30'
                  }`}
                >
                  <Star className="w-3 h-3 text-cyan-400" />
                </motion.div>
                <span className="group-hover/highlight:text-cyan-300 transition-colors duration-300">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Magnetic Interaction Element */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <motion.div
              className={`group/explore flex items-center gap-3 text-sm cursor-pointer transition-all duration-300 ${
                isActive ? 'text-cyan-300' : 'text-slate-500'
              }`}
              whileHover={{ x: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isActive ? { rotate: [0, 360] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Orbit className="w-5 h-5" />
              </motion.div>
              <span className="font-medium">Explore in Detail</span>
              <ArrowRight className="w-4 h-4 group-hover/explore:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  const features = [
    {
      icon: Code,
      title: "Custom Language (Z--)",
      description: "A clean, expressive, and minimal syntax designed for modern development with intuitive features and elegant control structures.",
      highlights: [
        "Intuitive fun, let, and custom control structures",
        "Clean and minimal syntax design", 
        "Modern language features",
        "Developer-friendly expressions"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Cpu,
      title: "Custom Compiler Architecture",
      description: "Built from scratch with a complete compilation pipeline including advanced parsing, AST generation, and multiple code generation backends.",
      highlights: [
        "Complete Lexer and Parser implementation",
        "Abstract Syntax Tree (AST) generation",
        "C Code Generation backend",
        "LLVM IR Generation support"
      ],
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Terminal,
      title: "Online Code Editor",
      description: "A beautiful, no-authentication web-based IDE that lets you write and run Z-- code directly in your browser with real-time compilation.",
      highlights: [
        "No authentication required",
        "Real-time code compilation",
        "Beautiful syntax highlighting",
        "Instant code execution"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Zap,
      title: "LLVM IR Generation",
      description: "Advanced backend process that generates Low-Level Virtual Machine Intermediate Representation for cross-platform optimization.",
      highlights: [
        "LLVM IR code generation",
        "Cross-platform optimization",
        "Assembly generation potential",
        "Performance optimization ready"
      ],
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Compile and test multiple programming languages including C++, Java, Python, and more from the same unified interface.",
      highlights: [
        "Support for C++, Java, Python",
        "Unified interface for all languages",
        "Consistent development experience",
        "Cross-language compatibility"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Layers,
      title: "Comprehensive Language Features",
      description: "Full-featured language support with variable declaration, multiple data types, control flow, functions, and advanced operators.",
      highlights: [
        "Variable declaration and data types",
        "Control flow (if-else, while, for)",
        "Function definitions and calls",
        "Logical, bitwise, and modulo operators"
      ],
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <section className="relative min-h-screen bg-slate-950 py-20 overflow-hidden">
      {/* Liquid Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 70%, rgba(168,85,247,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 90%, rgba(34,197,94,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.05) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>
      
      {/* Flowing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scale: [0, 1.5, 0],
              x: [
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)
              ],
              y: [
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
              ]
            }}
            transition={{
              duration: 12,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full blur-sm"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Unconventional Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-slate-800/60 to-slate-700/40 border border-cyan-400/30 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Settings className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-slate-300 font-medium">Powerful Features</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </motion.div>
          
          {/* Morphing Title */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6" 
            style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
          >
            {"Built for ".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.03 }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 relative"
            >
              Developers
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-8"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Experience the future of coding with Z Studio's comprehensive suite of tools, 
            custom language support, and seamless integration capabilities.
          </motion.p>
        </motion.div>

        {/* Asymmetric Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isHovered={hoveredCard}
              onHover={(idx: number) => setHoveredCard(idx)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Magnetic Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-24"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/30 transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
            />
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-4 text-lg">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Play className="w-6 h-6" />
              </motion.div>
              Experience All Features
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;