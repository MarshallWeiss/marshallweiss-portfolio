'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';

/**
 * "A modular template system" concept diagram.
 *
 * One homepage "opening" template, shown cycling through its variants. The photo
 * is a single live block that genuinely morphs — it grows, travels, and changes
 * aspect ratio (banner → square → vertical → full-width on top → gone) — while the
 * text underneath crossfades. The point is that a single template absorbs all of
 * these without becoming a different component.
 *
 * The text frames are flat PNG exports of the real homepage templates, so they
 * keep the actual homepage typefaces (which deliberately differ from the portfolio
 * fonts). The gray placeholder box was stripped from those exports so the only gray
 * on screen is the morphing block — its rectangle per frame was measured from the
 * originals (percentages of the 4:3 canvas). Pauses when offscreen and holds a
 * single frame under reduced motion.
 */

type Box = { left: number; top: number; width: number; height: number };
type Frame = { src: string; label: string; box: Box | null };

// Boxes are percentages of the cropped frame (2400×1401, ~1.71:1).
const FRAMES: Frame[] = [
    { src: '/case-studies/home/templates/opening-banner-text.png', label: 'Banner', box: { left: 34.7, top: 2.1, width: 63.3, height: 72.2 } },
    { src: '/case-studies/home/templates/opening-square-text.png', label: 'Square', box: { left: 34.7, top: 2.1, width: 30.6, height: 52.4 } },
    { src: '/case-studies/home/templates/opening-vertical-text.png', label: 'Vertical', box: { left: 34.7, top: 2.1, width: 30.6, height: 78.8 } },
    { src: '/case-studies/home/templates/opening-bigphoto-text.png', label: 'Big photo', box: { left: 2, top: 2.1, width: 63.3, height: 72.2 } },
    { src: '/case-studies/home/templates/opening-fulltext-text.png', label: 'Text only', box: null },
];

const HOLD_MS = 2600;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function TemplateMorph() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.4 });
    const reduce = useReducedMotion();
    const [index, setIndex] = useState(0);
    const lastBox = useRef<Box>(FRAMES[0].box as Box);

    useEffect(() => {
        if (reduce || !inView) return;
        const id = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % FRAMES.length);
        }, HOLD_MS);
        return () => window.clearInterval(id);
    }, [inView, reduce]);

    const frame = FRAMES[index];
    if (frame.box) lastBox.current = frame.box;
    // When a frame has no photo (text-only), keep the block where it was and fade it out.
    const box = frame.box ?? lastBox.current;

    return (
        <div
            ref={ref}
            className="relative overflow-hidden rounded-2xl border border-stone-900/10 bg-white p-4 md:p-5"
            role="img"
            aria-label="Diagram: a single homepage opening template cycling through its variants — the photo grows and reshapes from a banner to a square, a vertical, a full-width block on top, and then disappears for a text-only layout — while the surrounding template stays constant."
        >
            <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400">
                    Opening template
                </p>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={frame.label}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600"
                    >
                        {frame.label}
                    </motion.span>
                </AnimatePresence>
            </div>

            <div className="relative aspect-[2400/1401] w-full">
                {/* Text layer — crossfades between frames */}
                <AnimatePresence mode="sync">
                    <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                    >
                        <Image
                            src={frame.src}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                            priority={index === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Photo block — a single element that morphs between layouts */}
                <motion.div
                    className="absolute bg-[#d4d4d4]"
                    initial={false}
                    animate={{
                        left: `${box.left}%`,
                        top: `${box.top}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`,
                        opacity: frame.box ? 1 : 0,
                    }}
                    transition={{ duration: 0.9, ease: EASE }}
                />
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5">
                {FRAMES.map((f, i) => (
                    <span
                        key={f.label}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === index ? 'w-5 bg-stone-700' : 'w-1.5 bg-stone-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
