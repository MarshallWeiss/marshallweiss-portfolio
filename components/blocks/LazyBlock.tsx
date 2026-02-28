'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazyBlockProps {
  children: ReactNode;
}

export default function LazyBlock({ children }: LazyBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
