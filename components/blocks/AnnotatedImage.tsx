'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading, { childHeadingTag } from './BlockHeading';
import MediaPlaceholder, { SHOW_PENDING_MEDIA } from './MediaPlaceholder';
import MediaItem from './MediaItem';

interface Hotspot {
    _key: string;
    x: number;
    y: number;
    title: string;
    description: string;
    type: 'problem' | 'improvement' | 'neutral';
}

interface AnnotatedImageProps {
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    description?: string;
    textAlign?: 'left' | 'center' | 'right';
    image?: any;
    hotspots?: Hotspot[];
    layout?: 'overlay' | 'sideBySide';
    reverseLayout?: boolean;
    showLegend?: boolean;
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function AnnotatedImage({
    headline,
    subheading,
    headlineSize,
    description,
    textAlign = 'center',
    image,
    hotspots = [],
    layout = 'overlay',
    reverseLayout = false,
    showLegend = true,
    aspectRatio = 'auto',
    objectFit = 'cover',
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: AnnotatedImageProps) {
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
    const [hoveredLegendItem, setHoveredLegendItem] = useState<string | null>(null);

    if (!image && !SHOW_PENDING_MEDIA) return null;

    const alignmentClass = textAlign === 'center' ? 'text-left md:text-center' : textAlign === 'right' ? 'text-left md:text-right' : 'text-left';
    const isSideBySide = layout === 'sideBySide';

    const getHotspotColor = (type: string) => {
        switch (type) {
            case 'problem':
                return {
                    bg: 'bg-red-500',
                    bgPulse: 'bg-red-400',
                    border: 'border-red-500',
                    text: 'text-red-600',
                    bgLight: 'bg-red-50',
                    ring: 'ring-red-500/30',
                };
            case 'improvement':
                return {
                    bg: 'bg-green-500',
                    bgPulse: 'bg-green-400',
                    border: 'border-green-500',
                    text: 'text-green-600',
                    bgLight: 'bg-green-50',
                    ring: 'ring-green-500/30',
                };
            default:
                return {
                    bg: 'bg-blue-500',
                    bgPulse: 'bg-blue-400',
                    border: 'border-blue-500',
                    text: 'text-blue-600',
                    bgLight: 'bg-blue-50',
                    ring: 'ring-blue-500/30',
                };
        }
    };

    const HotspotTitle = childHeadingTag(headlineSize);

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'problem':
                return 'Problem';
            case 'improvement':
                return 'Improvement';
            default:
                return 'Note';
        }
    };

    // Render the annotated image with hotspot markers and tooltips
    const renderAnnotatedImage = () => !image ? (
        <MediaPlaceholder label={headline || 'Annotated image'} />
    ) : (
        <div className="relative">
            <MediaItem
                image={image}
                alt={(image?.alt || headline || '').trim()}
                aspectRatio={aspectRatio}
                objectFit={objectFit}
            />

            {/* Hotspot markers */}
            {hotspots.map((hotspot, index) => {
                const colors = getHotspotColor(hotspot.type);
                const isActive = activeHotspot === hotspot._key || hoveredLegendItem === hotspot._key;

                // The numbered marker sits just off the point it annotates, tied to
                // it by a short leader, so it never covers the thing it points at.
                const flipX = hotspot.x > 85;
                const flipY = hotspot.y < 12;
                const offsetX = flipX ? 'calc(-100% - 10px)' : '10px';
                const offsetY = flipY ? '10px' : 'calc(-100% - 10px)';

                return (
                    <div
                        key={hotspot._key}
                        className="absolute"
                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    >
                        {/* Anchor dot and leader on the annotated point */}
                        <span
                            aria-hidden="true"
                            className={cn('absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow', colors.bg)}
                        />
                        <span
                            aria-hidden="true"
                            className="absolute h-px w-4 origin-left bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.25)]"
                            style={{
                                transform: `rotate(${flipX ? (flipY ? 135 : -135) : (flipY ? 45 : -45)}deg)`,
                            }}
                        />
                        <div
                            className="absolute"
                            style={{ transform: `translate(${offsetX}, ${offsetY})` }}
                        >
                        {/* Hotspot button */}
                        <button
                            className={cn(
                                'relative w-7 h-7 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110 focus:outline-none focus:ring-4',
                                colors.bg,
                                colors.ring,
                                isActive && 'scale-125 ring-4'
                            )}
                            onMouseEnter={() => setActiveHotspot(hotspot._key)}
                            onMouseLeave={() => setActiveHotspot(null)}
                            onClick={() => setActiveHotspot(isActive ? null : hotspot._key)}
                            aria-label={`Hotspot ${index + 1}: ${hotspot.title}`}
                        >
                            {index + 1}
                        </button>

                        {/* Tooltip — desktop: beside hotspot, mobile: below image */}
                        {isActive && (
                            <>
                                {/* Desktop tooltip */}
                                <div
                                    className={cn(
                                        'hidden md:block absolute z-20 w-72 p-4 rounded-lg shadow-xl border bg-white',
                                        'animate-fade-slide'
                                    )}
                                    style={{
                                        left: hotspot.x > 70 ? 'auto' : '100%',
                                        right: hotspot.x > 70 ? '100%' : 'auto',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        marginLeft: hotspot.x > 70 ? 0 : 12,
                                        marginRight: hotspot.x > 70 ? 12 : 0,
                                        '--slide-direction': hotspot.x > 70 ? '10px' : '-10px',
                                    } as any}
                                    onMouseEnter={() => setActiveHotspot(hotspot._key)}
                                    onMouseLeave={() => setActiveHotspot(null)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={cn(
                                                'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold',
                                                colors.bg
                                            )}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={cn('text-xs font-medium uppercase tracking-wide', colors.text)}>
                                                    {getTypeLabel(hotspot.type)}
                                                </span>
                                            </div>
                                            <HotspotTitle className="font-medium text-gray-900 mb-1">
                                                {hotspot.title}
                                            </HotspotTitle>
                                            {hotspot.description && (
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {hotspot.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        </div>
                    </div>
                );
            })}

        </div>
    );

    // Render legend cards
    const renderLegend = () => {
        if (!showLegend || hotspots.length === 0) return null;

        return (
            <div className={cn(
                isSideBySide ? 'space-y-4' : 'mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'
            )}>
                {hotspots.map((hotspot, index) => {
                    const colors = getHotspotColor(hotspot.type);
                    const isActive = activeHotspot === hotspot._key || hoveredLegendItem === hotspot._key;

                    return (
                        <div
                            key={hotspot._key}
                            className={cn(
                                'p-4 rounded-lg border transition-all cursor-pointer',
                                isActive ? `${colors.bgLight} ${colors.border} shadow-md` : 'bg-white border-gray-200 hover:border-gray-300'
                            )}
                            onMouseEnter={() => setHoveredLegendItem(hotspot._key)}
                            onMouseLeave={() => setHoveredLegendItem(null)}
                            onClick={() => setActiveHotspot(isActive ? null : hotspot._key)}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={cn(
                                        'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold',
                                        colors.bg
                                    )}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={cn('text-xs font-medium uppercase tracking-wide', colors.text)}>
                                            {getTypeLabel(hotspot.type)}
                                        </span>
                                    </div>
                                    <HotspotTitle className="font-medium text-gray-900">
                                        {hotspot.title}
                                    </HotspotTitle>
                                    {hotspot.description && (
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                                            {hotspot.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Mobile tooltip overlay — fixed to center of screen, tap backdrop to dismiss
    const renderMobileTooltip = () => {
        const activeIdx = hotspots.findIndex(h => h._key === activeHotspot);
        if (activeIdx === -1) return null;
        const hotspot = hotspots[activeIdx];
        const colors = getHotspotColor(hotspot.type);
        return (
            <div
                className="md:hidden fixed inset-0 z-50 flex items-center justify-center px-6"
                onClick={() => setActiveHotspot(null)}
            >
                <div className="absolute inset-0 bg-black/20" />
                <div
                    className="relative w-full max-w-sm p-4 rounded-lg shadow-xl border bg-white animate-fade-slide"
                    style={{ '--slide-direction': '0px' } as any}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-start gap-3">
                        <div className={cn('flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold', colors.bg)}>
                            {activeIdx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={cn('text-xs font-medium uppercase tracking-wide', colors.text)}>
                                    {getTypeLabel(hotspot.type)}
                                </span>
                            </div>
                            <p className="font-medium text-gray-900 mb-1">{hotspot.title}</p>
                            {hotspot.description && (
                                <p className="text-sm text-gray-600 leading-relaxed">{hotspot.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Side-by-side layout: text on one side, annotated image on the other
    if (isSideBySide) {
        const textContent = (
            <div className="flex flex-col justify-center">
                <BlockHeading
                    headline={headline}
                    subheading={subheading}
                    headlineSize={headlineSize}
                    textAlign="left"
                    className=""
                />
                {description && (
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                        {description}
                    </p>
                )}
                {renderLegend()}
            </div>
        );

        const imageContent = (
            <div className={cn(reverseLayout && 'lg:order-first')}>
                {renderAnnotatedImage()}
            </div>
        );

        return (
            <>
                <BlockWrapper width={width} background={background} spacing={spacing}>
                    <div className={cn(
                        // Two tracks, text 5 : image 7 (see SplitMedia for why not 12 columns)
                        'grid grid-cols-1 gap-8 lg:gap-12 items-center',
                        reverseLayout
                            ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]'
                            : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'
                    )}>
                        {textContent}
                        {imageContent}
                    </div>
                </BlockWrapper>
                {renderMobileTooltip()}
            </>
        );
    }

    // Overlay layout: image full width with hotspots, text above, legend below
    return (
        <>
            <BlockWrapper width={width} background={background} spacing={spacing}>
                <BlockHeading
                    headline={headline}
                    subheading={subheading}
                    headlineSize={headlineSize}
                    textAlign={textAlign}
                    className=""
                />
                {description && (
                    <p className={cn("text-gray-600 text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-3xl", alignmentClass, textAlign === 'center' && "md:mx-auto")}>
                        {description}
                    </p>
                )}
                {renderAnnotatedImage()}
                {renderLegend()}
            </BlockWrapper>
            {renderMobileTooltip()}
        </>
    );
}
