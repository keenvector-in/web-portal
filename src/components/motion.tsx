import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

// ponytail: local copy of kvcl's <Reveal>. packages/kvcl is a submodule pinned
// before Reveal existed — switch these imports to "@keenvector/kvcl" once the
// submodule pointer is bumped past the kvcl commit that adds it.
export function Reveal({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Thin brand-gradient bar tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-logo-from via-logo-via to-accent-400"
    />
  );
}
