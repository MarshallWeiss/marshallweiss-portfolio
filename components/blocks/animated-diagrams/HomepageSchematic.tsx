'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared schematic of the redesigned El Confidencial home page — one full page,
 * top to bottom: the OPENING (apertura), a feed of topic ISSUES with an ad rail,
 * the highlighted SECTIONS, smaller SECONDARY sections, MORE news, and a footer.
 *
 * Used by the interactive scroll diagram (HomepageArchitecture). Pass `zoneRef`
 * to capture each zone's DOM node for scroll-position tracking.
 */

type ZoneId = 'opening' | 'issues' | 'sections' | 'secondary' | 'more';

export const ZONES: { id: ZoneId; name: string; desc: string; color: string }[] = [
    { id: 'opening', name: 'Opening', desc: "The day's lead (apertura), with opinion alongside", color: '#BE7257' },
    { id: 'issues', name: 'Issues', desc: 'Six or seven topic clusters, the new organizing layer', color: '#7C9CB0' },
    { id: 'sections', name: 'Highlighted sections', desc: 'Classic sections: España, Economía, Internacional', color: '#D29A57' },
    { id: 'secondary', name: 'Secondary sections', desc: 'Smaller verticals: Cultura, Tecnología, Deportes', color: '#9DB29C' },
    { id: 'more', name: 'More news', desc: 'Subscriber picks and services', color: '#B58AA0' },
];

// Real masthead logo; falls back to a placeholder bar if it can't load.
const LOGO_SRC = '/case-studies/home/elconfidencial-logo.svg';

const HBAR = { sm: 'h-1.5', md: 'h-2', lg: 'h-2.5' } as const;

function Tag({ color, w = 'w-7' }: { color: string; w?: string }) {
    return <div className={cn('mb-1 h-1 rounded-sm opacity-70', w)} style={{ backgroundColor: color }} />;
}

function Headline({ lines = 2, size = 'sm', last = '70%' }: { lines?: number; size?: keyof typeof HBAR; last?: string }) {
    return (
        <div className="space-y-1">
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className={cn('rounded-full bg-stone-300', HBAR[size])} style={{ width: i === lines - 1 ? last : '100%' }} />
            ))}
        </div>
    );
}

function Body({ lines = 2 }: { lines?: number }) {
    return (
        <div className="mt-1.5 space-y-1">
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className="h-1 rounded-full bg-stone-200/80" style={{ width: i === lines - 1 ? '55%' : '100%' }} />
            ))}
        </div>
    );
}

function Meta() {
    return (
        <div className="mt-1.5 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-stone-200/80" />
            <span className="h-1 w-9 rounded-full bg-stone-200/80" />
        </div>
    );
}

function LeadStory({ color, body = 0, hLines = 2, className }: { color: string; body?: number; hLines?: number; className?: string }) {
    return (
        <div className={className}>
            <div className="mb-1.5 aspect-[3/2] w-full rounded" style={{ backgroundColor: `${color}26` }} />
            <Tag color={color} />
            <Headline lines={hLines} />
            {body > 0 && <Body lines={body} />}
            <Meta />
        </div>
    );
}

function SideStory({ color, className }: { color: string; className?: string }) {
    return (
        <div className={cn('flex gap-2', className)}>
            <div className="min-w-0 flex-1">
                <Tag color={color} />
                <Headline lines={2} />
                <Meta />
            </div>
            <div className="aspect-[3/2] w-14 shrink-0 self-start rounded" style={{ backgroundColor: `${color}26` }} />
        </div>
    );
}

function SupportColumn({ color, n = 3, className }: { color: string; n?: number; className?: string }) {
    return (
        <div className={cn('divide-y divide-stone-900/5', className)}>
            {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="py-2 first:pt-0 last:pb-0">
                    <Tag color={color} />
                    <Headline lines={2} />
                    <Meta />
                </div>
            ))}
        </div>
    );
}

function AdSlot({ className }: { className?: string }) {
    return (
        <div className={cn('flex min-h-[80px] items-center justify-center rounded-md border border-dashed border-stone-300 bg-stone-100/60', className)}>
            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-stone-400">Publicidad</span>
        </div>
    );
}

function SectionHead({ name, color }: { name: string; color: string }) {
    return (
        <div className="mb-2 flex items-center gap-2">
            <div className="text-[9px] font-semibold uppercase tracking-wider" style={{ color }}>{name}</div>
            <div className="h-px flex-1" style={{ backgroundColor: `${color}44` }} />
        </div>
    );
}

function ZoneLabel({ name, color }: { name: string; color: string }) {
    return (
        <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500">{name}</span>
        </div>
    );
}

const SECTIONS = ['España', 'Economía', 'Internacional'];
const SECONDARY = ['Cultura y arte', 'Tecnología', 'Salud', 'Estilo de vida', 'Deportes'];
const C = ZONES;

interface Props {
    /** Callback to capture each zone's DOM node (index → element). */
    zoneRef?: (index: number, el: HTMLDivElement | null) => void;
    className?: string;
}

const HomepageSchematic = forwardRef<HTMLDivElement, Props>(function HomepageSchematic({ zoneRef, className }, ref) {
    const [logoFailed, setLogoFailed] = useState(false);
    const setZone = (k: number) => (el: HTMLDivElement | null) => zoneRef?.(k, el);

    const issueLabel = (w: number) => (
        <div className="mb-1.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: C[1].color }} />
            <div className="h-2 rounded-full opacity-70" style={{ width: w, backgroundColor: C[1].color }} />
        </div>
    );
    // Full-width issue: text left · image · supporting article column.
    const fullIssue = (w: number) => (
        <div>
            {issueLabel(w)}
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4 self-center">
                    <Tag color={C[1].color} />
                    <Headline lines={2} size="md" />
                    <Body lines={1} />
                    <Meta />
                </div>
                <div className="col-span-5 aspect-[3/2] self-start rounded" style={{ backgroundColor: `${C[1].color}26` }} />
                <SupportColumn color={C[1].color} n={2} className="col-span-3" />
            </div>
        </div>
    );

    return (
        <div ref={ref} className={className ?? 'space-y-9 px-3 py-4'}>
            {/* ===== OPENING ===== */}
            <div ref={setZone(0)}>
                {/* masthead */}
                <div className="mb-3 space-y-2 border-b border-stone-900/10 pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-8 rounded-full bg-stone-200/80" />
                            <div className="h-1.5 w-12 rounded-full bg-stone-200/80" />
                        </div>
                        <div className="h-1.5 w-10 rounded-full bg-stone-200/80" />
                    </div>
                    <div className="grid grid-cols-3 items-center">
                        <div className="h-1.5 w-10 rounded-full bg-stone-200/80" />
                        <div className="relative mx-auto flex h-5 items-center justify-center">
                            {logoFailed ? (
                                <div className="h-3.5 w-28 rounded bg-stone-700" />
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={LOGO_SRC} alt="El Confidencial" onError={() => setLogoFailed(true)} className="h-5 w-auto object-contain" />
                            )}
                        </div>
                        <div className="ml-auto h-4 w-14 rounded opacity-80" style={{ backgroundColor: C[0].color }} />
                    </div>
                    <div className="flex items-center justify-center gap-2.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="h-1.5 w-8 rounded-full bg-stone-200/80" />
                        ))}
                    </div>
                </div>

                <ZoneLabel name="Opening — apertura" color={C[0].color} />
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-4">
                        <Tag color={C[0].color} w="w-12" />
                        <Headline lines={3} size="lg" last="60%" />
                        <Body lines={3} />
                        <Meta />
                        <div className="mt-2 border-t border-stone-900/10 pt-2">
                            <Headline lines={2} />
                            <Meta />
                        </div>
                    </div>
                    <div className="col-span-4 aspect-[4/5] self-start rounded" style={{ backgroundColor: `${C[0].color}2e` }} />
                    <div className="col-span-4">
                        <SupportColumn color={C[0].color} n={4} />
                    </div>
                </div>

                <div className="mt-6">
                    <SectionHead name="Opinión" color={C[0].color} />
                    <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <LeadStory key={i} color={C[0].color} hLines={2} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== ISSUES ===== */}
            <div ref={setZone(1)}>
                <ZoneLabel name="Issues — topics" color={C[1].color} />

                {/* Issue 1 — full width, text left */}
                {fullIssue(56)}

                {/* Issues 2 & 3 — 3/4 width, with an ad rail */}
                <div className="mt-6 grid grid-cols-12 gap-3">
                    <div className="col-span-9 space-y-5">
                        {[0, 1].map((bi) => (
                            <div key={bi}>
                                {issueLabel(64 + bi * 18)}
                                <div className="flex gap-3">
                                    <div className="min-w-0 flex-[5]">
                                        <Tag color={C[1].color} />
                                        <Headline lines={2} size="md" />
                                        <Body lines={1} />
                                        <Meta />
                                    </div>
                                    <div className="aspect-[3/2] flex-[4] self-start rounded" style={{ backgroundColor: `${C[1].color}26` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <AdSlot className="col-span-3" />
                </div>

                {/* Issues 4 & 5 — full width, text left */}
                <div className="mt-6 space-y-5">
                    {fullIssue(80)}
                    {fullIssue(48)}
                </div>
            </div>

            {/* ===== SECTIONS ===== */}
            <div ref={setZone(2)}>
                <ZoneLabel name="Highlighted sections" color={C[2].color} />
                <div className="space-y-5">
                    {SECTIONS.map((s) => (
                        <div key={s}>
                            <SectionHead name={s} color={C[2].color} />
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-4 self-center">
                                    <Tag color={C[2].color} />
                                    <Headline lines={3} size="md" last="65%" />
                                    <Body lines={2} />
                                    <Meta />
                                </div>
                                <div className="col-span-5 aspect-[3/2] self-start rounded" style={{ backgroundColor: `${C[2].color}26` }} />
                                <SupportColumn color={C[2].color} n={2} className="col-span-3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== SECONDARY ===== */}
            <div ref={setZone(3)}>
                <ZoneLabel name="Secondary sections" color={C[3].color} />
                <div className="grid grid-cols-3 gap-x-3 gap-y-6">
                    {SECONDARY.map((s) => (
                        <div key={s}>
                            <SectionHead name={s} color={C[3].color} />
                            <LeadStory color={C[3].color} hLines={2} />
                            <div className="mt-2 space-y-1.5 border-t border-stone-900/5 pt-2">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i}>
                                        <Headline lines={1} last="85%" />
                                        <Meta />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <AdSlot />
                </div>
            </div>

            {/* ===== MORE NEWS ===== */}
            <div ref={setZone(4)}>
                <ZoneLabel name="More news & services" color={C[4].color} />
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-7 divide-y divide-stone-900/5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <SideStory key={i} color={C[4].color} className="py-2 first:pt-0 last:pb-0" />
                        ))}
                    </div>
                    <div className="col-span-5">
                        <div className="mb-1.5 text-[8px] font-semibold uppercase tracking-wider text-stone-400">Para ti</div>
                        <SupportColumn color={C[4].color} n={3} />
                    </div>
                </div>
            </div>

            {/* ===== FOOTER — signals the end and the loop back to the top ===== */}
            <div className="-mx-3 -mb-4">
                <div className="flex items-center justify-end gap-1 border-t border-stone-200 px-3 py-2">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M3 7l3-3 3 3" stroke="#a8a29e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-stone-400">Volver arriba</span>
                </div>
                <div className="bg-stone-900 px-3 pb-4 pt-3">
                    <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-3">
                        {logoFailed ? (
                            <div className="h-3 w-24 rounded bg-white/80" />
                        ) : (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={LOGO_SRC} alt="" className="h-3.5 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
                        )}
                        <div className="flex flex-1 items-center gap-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-1.5 w-8 rounded-full bg-white/25" />
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            ['70%', '55%', '80%', '60%', '65%', '50%'],
                            ['65%', '55%', '70%', '50%'],
                            ['60%', '70%', '55%', '65%', '50%'],
                            ['70%', '60%', '55%', '65%'],
                        ].map((col, ci) => (
                            <div key={ci} className="space-y-1.5">
                                <div className="mb-2 h-1.5 w-2/3 rounded-full bg-white/40" />
                                {col.map((w, li) => (
                                    <div key={li} className="h-1 rounded-full bg-white/15" style={{ width: w }} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-1 w-10 rounded-full bg-white/20" />
                        ))}
                    </div>
                    <div className="mt-2 h-1 w-3/4 rounded-full bg-white/10" />
                </div>
            </div>
        </div>
    );
});

export default HomepageSchematic;
