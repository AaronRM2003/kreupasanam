// components/FadeInOnScroll.js
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function FadeInOnScroll({
  children,
  delay = 0,
  yOffset = 0,
  xOffset = 0,
  duration = 0.6,
  ease = 'easeOut',
  once = true,
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15, // Trigger when 15% is visible
    triggerOnce: once,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: Math.min(Math.max(duration, 0.1), 3), // clamp between 0.1s - 3s
        delay: Math.max(delay, 0),
        ease,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
