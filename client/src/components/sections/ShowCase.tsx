import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Sparkles} from 'lucide-react';
import { ContainerScroll } from '../ui/container-scroll-animation';
import { Meteors } from '../custom-ui/Meteors';

const ShowCase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [_, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener('mousemove', handleMouseMove);
      return () => imageElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden flex items-center justify-center py-20"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
      </div>

      <Meteors number={40}/>
      
      <div className="relative z-10 w-full">
        {/* Main Content Container */}
        <motion.div 
          style={{ y, opacity, scale }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main Image Container with 3D Transform */}
          <ContainerScroll
            titleComponent={
              <>
                <div className="text-center relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="absolute -top-8 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform -skew-x-12"
                  />
                  
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.7 }}
                    className="absolute -bottom-8 right-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform skew-x-12"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={isInView ? { opacity: 1, rotateX: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 border border-cyan-400/30 mb-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <span className="text-cyan-400 font-medium">Live Preview</span>
                  </motion.div>
                </div>
                
                <div className="space-y-4">
                  <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Experience the magic of
                  </motion.h2>
                  
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    style={{ fontFamily: 'Winky Rough, Poppins, sans-serif' }}
                  >
                    Z Studio
                  </motion.h1>
                </div>
              </>
            }
          >
            <img
              src="/judge0-compile.png"
              alt="Z Studio Interface"
              className="mx-auto rounded-2xl object-cover h-full w-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>

          {/* Bottom Accent Elements */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 text-center space-y-4"
          >
            <div className="inline-flex items-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-slate-400 font-medium">Powered by Innovation</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
            
            <p className="text-slate-500 max-w-md mx-auto">
              Real-time compilation, intelligent autocomplete, and seamless debugging - all in your browser.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Accent Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-purple-400/10 to-transparent rounded-full blur-3xl" />
    </section>
  );
};


export default ShowCase;