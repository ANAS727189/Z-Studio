import { motion } from "framer-motion";
import { ArrowRight, Play, Code, Zap, Terminal, Cpu, Code2 } from "lucide-react";
import { LampContainer } from "../ui/lamp";
import TrueFocus from "../custom-ui/TrueFocus";
import { useNavigate } from "react-router-dom";
import SplashCursor from "../custom-ui/SplashCursor";


const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SplashCursor />
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-center relative z-50"
        >
  <div className="flex justify-center items-baseline space-x-2 mb-6 relative z-50 mt-6">
    <motion.h1
      className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform -rotate-2"
      style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      Z
    </motion.h1>

  <motion.h1
    className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transform rotate-1"
    style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
    initial={{ x: 200, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.8 }}
  >
    Studio
  </motion.h1>
</div>

{/*  SVG  underline*/}
<motion.div
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, delay: 1.2 }}
  className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-6 pointer-events-none"
>
  <svg width="200" height="60" viewBox="0 0 200 60">
    <motion.path
      d="M10,30 Q50,0 90,30 T170,30 Q190,10 210,30"
      stroke="url(#gradient)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 1.2 }}
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
</motion.div>

          {/* Organic Connector Line */}
        </motion.div>

        {/* Unconventional Subtitle with TrueFocus */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 relative z-50"
        >
          <div className="text-center flex" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Code2 className="h-10 w-10"/>
            <TrueFocus 
              sentence="No Auth Web IDE" 
              manualMode={false}
              blurAmount={3}
              borderColor="cyan"
              animationDuration={1.5}
              pauseBetweenAnimations={2}
            />
          </div>
        </motion.div>

        {/* Organic Description Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 max-w-4xl mx-auto px-4 relative z-50"
        >
          <div className="text-center space-y-6">
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed transform -rotate-1 bg-slate-800/30 px-6 py-3 rounded-full backdrop-blur-sm border border-cyan-400/20" 
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              Start coding instantly without accounts or setup.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <p className="text-lg text-slate-400 transform rotate-1 bg-slate-900/40 px-4 py-2 rounded-2xl backdrop-blur-sm" 
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                A powerful web-based IDE with 
              </p>
              <span className="text-2xl text-cyan-400 font-bold px-4 py-2 bg-cyan-400/10 rounded-full border border-cyan-400/30 transform -rotate-1" 
                    style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}>
                Z-- language
              </span>
              <p className="text-lg text-slate-400 transform rotate-1 bg-slate-900/40 px-4 py-2 rounded-2xl backdrop-blur-sm" 
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                integration
              </p>
            </div>
          </div>
        </motion.div>

        {/*  Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-16 flex flex-col lg:flex-row gap-8 items-center justify-center relative z-50"
        >
          {/* Primary Button - Morphing Shape */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <motion.div
              animate={{ 
                borderRadius: ["25px", "35px", "25px"],
                background: ["linear-gradient(45deg, #06b6d4, #3b82f6)", 
                           "linear-gradient(45deg, #3b82f6, #8b5cf6)", 
                           "linear-gradient(45deg, #06b6d4, #3b82f6)"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 opacity-80 blur-sm"
            />
            
            <button
              onClick={() => navigate('/z-studio/code-editor')}
              className="relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-3xl overflow-hidden shadow-2xl transform hover:shadow-cyan-500/50 transition-all duration-300 border-2 border-cyan-400/30"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3 text-lg">
                <Code className="w-5 h-5" />
                Launch Z Studio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </motion.div>
          
          {/* Secondary Button - Organic Shape */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-6 bg-transparent border-2 border-slate-600 text-slate-300 font-bold rounded-full hover:bg-slate-800/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg backdrop-blur-sm overflow-hidden"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3 text-lg">
              <div className="relative">
                <Play className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  className="absolute inset-0 bg-purple-400/20 rounded-full"
                />
              </div>
              Watch Demo
            </span>
          </motion.button>
        </motion.div>

        {/* Organic Feature Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mt-20 relative z-50"
        >
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              { icon: Zap, text: "Instant Setup", color: "cyan" },
              { icon: Terminal, text: "Custom Language", color: "purple" },
              { icon: Cpu, text: "Lightning Fast", color: "pink" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.8 + index * 0.2 }}
                className="flex items-center gap-3 px-6 py-3 bg-slate-800/30 rounded-full backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className={`w-4 h-4 text-${feature.color}-400`}
                >
                  <feature.icon className="w-full h-full" />
                </motion.div>
                <span className="text-sm text-slate-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </LampContainer>
    </div>
  );
};

export default HeroSection;