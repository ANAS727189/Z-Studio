import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  Heart, 
  Sparkles, 
  Code, 
  Coffee,
  Terminal,
  Layers,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', color: 'from-purple-400 to-pink-600' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'from-blue-400 to-cyan-600' },
    { icon: Twitter, label: 'Twitter', href: '#', color: 'from-sky-400 to-blue-600' },
    { icon: Mail, label: 'Email', href: '#', color: 'from-red-400 to-pink-600' },
  ];

  const footerSections = [
    {
      title: 'Product',
      links: ['Z Studio', 'Z-- Language', 'Compiler', 'Documentation'],
      icon: Code,
      delay: 0.2
    },
    {
      title: 'Resources',
      links: ['Tutorials', 'Examples', 'API Reference', 'Community'],
      icon: Layers,
      delay: 0.4
    }
  ];

  return (
    <footer 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      {/* Chaotic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Code Fragments */}
        <motion.div
          animate={{
            rotate: [0, 360],
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 text-cyan-400/20 font-mono text-6xl transform rotate-45"
        >
          {'</'}
        </motion.div>
        
        <motion.div
          animate={{
            rotate: [0, -360],
            x: [0, -60, 40, 0],
            y: [0, 30, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-20 text-purple-400/20 font-mono text-8xl transform -rotate-12"
        >
          {'{}'}
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.5, 0.8, 1],
            rotate: [0, 180, 360],
            x: [0, 80, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 left-1/4 text-blue-400/20 font-mono text-4xl"
        >
          {'[]'}
        </motion.div>

        {/* Diagonal Streams */}
        <motion.div
          animate={{
            scaleX: [1, 2, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-0 w-96 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform rotate-45"
        />
        
        <motion.div
          animate={{
            scaleX: [1, 1.8, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [-45, -90, -45],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-0 w-80 h-0.5 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent transform -rotate-45"
        />

        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Unconventional Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl scale-150" />
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-full p-6 border border-slate-700/50">
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Terminal className="w-12 h-12 text-cyan-400" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6"
            style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
          >
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">
              Built
            </span>
            <span className="inline-block mx-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transform hover:-rotate-1 transition-transform duration-300">
              with
            </span>
            <span className="inline-block transform hover:rotate-1 transition-transform duration-300">
              Passion
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Crafting the future of coding, one line at a time. Join the revolution.
          </motion.p>
        </motion.div>

        {/* Chaotic Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotate: 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: section.delay }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6 bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-700/50 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-lg"
                  >
                    <section.icon className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {section.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href="#"
                        className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group/link"
                        whileHover={{ x: 5 }}
                      >
                        <span style={{ fontFamily: 'Poppins, sans-serif' }}>{link}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"
            />
            
            <div className="relative flex items-center gap-6 bg-slate-900/50 backdrop-blur-sm rounded-full p-4 border border-slate-700/50">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`group relative p-4 rounded-full bg-gradient-to-r ${social.color} hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHoveredLink(social.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <social.icon className="w-6 h-6 text-white" />
                  
                  {hoveredLink === social.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -60 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm font-medium"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {social.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Unconventional Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center relative"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                background: [
                  'linear-gradient(45deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 100%)',
                  'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.1) 100%)',
                  'linear-gradient(225deg, rgba(236,72,153,0.1) 0%, rgba(6,182,212,0.1) 100%)',
                  'linear-gradient(315deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 100%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-2xl blur-xl"
            />
            
            <div className="relative bg-slate-900/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </motion.div>
                
                <p className="text-slate-400 text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Made with{' '}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-block"
                  >
                    <Heart className="w-5 h-5 text-red-400 inline" />
                  </motion.span>
                  {' '}by{' '}
                  <span className="text-cyan-400 font-bold">Anas</span>
                </p>
                
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Coffee className="w-5 h-5 text-amber-400" />
                </motion.div>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <span>© 2025 Z Studio</span>
                <div className="w-1 h-1 bg-slate-500 rounded-full" />
                <span>Built for developers</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;