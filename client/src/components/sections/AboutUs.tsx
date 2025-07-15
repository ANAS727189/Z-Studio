import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Heart, Code, Zap, Star } from 'lucide-react';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  
  return (
    <section className="relative min-h-screen py-12 sm:py-16 lg:py-20 overflow-hidden" style={{ backgroundColor: '#060111' }}>
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-6 sm:w-8 h-6 sm:h-8 bg-cyan-400/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 sm:top-40 right-16 sm:right-32 w-8 sm:w-12 h-8 sm:h-12 bg-purple-500/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-16 sm:bottom-32 left-1/4 sm:left-1/3 w-4 sm:w-6 h-4 sm:h-6 bg-blue-500/20 rounded-full blur-sm"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Diagonal accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -top-2 sm:-top-4 left-0 w-20 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-transparent transform -skew-x-12"
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-cyan-400/30 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <User className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
            </motion.div>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">About the Creator</span>
          </motion.div>

          {/* Title */}
          <motion.div className="mt-6 sm:mt-8 text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-4 sm:mb-6" style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}>
              {"Hi! I am ".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 relative"
              >
                Anas
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -top-1 sm:-top-2 -right-4 sm:-right-6"
                >
                  <Star className="w-4 sm:w-6 h-4 sm:h-6 text-yellow-400 fill-current" />
                </motion.div>
              </motion.span>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              I am just someone who loves building cool websites for fun.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="relative">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-2/3 relative mb-8 lg:mb-0"
          >
            <div className="relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-slate-700/30 transform hover:scale-105 transition-transform duration-300">
              {/* Decorative Corner Elements */}
              <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-4 sm:w-6 h-4 sm:h-6 bg-cyan-400 rounded-full animate-pulse" />
              <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-3 sm:w-4 h-3 sm:h-4 bg-purple-500 rounded-full animate-pulse" />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Code className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400" />
                  </motion.div>
                  <div className="h-px bg-gradient-to-r from-cyan-400 to-transparent flex-1" />
                </div>
                
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  I am <span className="text-cyan-400 font-semibold">21 years old</span> and love building websites for fun. 
                  I love solving <span className="text-purple-400 font-semibold">complex problems</span> which challenges my brain.
                </p>
                
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  I also love <span className="text-green-400 font-semibold">cricket</span> but am slowly moving away from watching it after 
                  <span className="text-red-400 font-semibold"> Kohli's retirement</span> from 2 formats.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: -50 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative lg:absolute lg:top-8 lg:right-8 transform hover:scale-105 transition-transform duration-300 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-4 border-gradient-to-br from-cyan-400/50 to-purple-500/50 bg-gradient-to-br p-1 sm:p-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-lg sm:rounded-xl"
                >
                  <img 
                    src='/ID_card_with_bg.jpg' 
                    width={240} 
                    height={192}
                    className="w-60 sm:w-72 lg:w-80 h-48 sm:h-56 lg:h-64 object-cover filter hover:brightness-110 transition-all duration-300"
                    alt="Anas"
                  />
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
              
              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 bg-slate-800/80 p-1.5 sm:p-2 rounded-full border border-cyan-400/30 backdrop-blur-sm"
              >
                <Zap className="w-3 sm:w-4 h-3 sm:h-4 text-cyan-400" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-slate-800/80 p-1.5 sm:p-2 rounded-full border border-purple-400/30 backdrop-blur-sm"
              >
                <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-purple-400 fill-current" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-slate-800/30 to-slate-700/20 border border-slate-600/30 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-3 sm:w-4 h-3 sm:h-4 text-cyan-400" />
            </motion.div>
            <span className="text-xs sm:text-sm text-slate-400">Racing to redefine the top.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;