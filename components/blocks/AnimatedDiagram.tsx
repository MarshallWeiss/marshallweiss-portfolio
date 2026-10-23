'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
import SectionsToTopics from './animated-diagrams/SectionsToTopics';
import TemplateMorph from './animated-diagrams/TemplateMorph';
import CompetingNeeds from './animated-diagrams/CompetingNeeds';
import HomepageArchitecture from './animated-diagrams/HomepageArchitecture';
import HomepageKeyChanges from './animated-diagrams/HomepageKeyChanges';

/**
 * AnimatedDiagram — a reusable block that renders a coded, on-brand animated
 * concept diagram alongside optional copy. The `variant` field selects which
 * diagram to draw; add new diagrams as entries in VARIANTS.
 */
const VARIANTS: Record<string, React.ComponentType> = {
    sectionsToTopics: SectionsToTopics,
    templateMorph: TemplateMorph,
    competingNeeds: CompetingNeeds,
    homepageArchitecture: HomepageArchitecture,
    homepageKeyChanges: HomepageKeyChanges,
};

interface AnimatedDiagramProps {
    variant?: string;
    headline?: string;
    subheading?: string;
    text?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    textAlign?: 'left' | 'center' | 'right';
    layout?: 'sideBySide' | 'fullWidth';
    reverseLayout?: boolean;
    mediaRatio?: '40/60' | '50/50' | '60/40' | '70/30';
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'none' | 'compact' | 'default' | 'spacious';
}

export default function AnimatedDiagram({
    variant = 'sectionsToTopics',
    headline,
    subheading,
    text,
    headlineSize = 'medium',
    textAlign = 'left',
    layout = 'sideBySide',
    reverseLayout = false,
    mediaRatio = '50/50',
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: AnimatedDiagramProps) {
    const Diagram = VARIANTS[variant] || SectionsToTopics;

    // Two tracks [text, diagram], or [diagram, text] when reversed (see SplitMedia).
    const gridTemplate = {
        '40/60': ['lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]', 'lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'],
        '50/50': ['lg:grid-cols-2', 'lg:grid-cols-2'],
        '60/40': ['lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]', 'lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]'],
        '70/30': ['lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]', 'lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]'],
    }[mediaRatio][reverseLayout ? 1 : 0];

    const hasText = Boolean(text || headline || subheading);

    const textContent = hasText ? (
        <div
            className={cn(
                'text-gray-600',
                layout !== 'sideBySide' && 'max-w-[65ch]',
                layout !== 'sideBySide' && textAlign === 'center' && 'mx-auto'
            )}
        >
            <BlockHeading headline={headline} subheading={subheading} headlineSize={headlineSize} textAlign={textAlign} />
            {text && (
                <p
                    className={cn(
                        'whitespace-pre-wrap leading-relaxed text-base md:text-lg',
                        textAlign === 'center' && 'md:text-center',
                        textAlign === 'right' && 'md:text-right'
                    )}
                >
                    {text}
                </p>
            )}
        </div>
    ) : null;

    const diagram = (
        <div
            className={cn(
                layout !== 'sideBySide' && 'w-full',
                layout === 'sideBySide' && reverseLayout && 'lg:order-first'
            )}
        >
            <Diagram />
        </div>
    );

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            {layout === 'sideBySide' && textContent ? (
                <div
                    className={cn(
                        'grid grid-cols-1 gap-12 lg:gap-16 items-center',
                        gridTemplate
                    )}
                >
                    {textContent}
                    {diagram}
                </div>
            ) : (
                <div className="space-y-10">
                    {textContent}
                    {diagram}
                </div>
            )}
        </BlockWrapper>
    );
}
