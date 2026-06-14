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
            className="relative flex h-[38px] shrink-0 items-center overflow-hidden rounded-md px-2.5"
            style={{ backgroundColor: `${color}24`, boxShadow: `inset 3px 0 0 ${color}` }}
        >
            <p className="line-clamp-2 text-[11px] leading-snug text-stone-700 md:text-xs">{article.headline}</p>
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
            className={cn('shrink-0', !item.first && 'mt-3')}
        >
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5" style={{ backgroundColor: `${item.color}1f` }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="whitespace-nowrap text-[11px] font-semibold text-stone-700">{item.label}</span>
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
            className="relative rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-4 md:p-5"
            role="img"
            aria-label="Diagram: news headlines siloed in print sections (Spain, Economy, Sports) regroup into specific cross-cutting topics."
        >
            <div role="tablist" aria-label="Organization mode" className="mb-4 inline-flex rounded-full border border-stone-900/10 bg-white/60 p-0.5">
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
                                'rounded-full px-3 py-1 text-[11px] font-medium transition-colors',
                                active ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-stone-700'
                            )}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="flex h-[508px] flex-col gap-1.5 overflow-hidden">
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
            </div>
        </div>
    );
}
