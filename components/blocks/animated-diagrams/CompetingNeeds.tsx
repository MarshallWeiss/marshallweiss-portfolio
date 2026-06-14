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
        role: 'Editorial priority and flexibility',
        color: '#BE7257',
        needs: [
            'Sufficient lead positions above the fold for any news cycle',
            'Layout flexibility to reflect the day’s hierarchy',
            'Workflow transition support and clear guidance',
        ],
    },
    {
        id: 'audience',
        short: 'Audience & SEO',
        full: 'Audience & SEO',
        role: 'Defending search-driven reach',
        color: '#9DB29C',
        needs: [
            'Resilience to declining search referral traffic',
            'Maximized reach while it remains available',
            'A balance of high-traffic and subscription-driving coverage',
        ],
    },
    {
        id: 'growth',
        short: 'Subscriptions',
        full: 'Subscriptions & growth',
        role: 'Conversion without churn',
        color: '#D29A57',
        needs: [
            'Retention of existing subscribers through the transition',
            'Prominence for in-depth, subscription-worthy journalism',
            'Continuity of experience for long-standing readers',
        ],
    },
    {
        id: 'ads',
        short: 'Advertising',
        full: 'Advertising & commercial',
        role: 'Protecting commercial revenue',
        color: '#7C9CB0',
        needs: [
            'Support for new formats on the wider 1200px grid',
            'Inventory for vertical-video advertising',
            'No loss of existing placements or revenue',
            'Strong viewability and on-page engagement',
            'Dedicated branded-content opportunities',
        ],
    },
    {
        id: 'product',
        short: 'Product design',
        full: 'Product design',
        role: 'A modern, coherent experience',
        color: '#B58AA0',
        needs: [
            'A fully responsive, multi-device experience',
            'Greater prominence for photography',
            'Expanded support for video, particularly vertical',
            'A cleaner, modern design competitive with peers',
        ],
    },
    {
        id: 'marketing',
        short: 'Marketing',
        full: 'Marketing',
        role: 'An on-brand anniversary launch',
        color: '#79809E',
        needs: [
            'Full alignment with the new brand identity',
            'Readiness for the 25th-anniversary launch',
            'A consistent, polished presentation throughout',
        ],
    },
];

const DEFAULT_INDEX = DEPARTMENTS.findIndex((d) => d.id === 'product');

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
    const pull = reduce ? { x: 0, y: 0 } : { x: (POS[selected].x - 50) * 0.08, y: (POS[selected].y - 50) * 0.08 };

    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-4 md:p-5"
            role="img"
            aria-label="Diagram: six teams — newsroom, audience and SEO, subscriptions, advertising, product design, and marketing — orbit a shared north star of subscription growth, each pulling the homepage toward its own key needs."
        >
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
                        <div className="flex h-[128px] w-[128px] flex-col items-center justify-center rounded-full bg-stone-700 px-5 text-center shadow-lg md:h-[140px] md:w-[140px]">
                            <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/55">North star</span>
                            <span className="mt-1 text-[13px] font-semibold leading-tight text-white md:text-sm">Subscription growth</span>
                        </div>
                    </motion.div>

                    {/* Team nodes */}
                    {DEPARTMENTS.map((d, i) => {
                        const on = selected === i;
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
                                    animate={{ scale: on ? 1.07 : 1 }}
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

                            <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Key needs</p>
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
