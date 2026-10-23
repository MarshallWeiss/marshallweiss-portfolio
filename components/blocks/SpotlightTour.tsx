'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

/** Scroll distance each step gets while the frame is pinned (desktop only). */
const STEP_VH = 30;

/** Sanity image refs encode the source size: image-<id>-<w>x<h>-<ext>. */
function imageSize(image: any): { w: number; h: number } | null {
    const ref: string | undefined = image?.asset?._ref;
    const m = ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
    return m ? { w: Number(m[1]), h: Number(m[2]) } : null;
}

/**
 * One region cropped out of the full screenshot, for small screens where the
 * pinned browser frame would shrink the page to unreadable text. Wide regions
 * keep at least half their source size and scroll sideways instead of shrinking.
 */
function RegionCrop({ src, size, region, alt }: { src: string; size: { w: number; h: number }; region: Region; alt: string }) {
    const regionW = (region.w / 100) * size.w;
    const regionH = (region.h / 100) * size.h;
    return (
        <div className="overflow-x-auto rounded-lg border border-stone-900/10 bg-white">
            <div
                className="relative overflow-hidden"
                style={{ width: `max(100%, ${Math.round(regionW * 0.5)}px)`, aspectRatio: `${regionW} / ${regionH}` }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="absolute max-w-none"
                    style={{
                        width: `${(100 / region.w) * 100}%`,
                        left: `${-(region.x / region.w) * 100}%`,
                        top: `${-(region.y / region.h) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
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
    const trackRef = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);
    // The site header is sticky, so the pinned frame sits below it, not under it.
    const [headerH, setHeaderH] = useState(0);
    useEffect(() => {
        const header = document.querySelector<HTMLElement>('.site-header');
        if (!header) return;
        const measure = () => setHeaderH(header.offsetHeight);
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(header);
        return () => ro.disconnect();
    }, []);

    const valid = regions.filter((r) => r && typeof r.x === 'number' && typeof r.y === 'number');
    const idx = Math.min(active, Math.max(0, valid.length - 1));
    const change = valid[idx];

    // Scroll-driven progression: the frame pins inside a tall track and the
    // active card advances as the track scrolls through the viewport.
    const { scrollYProgress } = useScroll({ target: trackRef, offset: [`start ${headerH}px`, 'end end'] });
    useMotionValueEvent(scrollYProgress, 'change', (p) => {
        const n = valid.length;
        if (n === 0) return;
        // Bias each step to the middle of its scroll segment so a card is shown
        // for the full span rather than flipping right at the boundary.
        const i = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
        setActive(i);
    });

    // Clicking a step/arrow scrolls the page to that step's segment; the scroll
    // listener above then sets the active card, keeping one source of truth.
    const scrollToStep = (i: number) => {
        const n = valid.length;
        const clamped = Math.min(n - 1, Math.max(0, i));
        const track = trackRef.current;
        if (!track || typeof window === 'undefined') {
            setActive(clamped);
            return;
        }
        const rect = track.getBoundingClientRect();
        const trackTop = rect.top + window.scrollY;
        const dist = rect.height - (window.innerHeight - headerH);
        const y = trackTop + ((clamped + 0.5) / n) * dist;
        window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' });
    };

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
    const size = imageSize(image);
    if (!imgUrl || valid.length === 0) return null;

    const color = COLORS[idx % COLORS.length];
    const isFrame = !!change.fullPage;

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            {/* Small screens: no pinning. Each change is a readable crop with its note. */}
            <div className="lg:hidden">
                {(headline || subheading || text) && (
                    <div className={cn('mb-6', textAlign === 'center' && 'text-center')}>
                        <BlockHeading headline={headline} subheading={subheading} headlineSize={headlineSize} textAlign={textAlign} className={text ? 'mb-4' : undefined} />
                        {text && (
                            <p className={cn('whitespace-pre-wrap leading-relaxed text-base md:text-lg text-gray-600 max-w-3xl', textAlign === 'center' && 'mx-auto md:text-center')}>{text}</p>
                        )}
                    </div>
                )}
                <ol className="space-y-8">
                    {valid.map((c, i) => {
                        const cc = COLORS[i % COLORS.length];
                        return (
                            <li key={c._key || i}>
                                <div className="mb-3 flex items-start gap-3">
                                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold text-white" style={{ backgroundColor: cc }}>{i + 1}</span>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-semibold text-stone-900">{c.title || `Change ${i + 1}`}</h3>
                                        {c.description && <p className="mt-1 text-[15px] leading-relaxed text-stone-600">{c.description}</p>}
                                    </div>
                                </div>
                                {size && <RegionCrop src={imgUrl} size={size} region={c} alt={c.title || headline || 'Detail of the page'} />}
                            </li>
                        );
                    })}
                </ol>
            </div>

            {/* Large screens: the frame pins and each step spotlights a region. */}
            <div ref={trackRef} className="relative hidden lg:block" style={{ height: `calc(${Math.max(valid.length, 1) * STEP_VH}vh + 100vh)` }}>
              <div className="sticky flex flex-col justify-center" style={{ top: headerH, minHeight: `calc(100vh - ${headerH}px)` }}>
                {(headline || subheading || text) && (
                    <div className={cn('mb-6', textAlign === 'center' && 'text-center')}>
                        <BlockHeading headline={headline} subheading={subheading} headlineSize={headlineSize} textAlign={textAlign} className={text ? 'mb-4' : undefined} />
                        {text && (
                            <p className={cn('whitespace-pre-wrap leading-relaxed text-base md:text-lg text-gray-600 max-w-3xl', textAlign === 'center' && 'mx-auto md:text-center')}>{text}</p>
                        )}
                    </div>
                )}
                <div className="relative w-full overflow-hidden rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-4 md:p-5">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
                    {/* Browser frame */}
                    <div className="lg:col-span-9">
                        <div className="overflow-hidden rounded-xl border border-stone-900/10 bg-white shadow-sm">
                            <div className="flex items-center gap-1.5 border-b border-stone-900/10 px-3 py-2">
                                <span className="h-2 w-2 rounded-full bg-stone-300" />
                                <span className="h-2 w-2 rounded-full bg-stone-300" />
                                <span className="h-2 w-2 rounded-full bg-stone-300" />
                                <div className="ml-2 flex-1 rounded bg-stone-100 px-2 py-0.5 text-[10px] text-stone-500">{frameLabel || ' '}</div>
                            </div>
                            <div className="relative">
                                <div
                                    ref={viewportRef}
                                    className="h-[min(560px,calc(100vh-400px))] min-h-[360px] overflow-hidden bg-white"
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
                        <p className="mb-2 text-xs font-semibold text-stone-600">Key changes</p>
                        <ol className="space-y-1.5">
                            {valid.map((c, i) => {
                                const on = i === idx;
                                const cc = COLORS[i % COLORS.length];
                                return (
                                    <li key={c._key || i}>
                                        <button
                                            type="button"
                                            aria-current={on}
                                            onClick={() => scrollToStep(i)}
                                            className={cn('flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left transition-colors', on ? 'border-transparent bg-white shadow-sm' : 'border-transparent hover:bg-white/50')}
                                        >
                                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-colors" style={on ? { backgroundColor: cc, color: 'white' } : { backgroundColor: `${cc}26`, color: '#57534e' }}>{i + 1}</span>
                                            <span className="min-w-0">
                                                <span className={cn('block text-sm font-semibold', on ? 'text-stone-900' : 'text-stone-600')}>{c.title || `Region ${i + 1}`}</span>
                                                {on && c.description && (
                                                    <motion.span initial={reduce ? false : { opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }} className="mt-1 block text-[13px] leading-snug text-stone-600">{c.description}</motion.span>
                                                )}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className="mt-3 flex items-center justify-between">
                            <button type="button" onClick={() => scrollToStep(idx - 1)} aria-label="Previous change" className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:bg-white hover:text-stone-900"><ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />Prev</button>
                            <div className="flex items-center gap-1.5">
                                {valid.map((c, i) => (
                                    <button key={c._key || i} type="button" aria-label={c.title || `Region ${i + 1}`} onClick={() => scrollToStep(i)} className="grid h-6 place-items-center px-0.5"><span className="block h-1.5 rounded-full transition-all" style={{ width: i === idx ? 16 : 6, backgroundColor: i === idx ? COLORS[i % COLORS.length] : '#a8a29e' }} /></button>
                                ))}
                            </div>
                            <button type="button" onClick={() => scrollToStep(idx + 1)} aria-label="Next change" className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:bg-white hover:text-stone-900">Next<ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /></button>
                        </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
        </BlockWrapper>
    );
}
