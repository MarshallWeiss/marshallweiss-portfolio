'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
import SectionsToTopics from './animated-diagrams/SectionsToTopics';
import TemplateMorph from './animated-diagrams/TemplateMorph';
import CompetingNeeds from './animated-diagrams/CompetingNeeds';
import HomepageArchitecture from './animated-diagrams/HomepageArchitecture';

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

    const columnSpans = {
        '40/60': { media: 'md:col-span-5', text: 'md:col-span-7' },
        '50/50': { media: 'md:col-span-6', text: 'md:col-span-6' },
        '60/40': { media: 'md:col-span-7', text: 'md:col-span-5' },
        '70/30': { media: 'md:col-span-8', text: 'md:col-span-4' },
    }[mediaRatio];

    const hasText = Boolean(text || headline || subheading);

    const textContent = hasText ? (
        <div
            className={cn(
                'text-gray-600',
                layout === 'sideBySide' ? columnSpans.text : 'max-w-3xl',
                layout !== 'sideBySide' && textAlign === 'center' && 'mx-auto',
                layout === 'sideBySide' && reverseLayout && 'md:col-start-auto md:row-start-1'
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
                layout === 'sideBySide' ? columnSpans.media : 'w-full',
                layout === 'sideBySide' && reverseLayout && 'md:col-start-1 md:row-start-1'
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
                        'grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center',
                        reverseLayout && 'md:grid-flow-dense'
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
