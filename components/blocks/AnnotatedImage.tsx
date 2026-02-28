'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
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

    if (!image) return null;

    const alignmentClass = textAlign === 'center' ? 'text-left md:text-center' : textAlign === 'right' ? 'text-left md:text-right' : 'text-left';
    const isSideBySide = layout === 'sideBySide';

    const getHotspotColor = (type: string) => {
        switch (type) {
            case 'problem':
                return {
                    bg: 'bg-red-500',
                    border: 'border-red-500',
                    text: 'text-red-600',
                    bgLight: 'bg-red-50',
                    ring: 'ring-red-500/30',
                };
            case 'improvement':
                return {
                    bg: 'bg-green-500',
                    border: 'border-green-500',
                    text: 'text-green-600',
                    bgLight: 'bg-green-50',
                    ring: 'ring-green-500/30',
                };
            default:
                return {
                    bg: 'bg-blue-500',
                    border: 'border-blue-500',
                    text: 'text-blue-600',
                    bgLight: 'bg-blue-50',
                    ring: 'ring-blue-500/30',
                };
        }
    };

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
    const renderAnnotatedImage = () => (
        <div className="relative">
            <MediaItem
                image={image}
                alt={headline || 'Annotated image'}
                aspectRatio={aspectRatio}
                objectFit={objectFit}
            />

            {/* Hotspot markers */}
            {hotspots.map((hotspot, index) => {
                const colors = getHotspotColor(hotspot.type);
                const isActive = activeHotspot === hotspot._key || hoveredLegendItem === hotspot._key;

                return (
                    <div
                        key={hotspot._key}
                        className="absolute"
                        style={{
                            left: `${hotspot.x}%`,
                            top: `${hotspot.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {/* Pulsing ring animation */}
                        <div
                            className={cn(
                                'absolute inset-0 rounded-full animate-ping opacity-75',
                                colors.bg
                            )}
                            style={{
                                width: 32,
                                height: 32,
                                marginLeft: -16,
                                marginTop: -16,
                                animationDuration: '2s',
                            }}
                        />

                        {/* Hotspot button */}
                        <button
                            className={cn(
                                'relative w-8 h-8 rounded-full border-[3px] border-white shadow-lg flex items-center justify-center text-white text-sm font-bold transition-transform hover:scale-110 focus:outline-none focus:ring-4',
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
                                            <h4 className="font-medium text-gray-900 mb-1">
                                                {hotspot.title}
                                            </h4>
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
                                    <h4 className="font-medium text-gray-900">
                                        {hotspot.title}
                                    </h4>
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
                            <h4 className="font-medium text-gray-900 mb-1">{hotspot.title}</h4>
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
            <div className={cn(
                'md:col-span-5 flex flex-col justify-center',
                reverseLayout && 'md:col-start-8'
            )}>
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
            <div className={cn(
                'md:col-span-7',
                reverseLayout && 'md:col-start-1 md:row-start-1'
            )}>
                {renderAnnotatedImage()}
            </div>
        );

        return (
            <>
                <BlockWrapper width={width} background={background} spacing={spacing}>
                    <div className={cn(
                        'grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center',
                        reverseLayout && 'md:grid-flow-dense'
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
                    <p className={cn("text-gray-600 text-base md:text-lg leading-relaxed mb-10 md:mb-14", alignmentClass)}>
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
