'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * "Final result: key changes" concept diagram.
 *
 * A spotlight tour over a real mockup of the redesigned home page. The page sits
 * in a browser frame; stepping through the list of changes scrolls to the region
 * and spotlights it (a colored ring with a dimming scrim). Regions are expressed
 * as percentages of the image, so they stay aligned at any size. The "Wider page"
 * step is special-cased to outline the whole page instead of dimming.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRIM = 'rgba(28, 25, 23, 0.5)';
const IMAGE_SRC = '/case-studies/home/homepage-keychanges.webp';

type Region = { top: number; left: number; width: number; height: number };

type Change = {
    name: string;
    desc: string;
    color: string;
    /** Region as % of the page image, or null for the whole-page "frame" step. */
    region: Region | null;
};

const CHANGES: Change[] = [
    {
        name: 'Section names changed',
        desc: 'Sections were renamed and split for clarity, like Economía and Empresas, or Tecnología y Ciencia.',
        color: '#D29A57',
        region: { top: 3.3, left: 1, width: 98, height: 0.4 },
    },
    {
        name: 'Clear visual hierarchy',
        desc: 'Each block carries weight proportional to its importance, so the most relevant stories stand out at a glance.',
        color: '#BE7257',
        region: { top: 5.7, left: 0.5, width: 64, height: 4.6 },
    },
    {
        name: 'New submenu',
        desc: 'Newsletters, podcasts and services now live in an easy-to-reach submenu at the top of the page.',
        color: '#7C9CB0',
        region: { top: 3.78, left: 29, width: 33, height: 0.4 },
    },
    {
        name: 'A home for Opinion',
        desc: 'Opinion gets a stable, prominent place on the page to draw readers and feature signature columnists.',
        color: '#B58AA0',
        region: { top: 5.85, left: 64, width: 35, height: 5.6 },
    },
    {
        name: 'Thematic blocks',
        desc: 'Content is grouped into thematic blocks that gather every piece on a topic, keeping in-depth stories together.',
        color: '#7C9CB0',
        region: { top: 22.4, left: 1, width: 98, height: 7.6 },
    },
    {
        name: 'Wider page',
        desc: 'A wider layout gives each block more room, improving legibility and the visual balance of the whole page.',
        color: '#9DB29C',
        region: null,
    },
    {
        name: 'Audiovisual takes center stage',
        desc: 'Images and video take more space and scale to the story, reinforcing the impact of each piece.',
        color: '#BE7257',
        region: { top: 93.4, left: 40, width: 59, height: 5.4 },
    },
];

export default function HomepageKeyChanges() {
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();

    const [active, setActive] = useState(0);
    const change = CHANGES[active];
    const isFrame = change.region === null;

    // Scroll the active region into view (positions are %, so no measuring needed).
    useLayoutEffect(() => {
        const vp = viewportRef.current;
        const content = contentRef.current;
        if (!vp || !content) return;
        const r = CHANGES[active].region;
        if (!r) {
            vp.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
            return;
        }
        const H = content.offsetHeight;
        const top = (r.top / 100) * H;
        const h = (r.height / 100) * H;
        const desired = top - (vp.clientHeight - h) / 2;
        vp.scrollTo({ top: Math.max(0, desired), behavior: reduce ? 'auto' : 'smooth' });
    }, [active, reduce]);

    const go = (i: number) => setActive((i + CHANGES.length) % CHANGES.length);
    const r = change.region;

    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-4 md:p-5"
            role="group"
            aria-label="Diagram: a spotlight tour of the redesigned El Confidencial home page, highlighting seven key changes from the redesign — renamed sections, a clearer visual hierarchy, a new submenu, a prominent home for opinion, thematic content blocks, a wider page, and more space for audiovisual content."
        >
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
                {/* Browser frame with the spotlighted page */}
                <div className="lg:col-span-9">
                    <div className="overflow-hidden rounded-xl border border-stone-900/10 bg-white shadow-sm">
                        {/* chrome */}
                        <div className="flex items-center gap-1.5 border-b border-stone-900/10 px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-stone-300" />
                            <span className="h-2 w-2 rounded-full bg-stone-300" />
                            <span className="h-2 w-2 rounded-full bg-stone-300" />
                            <div className="ml-2 flex-1 rounded bg-stone-100 px-2 py-0.5 text-[9px] text-stone-400">elconfidencial.com</div>
                        </div>
                        {/* viewport */}
                        <div className="relative">
                            <div
                                ref={viewportRef}
                                className="h-[320px] overflow-auto overscroll-contain bg-white [scrollbar-width:thin] sm:h-[380px] lg:h-[460px]"
                            >
                                <div ref={contentRef} className="relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={IMAGE_SRC} alt="Mockup of the redesigned El Confidencial home page" className="block w-full" />

                                    {/* spotlight ring + dimming scrim */}
                                    <motion.div
                                        aria-hidden
                                        className="pointer-events-none absolute z-20 rounded-md"
                                        initial={false}
                                        animate={
                                            r
                                                ? { top: `${r.top}%`, left: `${r.left}%`, width: `${r.width}%`, height: `${r.height}%`, opacity: 1 }
                                                : { top: '0%', left: '0%', width: '100%', height: '100%', opacity: 1 }
                                        }
                                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 28 }}
                                        style={{
                                            border: `2px solid ${change.color}`,
                                            boxShadow: isFrame ? 'none' : `0 0 0 9999px ${SCRIM}`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* top/bottom fades */}
                            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-4 bg-gradient-to-b from-white to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-6 bg-gradient-to-t from-white to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Change list / step control */}
                <div className="lg:col-span-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Key changes</p>
                    <ol className="space-y-1.5">
                        {CHANGES.map((c, i) => {
                            const on = i === active;
                            return (
                                <li key={c.name}>
                                    <button
                                        type="button"
                                        aria-current={on}
                                        onClick={() => setActive(i)}
                                        className={cn(
                                            'flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition-colors',
                                            on ? 'border-transparent bg-white shadow-sm' : 'border-transparent hover:bg-white/50'
                                        )}
                                    >
                                        <span
                                            className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold transition-colors"
                                            style={on ? { backgroundColor: c.color, color: 'white' } : { backgroundColor: `${c.color}26`, color: '#57534e' }}
                                        >
                                            {i + 1}
                                        </span>
                                        <span className="min-w-0">
                                            <span className={cn('block text-[13px] font-semibold', on ? 'text-stone-800' : 'text-stone-500')}>{c.name}</span>
                                            {on && (
                                                <motion.span
                                                    initial={reduce ? false : { opacity: 0, y: -2 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.25, ease: EASE }}
                                                    className="mt-1 block text-[11px] leading-snug text-stone-400"
                                                >
                                                    {c.desc}
                                                </motion.span>
                                            )}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>

                    {/* prev / dots / next */}
                    <div className="mt-3 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => go(active - 1)}
                            className="rounded-md px-2 py-1 text-[11px] font-medium text-stone-500 transition-colors hover:bg-white hover:text-stone-800"
                        >
                            ← Prev
                        </button>
                        <div className="flex items-center gap-1.5">
                            {CHANGES.map((c, i) => (
                                <button
                                    key={c.name}
                                    type="button"
                                    aria-label={c.name}
                                    onClick={() => setActive(i)}
                                    className="h-1.5 rounded-full transition-all"
                                    style={{ width: i === active ? 16 : 6, backgroundColor: i === active ? c.color : '#d6d3d1' }}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => go(active + 1)}
                            className="rounded-md px-2 py-1 text-[11px] font-medium text-stone-500 transition-colors hover:bg-white hover:text-stone-800"
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
