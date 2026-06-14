'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * "Balancing competing needs" concept diagram.
 *
 * Five internal teams orbit a single shared anchor — the homepage's goal of
 * growing subscriptions. Each team pulls the homepage toward its own
 * priorities, and the hub can't lean toward everyone at once: the selected team
 * tilts the center toward it, thickens its tether, dims the rest, and surfaces
 * what it actually asked for in the panel alongside. Above the orbit sits a band
 * of OUTSIDE forces (Google, SEO, Discover, a changing readership) that
 * pressured every decision but were not stakeholders to negotiate with.
 *
 * Starts on Product design and stays on whichever team was last selected.
 * Honors reduced-motion by dropping the center "pull".
 */

type Dept = {
    id: string;
    short: string; // node label
    full: string; // detail-panel title
    role: string; // one-line "what they want"
    color: string;
    needs: string[];
};

const DEPARTMENTS: Dept[] = [
    {
        id: 'newsroom',
        short: 'Newsroom',
        full: 'Newsroom',
        role: "Cover any day's news",
        color: '#BE7257',
        needs: [
            'Enough article slots in the first scrolls for any news day',
            'A layout flexible enough for any scenario',
            'Time and guidance to adapt their workflow',
        ],
    },
    {
        id: 'audience',
        short: 'Audience & SEO',
        full: 'Audience & SEO',
        role: 'Defend traffic as Google shifts',
        color: '#9DB29C',
        needs: [
            'Adapt to Google sending less traffic',
            'Capture every reader we still can before the changes land',
            'Balance high-reach stories with hard news that earns subscriptions',
        ],
    },
    {
        id: 'growth',
        short: 'Subscriptions',
        full: 'Subscriptions & growth',
        role: 'Convert readers, keep the loyal ones',
        color: '#D29A57',
        needs: [
            'Retain existing subscribers, many older and wary of change',
            'Support in-depth articles that justify subscribing',
            "Don't lose current users in the transition",
        ],
    },
    {
        id: 'ads',
        short: 'Advertising',
        full: 'Advertising & commercial',
        role: 'Protect and grow ad revenue',
        color: '#7C9CB0',
        needs: [
            'New ad formats built for the wider 1200px page',
            'Sell ads against vertical video',
            'Keep every existing ad position, each one is revenue',
            'Hold viewability by keeping readers on the page',
            'Room to sell branded content',
        ],
    },
    {
        id: 'product',
        short: 'Product design',
        full: 'Product design',
        role: 'Modernize the reading experience',
        color: '#B58AA0',
        needs: [
            "A responsive site (the old one wasn't)",
            'More space for images',
            'More room for video, especially vertical',
            'A cleaner, more modern look, level with competitors',
        ],
    },
    {
        id: 'marketing',
        short: 'Marketing',
        full: 'Marketing',
        role: 'Launch on brand for the anniversary',
        color: '#79809E',
        needs: [
            'Everything aligned to the new brand',
            'Ready for the 25th-anniversary launch event',
            'Consistent and polished throughout',
        ],
    },
];

const DEFAULT_INDEX = DEPARTMENTS.findIndex((d) => d.id === 'product');

// Environmental pressures — context, not stakeholders. Rendered apart from the orbit.
const FORCES = ['Google algorithm shifts', 'Falling SEO traffic', 'Google Discover changes', 'Win younger readers, keep the core'];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: 'spring', stiffness: 120, damping: 18 } as const;

// Pentagon positions (percent of the orbit stage), first node at top, clockwise.
function nodePos(i: number, n: number) {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    return { x: 50 + 39 * Math.cos(a), y: 50 + 40 * Math.sin(a) };
}
const POS = DEPARTMENTS.map((_, i) => nodePos(i, DEPARTMENTS.length));

export default function CompetingNeeds() {
    const reduce = useReducedMotion();
    const [selected, setSelected] = useState(DEFAULT_INDEX);

    const active = DEPARTMENTS[selected];
    const pull = reduce ? { x: 0, y: 0 } : { x: (POS[selected].x - 50) * 0.16, y: (POS[selected].y - 50) * 0.16 };

    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-4 md:p-5"
            role="img"
            aria-label="Diagram: six teams — newsroom, audience and SEO, subscriptions, advertising, product design, and marketing — orbit a shared homepage goal of growing subscriptions, each pulling it toward its own needs, while outside forces like Google algorithm changes, falling SEO traffic, Google Discover, and a changing readership press on every decision."
        >
            {/* Outside forces — the weather over the whole system, set apart from the orbit */}
            <div className="mb-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Outside forces</p>
                <div className="flex flex-wrap gap-1.5">
                    {FORCES.map((f) => (
                        <span
                            key={f}
                            className="rounded-full border border-dashed border-stone-300 bg-white/40 px-2 py-0.5 text-[10px] font-medium text-stone-500"
                        >
                            {f}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
                {/* Orbit stage */}
                <div className="relative h-[300px] w-full sm:h-[340px] lg:col-span-3 lg:h-[380px]">
                    {/* Tethers */}
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                        {DEPARTMENTS.map((d, i) => {
                            const on = selected === i;
                            return (
                                <motion.line
                                    key={d.id}
                                    x1={50}
                                    y1={50}
                                    x2={POS[i].x}
                                    y2={POS[i].y}
                                    vectorEffect="non-scaling-stroke"
                                    animate={{
                                        stroke: on ? d.color : '#1c1917',
                                        strokeOpacity: on ? 0.9 : 0.1,
                                        strokeWidth: on ? 2.4 : 1.2,
                                    }}
                                    transition={{ duration: 0.4, ease: EASE }}
                                />
                            );
                        })}
                    </svg>

                    {/* Center hub = the shared goal (pulled toward the selected team) */}
                    <motion.div
                        className="pointer-events-none absolute inset-0 grid place-items-center"
                        animate={{ x: `${pull.x}%`, y: `${pull.y}%` }}
                        transition={SPRING}
                    >
                        <div className="flex h-[128px] w-[128px] items-center justify-center rounded-full bg-stone-900 px-5 text-center shadow-lg md:h-[140px] md:w-[140px]">
                            <span className="text-[13px] font-semibold leading-tight text-white md:text-sm">Grow subscriptions</span>
                        </div>
                    </motion.div>

                    {/* Team nodes */}
                    {DEPARTMENTS.map((d, i) => {
                        const on = selected === i;
                        const dim = !on;
                        return (
                            <button
                                key={d.id}
                                type="button"
                                aria-pressed={on}
                                aria-label={`${d.full}: ${d.role}`}
                                onClick={() => setSelected(i)}
                                onMouseEnter={() => setSelected(i)}
                                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                                style={{ left: `${POS[i].x}%`, top: `${POS[i].y}%` }}
                            >
                                <motion.div
                                    animate={{ scale: on ? 1.07 : 1, opacity: dim ? 0.55 : 1 }}
                                    transition={{ duration: 0.3, ease: EASE }}
                                    className={cn(
                                        'flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-white px-2.5 py-1.5 shadow-sm transition-colors',
                                        on ? 'border-transparent shadow-md ring-2' : 'border-stone-900/10'
                                    )}
                                    style={on ? ({ ['--tw-ring-color' as string]: d.color } as React.CSSProperties) : undefined}
                                >
                                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className={cn('text-[11px] font-semibold', on ? 'text-stone-800' : 'text-stone-600')}>{d.short}</span>
                                </motion.div>
                            </button>
                        );
                    })}
                </div>

                {/* Detail panel for the selected team */}
                <div className="rounded-xl border border-stone-900/5 bg-white/60 p-4 lg:col-span-2 lg:min-h-[380px]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            className="flex h-full flex-col"
                        >
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: active.color }} />
                                <p className="text-sm font-semibold text-stone-800">{active.full}</p>
                            </div>
                            <p className="mt-0.5 text-[12px] text-stone-400">{active.role}</p>

                            <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">What they asked for</p>
                            <ul className="space-y-2">
                                {active.needs.map((n) => (
                                    <li key={n} className="flex items-start gap-2.5">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: active.color }} />
                                        <span className="text-[13px] leading-snug text-stone-700">{n}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
