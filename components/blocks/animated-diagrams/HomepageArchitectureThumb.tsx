'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import HomepageSchematic from './HomepageSchematic';

/**
 * Listing thumbnail for the home-page-redesign case study: a non-interactive,
 * GIF-style auto-scroll of the schematic. Holds at the top, scrolls down to the
 * footer, holds, glides back to the top, and loops. Reuses HomepageSchematic so
 * it always matches the interactive diagram. Reduced motion holds at the top.
 */

export default function HomepageArchitectureThumb() {
    const reduce = useReducedMotion();
    const frameRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    const [max, setMax] = useState(0);

    useLayoutEffect(() => {
        const measure = () => {
            const f = frameRef.current;
            const p = pageRef.current;
            if (!f || !p) return;
            setMax(Math.max(0, p.offsetHeight - f.clientHeight));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const animate = !reduce && max > 0;
    // ~70px/s downward scroll; clamped to a sensible thumbnail range.
    const duration = Math.min(40, Math.max(14, max / 70));

    return (
        <div className="flex h-full w-full flex-col bg-white">
            {/* slim chrome */}
            <div className="flex shrink-0 items-center gap-1 border-b border-stone-900/10 px-2 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />
                <div className="ml-1.5 flex-1 rounded bg-stone-100 px-2 py-0.5 text-[8px] text-stone-400">elconfidencial.com</div>
            </div>
            <div ref={frameRef} className="relative flex-1 overflow-hidden">
                <motion.div
                    ref={pageRef}
                    animate={animate ? { y: [0, 0, -max, -max, 0] } : { y: 0 }}
                    transition={animate ? { duration, times: [0, 0.06, 0.84, 0.95, 1], ease: 'linear', repeat: Infinity, repeatDelay: 0.6 } : undefined}
                >
                    <HomepageSchematic />
                </motion.div>

                {/* top/bottom fades */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-white to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-white to-transparent" />
            </div>
        </div>
    );
}
