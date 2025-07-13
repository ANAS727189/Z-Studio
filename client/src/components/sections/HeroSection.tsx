import { motion } from "framer-motion";
import { ArrowRight, Play, Code} from "lucide-react";
import { LampContainer } from "../ui/lamp";
import TrueFocus from "../custom-ui/TrueFocus";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <LampContainer>
        {/* Floating code snippets background */}
       <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
          {[
            { text: '<code_without_ai>', style: 'text-cyan-400', x: 'left-[5%]', y: 'top-[8%]', delay: 1.2 },
            { text: '{ return 0; }', style: 'text-slate-400', x: 'left-[8%]', y: 'top-[65%]', delay: 1.6 },
            { text: '{ no_shitpost() }', style: 'text-slate-400', x: 'left-[12%]', y: 'bottom-[18%]', delay: 2.2 },
            { text: '#include <z--.h>', style: 'text-amber-400', x: 'left-[3%]', y: 'top-[35%]', delay: 3.6 },
            { text: 'function say_no_to_cringe()', style: 'text-blue-400', x: 'right-[5%]', y: 'top-[10%]', delay: 1.4 },
            { text: 'const focus = true;', style: 'text-pink-400', x: 'right-[12%]', y: 'top-[45%]', delay: 2.2 },
            { text: '{ import z--; }', style: 'text-slate-400', x: 'right-[8%]', y: 'top-[60%]', delay: 1.8 },
            { text: '{ start_coding() }', style: 'text-slate-400', x: 'right-[6%]', y: 'bottom-[20%]', delay: 2.0 },
            { text: '// Zero BS coding', style: 'text-lime-400', x: 'right-[3%]', y: 'bottom-[35%]', delay: 2.8 },
            { text: '// Just pure code', style: 'text-cyan-300', x: 'right-[15%]', y: 'top-[28%]', delay: 4.0 },
            { text: '// No more bloat', style: 'text-green-400', x: 'left-[25%]', y: 'top-[15%]', delay: 1.6 },
            { text: '// Clean & Fast', style: 'text-sky-400', x: 'left-[20%]', y: 'top-[50%]', delay: 3.2 },
            { text: 'printf("Hello Z--!");', style: 'text-indigo-400', x: 'left-[18%]', y: 'bottom-[25%]', delay: 2.4 },
            { text: 'var productivity = ∞;', style: 'text-emerald-400', x: 'right-[25%]', y: 'top-[55%]', delay: 3.4 },
            { text: 'compile.instantly();', style: 'text-rose-400', x: 'left-1/2 -translate-x-1/2', y: 'bottom-[15%]', delay: 3.8 }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotate: 8 }}
              whileInView={{ opacity: 0.1, y: 0, rotate: 0 }}
              transition={{ delay: item.delay, duration: 2 }}
              className={`absolute ${item.x} ${item.y} font-mono text-[clamp(8px,1vw,12px)] sm:text-[clamp(10px,1.2vw,14px)] ${item.style} 
                         hidden sm:block`}
            >
              {item.text}
            </motion.div>
          ))}
          
          {/* Mobile-optimized floating elements */}
          {[
            { text: '<code/>', style: 'text-cyan-400', x: 'left-[10%]', y: 'top-[10%]', delay: 1.2 },
            { text: '{ focus }', style: 'text-pink-400', x: 'right-[10%]', y: 'top-[15%]', delay: 1.4 },
            { text: '// Fast', style: 'text-lime-400', x: 'left-[15%]', y: 'top-[70%]', delay: 2.0 },
            { text: 'Z--', style: 'text-cyan-300', x: 'right-[15%]', y: 'top-[65%]', delay: 2.2 },
            { text: '∞', style: 'text-emerald-400', x: 'left-[70%]', y: 'top-[25%]', delay: 2.8 },
            { text: '{}', style: 'text-blue-400', x: 'right-[70%]', y: 'bottom-[20%]', delay: 3.0 },
            { text: '()', style: 'text-purple-400', x: 'left-[60%]', y: 'bottom-[25%]', delay: 1.8 },
            { text: '[]', style: 'text-orange-400', x: 'right-[60%]', y: 'top-[40%]', delay: 2.4 },
          ].map((item, index) => (
            <motion.div
              key={`mobile-${index}`}
              initial={{ opacity: 0, y: 40, rotate: 5 }}
              whileInView={{ opacity: 0.15, y: 0, rotate: 0 }}
              transition={{ delay: item.delay, duration: 1.5 }}
              className={`absolute ${item.x} ${item.y} font-mono text-lg ${item.style} 
                         block sm:hidden`}
            >
              {item.text}
            </motion.div>
          ))}
        </div>


        {/* Main title with enhanced styling */}
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <h1 className="mt-8 text-center text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl" style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}>
            <span className="relative inline-block">
              Z Studio
             
            </span>
          </h1>
          
          <div className="mt-6 relative z-60">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
            </motion.div>
            
          <p className="text-2xl md:text-4xl font-bold text-cyan-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <TrueFocus 
              sentence="No Auth Web IDE" 
            manualMode={false}
              blurAmount={5}
              borderColor="blue"
            animationDuration={2}
            pauseBetweenAnimations={1}
            />
          </p>
          </div>
        </motion.div>

        {/* Enhanced Subtitle with better typography */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          className="mt-12 text-center max-w-4xl mx-auto px-4 relative z-60"
        >
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Start coding instantly without accounts or setup.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
            A powerful web-based IDE with integration of a custom compiler and my own programming language{" "}
            <span className="text-2xl text-cyan-400 font-bold" style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}>Z--</span> with lightning-fast performance.
          </p>
        </motion.div>

        {/* Enhanced Action buttons with improved styling */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
          className="mt-16 flex flex-col sm:flex-row gap-6 items-center justify-center relative z-60"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/25 transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-3 text-lg cursor-pointer" onClick={() => navigate('/z-studio/code-editor')}>
              <Code className="w-5 h-5" />
              Start Coding Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 border-2 border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 border-2 border-slate-600 text-slate-300 font-bold rounded-xl hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all duration-300 shadow-lg backdrop-blur-sm"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="flex items-center gap-3 text-lg">
              <div className="relative">
                <Play className="w-5 h-5 group-hover:text-cyan-400 transition-colors duration-300" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300" />
              </div>
              View Demo
            </span>
          </motion.button>
        </motion.div>

        {/* Additional feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 text-sm text-slate-400 relative z-60"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>Instant Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Custom Language Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span>Lightning Fast</span>
          </div>
        </motion.div>
      </LampContainer>
    </div>
  );
};

export default HeroSection;