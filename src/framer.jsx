// components/FadeInOnScroll.js
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function FadeInOnScroll({ children, delay = 0, yOffset = 0 }) {
  const controls = useAnimation();
const [ref, inView] = useInView({
  threshold: 0.01,   // Trigger when 5% of the component is visible
  triggerOnce: true,
});


  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}
