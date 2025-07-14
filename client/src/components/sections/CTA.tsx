import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, MessageCircle, Sparkles, ArrowUpRight, Zap } from 'lucide-react';

const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "anas23khan083@gmail.com",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      delay: 0.2,
      transform: "rotate-3 translate-x-4",
      hoverTransform: "rotate-0 translate-x-0 scale-110"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@ANAS727189",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      delay: 0.4,
      transform: "-rotate-2 -translate-x-2",
      hoverTransform: "rotate-0 translate-x-0 scale-110"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "anas-khan83",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      delay: 0.6,
      transform: "rotate-1 translate-y-2",
      hoverTransform: "rotate-0 translate-y-0 scale-110"
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@Anas_is_me",
      color: "from-sky-500 to-blue-600",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/30",
      delay: 0.8,
      transform: "-rotate-1 translate-x-3",
      hoverTransform: "rotate-0 translate-x-0 scale-110"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ backgroundColor: '#060111' }}
    >
      {/* Chaotic Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Diagonal Lines */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-64 h-1 bg-gradient-to-r from-cyan-400/20 to-transparent transform rotate-45"
        />
        <motion.div
          animate={{
            rotate: [0, -360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 right-32 w-48 h-1 bg-gradient-to-r from-purple-400/20 to-transparent transform -rotate-45"
        />
        
        {/* Chaotic Shapes */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 transform rotate-45"
        />
        
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 90, -60, 0],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full"
        />
        
        {/* Scattered Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unconventional Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-cyan-400/30 backdrop-blur-sm mb-8 transform hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-sm text-slate-300 font-medium">Let's Connect</span>
          </motion.div>

          {/* Chaotic Title */}
          <motion.div className="relative">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-6"
              style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
            >
              <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                Get
              </span>
              <span className="inline-block mx-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transform hover:-rotate-2 transition-transform duration-300">
                in
              </span>
              <span className="inline-block transform hover:rotate-1 transition-transform duration-300">
                Touch
              </span>
            </motion.h2>
            
            {/* Chaotic Underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rotate-1"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Ready to build something amazing together? Drop me a line through any of these channels!
          </motion.p>
        </motion.div>

        {/* Chaotic Contact Grid */}
        <div className="relative">
          {/* Central Magnetic Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"
          />
          
          {/* Contact Cards in Chaotic Layout */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, rotate: 10 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotate: 0,
                  x: 0
                } : {}}
                transition={{ duration: 0.8, delay: method.delay }}
                className={`relative group cursor-pointer transform ${method.transform} hover:${method.hoverTransform} transition-all duration-500`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative p-8 rounded-3xl ${method.bgColor} border-2 ${method.borderColor} backdrop-blur-sm overflow-hidden`}>
                  {/* Chaotic Background Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-400/30 to-transparent transform rotate-45" />
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={hoveredCard === index ? { 
                      background: [
                        'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} mb-6`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-100 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {method.label}
                    </h3>
                    <p className="text-slate-400 text-lg mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {method.value}
                    </p>
                    
                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-xl font-medium hover:from-slate-600 hover:to-slate-500 transition-all duration-300"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chaotic Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"
            />
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Quick Response Guaranteed
                </h3>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </motion.div>
              </div>
              <p className="text-slate-400 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                I usually respond within 24 hours. Let's create something extraordinary!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;