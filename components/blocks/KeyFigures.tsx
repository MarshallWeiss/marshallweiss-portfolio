'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';

/**
 * KeyFigures: a row of two to four headline numbers, each with a plain label
 * and a caveat that says exactly what was measured. The number counts up once
 * when it scrolls into view; the caveat is always visible, never a tooltip.
 */

interface Figure {
    _key?: string;
    value: string;
    label?: string;
    caveat?: string;
}

interface KeyFiguresProps {
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    description?: string;
    figures?: Figure[];
    textAlign?: 'left' | 'center' | 'right';
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'none' | 'compact' | 'default' | 'spacious';
}

/** Split "+3.4 pts" into prefix "+", number 3.4, suffix " pts", decimals 1. */
function parseValue(value: string) {
    const match = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) return null;
    const [, prefix, raw, suffix] = match;
    const separator = raw.includes(',') ? ',' : '.';
    const decimals = raw.includes(separator) ? raw.split(separator)[1].length : 0;
    return { prefix, target: parseFloat(raw.replace(',', '.')), suffix, decimals, separator };
}

function CountUp({ value, play }: { value: string; play: boolean }) {
    const parsed = parseValue(value);
    const [shown, setShown] = useState(parsed ? 0 : NaN);

    useEffect(() => {
        if (!parsed || !play) return;
        const { target } = parsed;
        const duration = 1100;
        let start = 0;
        let frame = 0;
        const step = (t: number) => {
            if (!start) start = t;
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setShown(target * eased);
            if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [play, value]);

    if (!parsed) return <>{value}</>;
    const n = play ? shown : 0;
    const text = n.toFixed(parsed.decimals).replace('.', parsed.separator);
    return (
        <>
            {parsed.prefix}
            <span className="tabular-nums">{text}</span>
            {parsed.suffix}
        </>
    );
}

export default function KeyFigures({
    headline,
    subheading,
    headlineSize = 'medium',
    description,
    figures,
    textAlign = 'left',
    width = 'wide',
    background = 'none',
    spacing = 'compact',
}: KeyFiguresProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
    const reduce = useReducedMotion();
    const play = inView || Boolean(reduce);

    if (!figures || figures.length === 0) return null;

    const columns = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    }[Math.min(4, Math.max(1, figures.length)) as 1 | 2 | 3 | 4];

    const align = textAlign === 'center' ? 'md:text-center' : textAlign === 'right' ? 'md:text-right' : '';

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <BlockHeading headline={headline} subheading={subheading} headlineSize={headlineSize} textAlign={textAlign} />
            {description && (
                <p className={cn('mb-8 max-w-3xl text-base text-gray-600 md:text-lg', align, textAlign === 'center' && 'md:mx-auto')}>
                    {description}
                </p>
            )}
            <div ref={ref} className={cn('grid grid-cols-1 gap-x-10 gap-y-8', columns)}>
                {figures.map((f, i) => (
                    <div
                        key={f._key || i}
                        className={cn('border-t border-gray-300 pt-5', align)}
                        style={{ transitionDelay: `${i * 80}ms` }}
                    >
                        <p className="font-display text-5xl leading-none tracking-[-0.04em] text-gray-900 md:text-6xl">
                            {reduce ? f.value : <CountUp value={f.value} play={play} />}
                        </p>
                        {f.label && (
                            <p className="mt-4 text-sm font-medium leading-snug text-gray-900 md:text-base">{f.label}</p>
                        )}
                        {f.caveat && (
                            <p className="mt-1.5 max-w-xs text-xs leading-snug text-gray-500 md:text-[13px]">{f.caveat}</p>
                        )}
                    </div>
                ))}
            </div>
        </BlockWrapper>
    );
}
