'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * "Sections vs. topic-based organization" concept diagram.
 *
 * The same eight article rows stay mounted the whole time and simply REORDER
 * between two groupings — no reparenting, so the motion stays smooth:
 *   BEFORE: grouped under broad print sections (Spain / Economy / Sports).
 *   AFTER:  grouped under specific cross-cutting topics (Sánchez crisis, etc.).
 * Group labels fade in/out via `popLayout` while the rows slide into place.
 *
 * Content mirrors the Figma reference ("03 Sections vs topics diagram"),
 * translated to English. Plays once on scroll-into-view, holds on the topic view.
 */

type TopicId = 'sanchez' | 'gp' | 'corrupcion' | 'mundial';

const TOPICS: Record<TopicId, { label: string; color: string }> = {
    sanchez: { label: 'Sánchez crisis', color: '#BE7257' },
    gp: { label: 'Spanish Grand Prix', color: '#D29A57' },
    corrupcion: { label: 'PSOE corruption', color: '#9DB29C' },
    mundial: { label: '2026 World Cup', color: '#7C9CB0' },
};

type Article = { id: string; headline: string; topic: TopicId };
const ARTICLES: Record<string, Article> = {
    a1: { id: 'a1', headline: "Judges see Sánchez entrenched if he is charged", topic: 'sanchez' },
    a2: { id: 'a2', headline: 'Cracks in the PSOE: the drift challenging Sánchez', topic: 'sanchez' },
    a3: { id: 'a3', headline: "Leire's cleaning contracts span 12 PSOE town halls", topic: 'corrupcion' },
    a4: { id: 'a4', headline: 'The deal extending Almaraz to 2030 defies the government', topic: 'sanchez' },
    a5: { id: 'a5', headline: "€1.447B in revenue from Valencia's F1 plan", topic: 'gp' },
    a7: { id: 'a7', headline: 'Russell and Hamilton chase an upset at Montmeló', topic: 'gp' },
    a8: { id: 'a8', headline: 'Brazil disappoints on debut; Vini saves Ancelotti', topic: 'mundial' },
    a9: { id: 'a9', headline: 'Oyarzabal in the Golden Boot race, behind Mbappé and Kane', topic: 'mundial' },
};

// BEFORE — broad print sections; topics scattered across them
const BEFORE: { key: string; label: string; articles: string[] }[] = [
    { key: 'sec-spain', label: 'National', articles: ['a1', 'a2', 'a3'] },
    { key: 'sec-economy', label: 'Economy', articles: ['a4', 'a5'] },
    { key: 'sec-sports', label: 'Sports', articles: ['a7', 'a8', 'a9'] },
];

// AFTER — specific cross-cutting topics; the same articles converge
const AFTER: { key: string; topic: TopicId; articles: string[] }[] = [
    { key: 'top-sanchez', topic: 'sanchez', articles: ['a1', 'a2', 'a4'] },
    { key: 'top-gp', topic: 'gp', articles: ['a7', 'a5'] },
    { key: 'top-corrupcion', topic: 'corrupcion', articles: ['a3'] },
    { key: 'top-mundial', topic: 'mundial', articles: ['a8', 'a9'] },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const MOVE = { duration: 1.7, ease: EASE };

// Neutral dot for section headings (a section spans multiple topics, so it has
// no single topic color). Topic headings use their own color.
const SECTION_DOT = '#A8A29E';

type Item =
    | { kind: 'label'; key: string; first: boolean; label: string; color: string }
    | { kind: 'article'; key: string; id: string };

function buildItems(isAfter: boolean): Item[] {
    const items: Item[] = [];
    if (isAfter) {
        AFTER.forEach((g, gi) => {
            const t = TOPICS[g.topic];
            items.push({ kind: 'label', key: g.key, first: gi === 0, label: t.label, color: t.color });
            g.articles.forEach((id) => items.push({ kind: 'article', key: `a-${id}`, id }));
        });
    } else {
        BEFORE.forEach((g, gi) => {
            items.push({ kind: 'label', key: g.key, first: gi === 0, label: g.label, color: SECTION_DOT });
            g.articles.forEach((id) => items.push({ kind: 'article', key: `a-${id}`, id }));
        });
    }
    return items;
}

function ArticleRow({ id }: { id: string }) {
    const article = ARTICLES[id];
    const { color } = TOPICS[article.topic];
    return (
        <motion.div
            layout
            transition={MOVE}
            className="relative flex min-h-[40px] shrink-0 items-center gap-3 border-b border-[#e6e8e2] py-2 pr-2"
        >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
            <p className="line-clamp-2 font-display text-[13.5px] leading-snug tracking-[-0.01em] text-[#303936] md:text-[14.5px]">{article.headline}</p>
        </motion.div>
    );
}

function GroupLabel({ item }: { item: Extract<Item, { kind: 'label' }> }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={cn('shrink-0 pb-1', !item.first && 'mt-5')}
        >
            <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-[#68716c]">{item.label}</span>
            </span>
        </motion.div>
    );
}

export default function SectionsToTopics() {
    const ref = useRef<HTMLDivElement>(null);
    // Fire only once the diagram is well into the viewport (its top has crossed
    // ~60% down), not the moment its top edge first appears — so the morph plays
    // while the reader is actually on this section.
    const inView = useInView(ref, { once: true, margin: '0px 0px -40% 0px' });
    const reduce = useReducedMotion();
    const [phase, setPhase] = useState<'before' | 'after'>('before');

    // Auto-advance once: when the diagram scrolls into view, animate from the
    // section view to the topic view a single time. After that it's tab-driven.
    const advanced = useRef(false);
    useEffect(() => {
        if (reduce || advanced.current) return;
        if (inView) {
            advanced.current = true;
            const t = setTimeout(() => setPhase('after'), 1000);
            return () => clearTimeout(t);
        }
    }, [inView, reduce]);

    const isAfter = phase === 'after';
    const TABS: { value: 'before' | 'after'; label: string }[] = [
        { value: 'before', label: 'By section' },
        { value: 'after', label: 'By topic' },
    ];
    const items = buildItems(isAfter);

    return (
        <div
            ref={ref}
            className="relative overflow-hidden rounded-md border border-[#d8dcd5] bg-white/70 p-5 md:p-6"
            role="img"
            aria-label="Diagram: news headlines siloed in print sections (Spain, Economy, Sports) regroup into specific cross-cutting topics."
        >
            <div role="tablist" aria-label="Organization mode" className="mb-5 flex gap-6 border-b border-[#d8dcd5]">
                {TABS.map((tab) => {
                    const active = tab.value === phase;
                    return (
                        <button
                            key={tab.value}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setPhase(tab.value)}
                            className={cn(
                                '-mb-px border-b-2 pb-2.5 text-[13px] transition-colors',
                                active ? 'border-[#303936] text-[#303936]' : 'border-transparent text-[#68716c] hover:text-[#303936]'
                            )}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <motion.div layout transition={MOVE} className="flex flex-col overflow-hidden">
                <LayoutGroup>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {items.map((it) =>
                            it.kind === 'label' ? (
                                <GroupLabel key={it.key} item={it} />
                            ) : (
                                <ArticleRow key={it.key} id={it.id} />
                            )
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </motion.div>
        </div>
    );
}
