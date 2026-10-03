'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import HomepageSchematic, { ZONES } from './HomepageSchematic';

/**
 * "New home page architecture" concept diagram.
 *
 * A schematic of the redesigned home page inside a browser frame the reader
 * scrolls through, top to bottom, each zone with its own template (opening,
 * issues, highlighted sections, secondary sections, more news), ending at the
 * footer. A hint invites the first scroll and fades once the reader moves; the
 * right-hand zone legend tracks the scroll position and doubles as a
 * click-to-jump control. The schematic itself lives in HomepageSchematic.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomepageArchitecture() {
    const viewportRef = useRef<HTMLDivElement>(null);
    const zoneEls = useRef<(HTMLDivElement | null)[]>([]);
    const reduce = useReducedMotion();

    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

    const onScroll = () => {
        const vp = viewportRef.current;
        if (!vp) return;
        const top = vp.scrollTop;
        const max = Math.max(1, vp.scrollHeight - vp.clientHeight);
        setProgress(Math.min(100, (top / max) * 100));
        if (top > 6) setHasScrolled(true);
        const probe = top + vp.clientHeight * 0.3;
        let next = 0;
        zoneEls.current.forEach((el, i) => {
            if (el && el.offsetTop <= probe) next = i;
        });
        if (top + vp.clientHeight >= vp.scrollHeight - 2) next = ZONES.length - 1;
        setActive(next);
    };

    const scrollToZone = (i: number) => {
        const vp = viewportRef.current;
        const el = zoneEls.current[i];
        if (!vp || !el) return;
        setHasScrolled(true);
        vp.scrollTo({ top: Math.max(0, el.offsetTop - 4), behavior: reduce ? 'auto' : 'smooth' });
    };

    const accent = ZONES[active].color;

    return (
        <div
            className="relative overflow-hidden rounded-md border border-[#d8dcd5] bg-white/70 p-5 md:p-6"
            role="img"
            aria-label="Diagram: a schematic of the redesigned home page in a browser frame the reader scrolls through — a large opening (apertura) with an opinion column, a feed of topic issues with an ad rail, the classic highlighted sections with a supporting article column, smaller secondary sections with an ad, more news and subscriber services, and a footer."
        >
            <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
                {/* Browser frame with the scrollable schematic */}
                <div className="lg:col-span-3">
                    <div className="overflow-hidden rounded-md border border-[#d8dcd5] bg-white">
                        {/* frame label */}
                        <div className="flex items-center justify-between border-b border-[#e6e8e2] px-3 py-1.5">
                            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#68716c]">elconfidencial.com</span>
                            <span className="text-[10px] text-[#9aa29d]">{ZONES[active].name}</span>
                        </div>
                        {/* progress (tracks scroll position) */}
                        <div className="h-0.5 w-full bg-[#eef0ea]">
                            <div className="h-full transition-[width,background-color] duration-200" style={{ width: `${progress}%`, backgroundColor: accent }} />
                        </div>
                        {/* scrollable viewport (stops at the footer) */}
                        <div className="relative">
                            <div
                                ref={viewportRef}
                                onScroll={onScroll}
                                className="h-[320px] overflow-y-auto overscroll-contain bg-white [scrollbar-width:thin] sm:h-[380px] lg:h-[460px]"
                            >
                                <HomepageSchematic zoneRef={(i, el) => { zoneEls.current[i] = el; }} />
                            </div>

                            {/* top/bottom fades */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />

                            {/* scroll hint — fades out once the reader scrolls */}
                            <AnimatePresence>
                                {!hasScrolled && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                        className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"
                                    >
                                        <span className="flex items-center gap-1.5 rounded-full border border-[#d8dcd5] bg-white/95 px-3 py-1 text-[11px] text-[#303936] shadow-sm">
                                            Scroll inside the page
                                            <motion.svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                animate={{ y: [0, 2, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                                            >
                                                <path d="M3 5l3 3 3-3" stroke="#303936" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </motion.svg>
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Zone legend / jump control */}
                <div className="lg:col-span-2">
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#68716c]">Top to bottom</p>
                    <ol className="space-y-1">
                        {ZONES.map((z, i) => {
                            const on = i === active;
                            return (
                                <li key={z.id}>
                                    <button
                                        type="button"
                                        aria-current={on}
                                        onClick={() => scrollToZone(i)}
                                        className={cn(
                                            'flex w-full items-start gap-3 border-l-2 py-2 pl-3 pr-2 text-left transition-colors',
                                            on ? 'bg-white' : 'border-transparent hover:bg-white/60'
                                        )}
                                        style={on ? { borderLeftColor: z.color } : undefined}
                                    >
                                        <span
                                            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold transition-colors"
                                            style={on ? { backgroundColor: z.color, color: 'white' } : { backgroundColor: `${z.color}26`, color: '#68716c' }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span className="min-w-0">
                                            <span className={cn('block font-display text-[15px] leading-tight', on ? 'text-[#303936]' : 'text-[#68716c]')}>{z.name}</span>
                                            <span className={cn('mt-0.5 block text-[11.5px] leading-snug', on ? 'text-[#68716c]' : 'text-[#9aa29d]')}>{z.desc}</span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
}
