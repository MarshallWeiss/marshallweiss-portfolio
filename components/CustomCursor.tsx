"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const SIZE = 16;
const HOVER_SCALE = 3;
const LABEL_SCALE = 5;
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const pathname = usePathname();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const scale = useSpring(1, { damping: 20, stiffness: 300 });

  // Reset cursor state on route change
  useEffect(() => {
    setLabel(null);
    scale.set(1);
  }, [pathname, scale]);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

  const offset = SIZE / 2;

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - offset);
      cursorY.set(e.clientY - offset);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const labelEl = target?.closest?.("[data-cursor-label]");
      if (labelEl) {
        setLabel(labelEl.getAttribute("data-cursor-label"));
        scale.set(LABEL_SCALE);
        return;
      }
      if (target?.closest?.(INTERACTIVE)) {
        scale.set(HOVER_SCALE);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target?.closest?.("[data-cursor-label]")) {
        setLabel(null);
        scale.set(1);
        return;
      }
      if (target?.closest?.(INTERACTIVE)) {
        scale.set(1);
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, visible, scale, offset]);

  if (isTouch) return null;

  return (
    <>
      {/* Default dot cursor (hidden when label is active) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999]"
        style={{
          width: SIZE,
          height: SIZE,
          x: springX,
          y: springY,
          scale: label ? 0 : scale,
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Label cursor (dark overlay style) */}
      <AnimatePresence>
        {label && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
            style={{
              width: SIZE * LABEL_SCALE,
              height: SIZE * LABEL_SCALE,
              x: springX,
              y: springY,
              marginLeft: -(SIZE * LABEL_SCALE - SIZE) / 2,
              marginTop: -(SIZE * LABEL_SCALE - SIZE) / 2,
              backgroundColor: "rgba(30, 30, 30, 0.85)",
            }}
          >
            <span
              className="text-white font-medium select-none whitespace-nowrap"
              style={{ fontSize: "14px" }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
