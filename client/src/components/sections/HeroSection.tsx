import { motion } from "framer-motion";
import { ArrowRight, Play, Code} from "lucide-react";
import { LampContainer } from "../ui/lamp";

const HeroSection = () => {
  return (
    <div className="relative">
      <LampContainer>
        {/* Floating code snippets background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ delay: 1.2, duration: 2 }}
            className="absolute top-30 left-10 text-cyan-400 font-mono text-sm"
          >
            {'<code_without_ai>'}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.1, x: 0 }}
            transition={{ delay: 1.4, duration: 2 }}
            className="absolute top-32 right-16 text-blue-400 font-mono text-sm"
          >
            {'function say_no_to_cringe()'}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            transition={{ delay: 1.6, duration: 2 }}
            className="absolute bottom-40 left-2 text-slate-400 font-mono text-sm"
          >
            {'{ return 0; }'}
          </motion.div>
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            transition={{ delay: 1.6, duration: 2 }}
            className="absolute bottom-50 right-20 text-slate-400 font-mono text-sm"
          >
            {'{ import z--; }'}
          </motion.div>
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            transition={{ delay: 1.6, duration: 2 }}
            className="absolute bottom-10 right-20 text-slate-400 font-mono text-sm"
          >
            {'{ start_coding() }'}
          </motion.div>
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.1, y: 0 }}
            transition={{ delay: 1.6, duration: 2 }}
            className="absolute bottom-20 left-20 text-slate-400 font-mono text-sm"
          >
            {'{ no_shitpost() }'}
          </motion.div>
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
            {/* <span className="relative inline-block"> */}
              Z Studio
             
            {/* </span> */}
          </h1>
          
          <div className="mt-6 relative z-60">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
            </motion.div>
            
          <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent underline decoration-wavy" style={{ fontFamily: 'Poppins, sans-serif' }}>
            No Auth Web IDE
          </p>
                
            {/* <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-3 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            /> */}
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
            <span className="relative z-10 flex items-center gap-3 text-lg">
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