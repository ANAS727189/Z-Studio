import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion} from "motion/react";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScroll = ({
  titleComponent,
  children,
}: ContainerScrollProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-auto flex items-center justify-center relative px-4 py-8 md:px-8 md:py-12"
      ref={containerRef}
    >
      <div
        className="w-full relative max-w-7xl mx-auto"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

interface HeaderProps {
  translate: any;
  titleComponent: React.ReactNode;
}

const Header = ({ translate, titleComponent }: HeaderProps) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-6xl mx-auto text-center mb-8 md:mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

interface CardProps {
  rotate: any;
  scale: any;
  translate: any;
  children: React.ReactNode;
}

const Card = ({
  rotate,
  scale,
  translate,
  children,
}: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-3 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};