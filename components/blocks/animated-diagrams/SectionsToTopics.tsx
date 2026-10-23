'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, LayoutGroup, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * "Sections vs. topics" diagram, drawn as a fragment of a front page.
 *
 * The same eight headlines sit first in print-style section columns (Spain,
 * Economy, Sports), then physically move into the topic groups the new
 * homepage uses. Each headline keeps one `layoutId`, so framer-motion animates
 * it from its section slot to its topic slot across parents. The move is the
 * argument: stories about one subject were scattered, and now they sit together.
 *
 * Plays once when scrolled into view and holds on the topic view; the caption
 * row lets the reader switch back and forth.
 */

type Story = { id: string; headline: string };

const STORIES: Record<string, Story> = {
    a1: { id: 'a1', headline: 'Judges see Sánchez entrenched if he is charged' },
    a2: { id: 'a2', headline: 'Cracks in the PSOE: the drift challenging Sánchez' },
    a3: { id: 'a3', headline: "Leire's cleaning contracts span 12 PSOE town halls" },
    a4: { id: 'a4', headline: 'The deal extending Almaraz to 2030 defies the government' },
    a5: { id: 'a5', headline: "€1.447B in revenue from Valencia's F1 plan" },
    a7: { id: 'a7', headline: 'Russell and Hamilton chase an upset at Montmeló' },
    a8: { id: 'a8', headline: 'Brazil disappoints on debut; Vini saves Ancelotti' },
    a9: { id: 'a9', headline: 'Oyarzabal in the Golden Boot race, behind Mbappé and Kane' },
};

type Group = { key: string; label: string; stories: string[] };

// Before: broad print sections. Stories about one subject land in different columns.
const SECTIONS: Group[] = [
    { key: 'spain', label: 'Spain', stories: ['a1', 'a2', 'a3'] },
    { key: 'economy', label: 'Economy', stories: ['a4', 'a5'] },
    { key: 'sports', label: 'Sports', stories: ['a7', 'a8', 'a9'] },
];

// After: the topics the news is actually about. The first one leads the page.
const TOPICS: Group[] = [
    { key: 'sanchez', label: 'Sánchez crisis', stories: ['a1', 'a2', 'a4'] },
    { key: 'gp', label: 'Spanish Grand Prix', stories: ['a7', 'a5'] },
    { key: 'worldcup', label: '2026 World Cup', stories: ['a8', 'a9'] },
    { key: 'corruption', label: 'PSOE corruption', stories: ['a3'] },
];

// Ease in and out so the reader sees each headline travel, not jump.
const EASE = [0.65, 0, 0.35, 1] as const;

// Stories move one topic at a time, so the eye can follow each group as it forms.
const TOPIC_ORDER: Record<string, number> = Object.fromEntries(
    TOPICS.flatMap((t, i) => t.stories.map((id) => [id, i]))
);

function Headline({ id, lead, reduce }: { id: string; lead: boolean; reduce: boolean }) {
    return (
        <motion.li
            layoutId={`story-${id}`}
            layout="position"
            transition={reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay: TOPIC_ORDER[id] * 0.18 }}
            className="border-t border-[#dcdad3] py-2.5 first:border-t-0 first:pt-0"
        >
            <p
                className={cn(
                    'font-display leading-[1.2] tracking-[-0.01em] text-[#1f2421]',
                    lead ? 'text-[19px] md:text-[21px]' : 'text-[14.5px] md:text-[15.5px]'
                )}
            >
                {STORIES[id].headline}
            </p>
        </motion.li>
    );
}

function Column({
    group,
    leadFirst,
    reduce,
    className,
}: {
    group: Group;
    leadFirst?: boolean;
    reduce: boolean;
    className?: string;
}) {
    return (
        <div className={cn('min-w-0', className)}>
            <motion.h3
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.5 }}
                className="mb-3 border-t-[3px] border-[#1f2421] pt-1.5 font-display text-[13px] text-[#1f2421] md:text-sm"
            >
                {group.label}
            </motion.h3>
            <ul>
                {group.stories.map((id, i) => (
                    <Headline key={id} id={id} lead={Boolean(leadFirst && i === 0)} reduce={reduce} />
                ))}
            </ul>
        </div>
    );
}

export default function SectionsToTopics() {
    const ref = useRef<HTMLElement>(null);
    // Wait until the figure is well into the viewport so the move plays while
    // the reader is looking at it.
    const inView = useInView(ref, { once: true, margin: '0px 0px -35% 0px' });
    const reduce = Boolean(useReducedMotion());
    const [view, setView] = useState<'sections' | 'topics'>('sections');

    const played = useRef(false);
    useEffect(() => {
        if (!inView || played.current) return;
        played.current = true;
        const t = setTimeout(() => setView('topics'), reduce ? 0 : 1400);
        return () => clearTimeout(t);
    }, [inView, reduce]);

    const isTopics = view === 'topics';
    const [lead, ...rest] = TOPICS;

    return (
        <figure ref={ref} className="m-0">
            <div className="rounded-[3px] bg-white px-5 py-6 shadow-[0_1px_2px_rgba(31,36,33,0.06),0_8px_24px_-12px_rgba(31,36,33,0.18)] md:px-7 md:py-7">
                <LayoutGroup>
                    {isTopics ? (
                        <div className="space-y-6">
                            <Column group={lead} leadFirst reduce={reduce} />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#dcdad3]">
                                {rest.map((g) => (
                                    <Column key={g.key} group={g} reduce={reduce} className="sm:px-4 sm:first:pl-0 sm:last:pr-0" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#dcdad3]">
                            {SECTIONS.map((g) => (
                                <Column key={g.key} group={g} reduce={reduce} className="sm:px-4 sm:first:pl-0 sm:last:pr-0" />
                            ))}
                        </div>
                    )}
                </LayoutGroup>
            </div>

            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-x-6 text-sm text-gray-600">
                <span aria-live="polite">
                    {isTopics
                        ? 'The same stories, grouped by what they are about.'
                        : 'Eight stories from one day, filed by print section.'}
                </span>
                <span className="flex gap-4" role="group" aria-label="Show the stories">
                    {(['sections', 'topics'] as const).map((v) => (
                        <button
                            key={v}
                            type="button"
                            aria-pressed={view === v}
                            onClick={() => setView(v)}
                            className={cn(
                                'min-h-[44px] underline-offset-4 transition-colors',
                                view === v ? 'text-gray-900 underline decoration-[1.5px]' : 'text-gray-500 hover:text-gray-900'
                            )}
                        >
                            {v === 'sections' ? 'By section' : 'By topic'}
                        </button>
                    ))}
                </span>
            </figcaption>
        </figure>
    );
}
