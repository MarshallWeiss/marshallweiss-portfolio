'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';

/**
 * Spotlight Tour — a CMS-driven version of the "key changes" diagram. An editor
 * uploads a page screenshot and draws highlight regions on it (in Studio, via
 * RegionImageInput). Stepping through the regions scrolls the page in a browser
 * frame and spotlights each one (colored ring + dimming scrim). A region flagged
 * `fullPage` outlines the whole page with no dimming.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRIM = 'rgba(28, 25, 23, 0.5)';
const COLORS = ['#BE7257', '#7C9CB0', '#D29A57', '#B58AA0', '#9DB29C', '#8C7BB0', '#C77B7B'];

interface Region {
    _key?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    title?: string;
    description?: string;
    fullPage?: boolean;
}

interface Props {
    headline?: string;
    subheading?: string;
    text?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    textAlign?: 'left' | 'center' | 'right';
    image?: any;
    regions?: Region[];
    frameLabel?: string;
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'none' | 'compact' | 'default' | 'spacious';
}

export default function SpotlightTour({
    headline,
    subheading,
    text,
    headlineSize = 'medium',
    textAlign = 'left',
    image,
    regions = [],
    frameLabel,
    width = 'wide',
    background = 'none',
    spacing = 'default',
}: Props) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);

    const valid = regions.filter((r) => r && typeof r.x === 'number' && typeof r.y === 'number');
    const idx = Math.min(active, Math.max(0, valid.length - 1));
    const change = valid[idx];

    useLayoutEffect(() => {
        const vp = viewportRef.current;
        const content = contentRef.current;
        if (!vp || !content || !change) return;
        if (change.fullPage) {
            vp.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
            return;
        }
        const H = content.offsetHeight;
        const top = (change.y / 100) * H;
        const h = (change.h / 100) * H;
        const desired = top - (vp.clientHeight - h) / 2;
        vp.scrollTo({ top: Math.max(0, desired), behavior: reduce ? 'auto' : 'smooth' });
    }, [idx, reduce, change]);

    const imgUrl = image ? urlFor(image).width(1400).quality(85).url() : null;
    if (!imgUrl || valid.length === 0) return null;

    const go = (i: number) => setActive((i + valid.length) % valid.length);
    const color = COLORS[idx % COLORS.length];
    const isFrame = !!change.fullPage;

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            {(headline || subheading || text) && (
                <div className={cn('mb-8', textAlign === 'center' && 'text-center')}>
                    <BlockHeading headline={headline} subheading={subheading} headlineSize={headlineSize} textAlign={textAlign} />
                    {text && (
                        <p className={cn('whitespace-pre-wrap leading-relaxed text-base md:text-lg text-gray-600 max-w-3xl', textAlign === 'center' && 'mx-auto md:text-center')}>{text}</p>
                    )}
                </div>
            )}

            <div className="relative overflow-hidden rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-4 md:p-5">
                <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
                    {/* Browser frame */}
                    <div className="lg:col-span-9">
                        <div className="overflow-hidden rounded-xl border border-stone-900/10 bg-white shadow-sm">
                            <div className="flex items-center gap-1.5 border-b border-stone-900/10 px-3 py-2">
                                <span className="h-2 w-2 rounded-full bg-stone-300" />
                                <span className="h-2 w-2 rounded-full bg-stone-300" />
                                <span className="h-2 w-2 rounded-full bg-stone-300" />
                                <div className="ml-2 flex-1 rounded bg-stone-100 px-2 py-0.5 text-[9px] text-stone-400">{frameLabel || ' '}</div>
                            </div>
                            <div className="relative">
                                <div
                                    ref={viewportRef}
                                    className="h-[320px] overflow-auto overscroll-contain bg-white [scrollbar-width:thin] sm:h-[380px] lg:h-[460px]"
                                >
                                    <div ref={contentRef} className="relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imgUrl} alt={headline || 'Page screenshot'} className="block w-full" />
                                        <motion.div
                                            aria-hidden
                                            className="pointer-events-none absolute z-20 rounded-md"
                                            initial={false}
                                            animate={
                                                isFrame
                                                    ? { top: '0%', left: '0%', width: '100%', height: '100%', opacity: 1 }
                                                    : { top: `${change.y}%`, left: `${change.x}%`, width: `${change.w}%`, height: `${change.h}%`, opacity: 1 }
                                            }
                                            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 28 }}
                                            style={{ border: `2px solid ${color}`, boxShadow: isFrame ? 'none' : `0 0 0 9999px ${SCRIM}` }}
                                        />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-4 bg-gradient-to-b from-white to-transparent" />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-6 bg-gradient-to-t from-white to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* Step list */}
                    <div className="lg:col-span-3">
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Key changes</p>
                        <ol className="space-y-1.5">
                            {valid.map((c, i) => {
                                const on = i === idx;
                                const cc = COLORS[i % COLORS.length];
                                return (
                                    <li key={c._key || i}>
                                        <button
                                            type="button"
                                            aria-current={on}
                                            onClick={() => setActive(i)}
                                            className={cn('flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition-colors', on ? 'border-transparent bg-white shadow-sm' : 'border-transparent hover:bg-white/50')}
                                        >
                                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold transition-colors" style={on ? { backgroundColor: cc, color: 'white' } : { backgroundColor: `${cc}26`, color: '#57534e' }}>{i + 1}</span>
                                            <span className="min-w-0">
                                                <span className={cn('block text-[13px] font-semibold', on ? 'text-stone-800' : 'text-stone-500')}>{c.title || `Region ${i + 1}`}</span>
                                                {on && c.description && (
                                                    <motion.span initial={reduce ? false : { opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }} className="mt-1 block text-[11px] leading-snug text-stone-400">{c.description}</motion.span>
                                                )}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className="mt-3 flex items-center justify-between">
                            <button type="button" onClick={() => go(idx - 1)} className="rounded-md px-2 py-1 text-[11px] font-medium text-stone-500 transition-colors hover:bg-white hover:text-stone-800">← Prev</button>
                            <div className="flex items-center gap-1.5">
                                {valid.map((c, i) => (
                                    <button key={c._key || i} type="button" aria-label={c.title || `Region ${i + 1}`} onClick={() => setActive(i)} className="h-1.5 rounded-full transition-all" style={{ width: i === idx ? 16 : 6, backgroundColor: i === idx ? COLORS[i % COLORS.length] : '#d6d3d1' }} />
                                ))}
                            </div>
                            <button type="button" onClick={() => go(idx + 1)} className="rounded-md px-2 py-1 text-[11px] font-medium text-stone-500 transition-colors hover:bg-white hover:text-stone-800">Next →</button>
                        </div>
                    </div>
                </div>
            </div>
        </BlockWrapper>
    );
}
