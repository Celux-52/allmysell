"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function StaggerWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

export function FadeInUpWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

export function FadeInUpWrapperInitialHidden({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

export function DashboardMockupWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 relative max-w-5xl mx-auto hidden md:block"
    >
      {children}
    </motion.div>
  );
}
