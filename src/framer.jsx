// components/FadeInOnScroll.jsx
import { motion } from 'framer-motion';

export default function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  ease = [0.25, 0.25, 0, 1], // Smooth cubic-bezier ease
  once = true,
  amount = "some", 
  className = "",
  ...rest
}) {
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: Math.min(Math.max(duration, 0.1), 3), // Clamp duration between 0.1s - 3s
        delay: Math.max(delay, 0),
        ease,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
      style={{ willChange: "opacity" }} // Optimized purely for fade
      {...rest}
    >
      {children}
    </motion.div>
  );
}