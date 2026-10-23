'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SectionNavItem {
    id: string;
    label: string;
}

/**
 * "On this page" for long case studies. A small pill pinned to the bottom of
 * the viewport names the section you're in and how far through the study you
 * are; it opens a list to jump between sections. It stays out of the way: it
 * appears after the opening, and hides once the next-study links are in view.
 */
export default function SectionNav({ items }: { items: SectionNavItem[] }) {
    const [active, setActive] = useState(-1);
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const update = useCallback(() => {
        const vh = window.innerHeight;
        const line = vh * 0.35;
        let current = -1;
        items.forEach((item, i) => {
            const el = document.getElementById(item.id);
            if (el && el.getBoundingClientRect().top <= line) current = i;
        });
        setActive(current);

        const main = document.getElementById('case-study-body');
        if (main) {
            const rect = main.getBoundingClientRect();
            const total = rect.height - vh;
            setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0);
            // Show after the opening screen; hide once the body has scrolled away.
            setVisible(-rect.top > vh * 0.6 && rect.bottom > vh * 0.75);
        }
    }, [items]);

    useEffect(() => {
        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [update]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        const onPointer = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onPointer);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onPointer);
        };
    }, [open]);

    useEffect(() => {
        if (!visible) setOpen(false);
    }, [visible]);

    if (items.length < 2) return null;

    const current = active >= 0 ? items[active] : null;

    return (
        <div
            ref={rootRef}
            className={cn(
                'fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-all duration-300 ease-out md:bottom-6',
                visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
            )}
            aria-hidden={!visible}
        >
            <nav aria-label="On this page" className="relative w-full max-w-sm">
                {open && (
                    <ol
                        id="section-nav-list"
                        className="absolute inset-x-0 bottom-full mb-2 max-h-[60vh] overflow-y-auto rounded-xl border border-stone-900/10 bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(28,25,23,0.25)]"
                    >
                        {items.map((item, i) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    aria-current={i === active ? 'location' : undefined}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        'flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-stone-100 focus-visible:bg-stone-100',
                                        i === active ? 'font-semibold text-stone-900' : 'text-stone-600'
                                    )}
                                >
                                    <span className="w-4 shrink-0 text-right text-xs tabular-nums text-stone-500">{i + 1}</span>
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ol>
                )}
                <button
                    ref={buttonRef}
                    type="button"
                    tabIndex={visible ? 0 : -1}
                    aria-expanded={open}
                    aria-controls="section-nav-list"
                    onClick={() => setOpen((o) => !o)}
                    className="relative flex w-full items-center gap-3 overflow-hidden rounded-full border border-stone-900/10 bg-white pb-3 pt-2.5 pl-4 pr-3 text-left shadow-[0_8px_24px_-6px_rgba(28,25,23,0.22)] transition-colors hover:bg-stone-50"
                >
                    <span className="shrink-0 text-xs tabular-nums text-stone-500">
                        {active >= 0 ? active + 1 : '–'} / {items.length}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-stone-900">
                        {current ? current.label : 'On this page'}
                    </span>
                    <ChevronUp
                        className={cn('h-4 w-4 shrink-0 text-stone-500 transition-transform', !open && 'rotate-180')}
                        aria-hidden="true"
                    />
                    <span aria-hidden="true" className="absolute inset-x-6 bottom-1 h-0.5 overflow-hidden rounded-full bg-stone-200">
                        <span
                            className="block h-full rounded-full bg-stone-700 transition-[width] duration-150"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </span>
                </button>
            </nav>
        </div>
    );
}
