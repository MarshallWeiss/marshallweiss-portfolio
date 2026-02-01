'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';

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
    description?: string;
    image?: any;
    hotspots?: Hotspot[];
    showLegend?: boolean;
}

export default function AnnotatedImage({
    headline,
    description,
    image,
    hotspots = [],
    showLegend = true,
}: AnnotatedImageProps) {
    const imageProps = useNextSanityImage(client, image);
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
    const [hoveredLegendItem, setHoveredLegendItem] = useState<string | null>(null);

    if (!image || !imageProps) return null;

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

    return (
        <section className="py-16 md:py-24">
            {/* Header */}
            {(headline || description) && (
                <div className="mb-10 md:mb-14 text-center max-w-4xl mx-auto">
                    {headline && (
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900">
                            {headline}
                        </h3>
                    )}
                    {description && (
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Image with hotspots */}
            <div className="relative max-w-6xl mx-auto">
                <div className="relative rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                    <Image
                        {...(imageProps as any)}
                        alt={headline || 'Annotated image'}
                        className="w-full h-auto"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        style={{ width: '100%', height: 'auto' }}
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

                                {/* Tooltip */}
                                {isActive && (
                                    <div
                                        className={cn(
                                            'absolute z-20 w-72 p-4 rounded-lg shadow-xl border bg-white',
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
                                        } as React.CSSProperties}
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
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                {showLegend && hotspots.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hotspots.map((hotspot, index) => {
                            const colors = getHotspotColor(hotspot.type);
                            const isActive = activeHotspot === hotspot._key || hoveredLegendItem === hotspot._key;

                            return (
                                <div
                                    key={hotspot._key}
                                    className={cn(
                                        'p-4 rounded-lg border transition-all cursor-pointer',
                                        isActive ? `${colors.bgLight} ${colors.border}` : 'bg-white border-gray-200 hover:border-gray-300'
                                    )}
                                    onMouseEnter={() => setHoveredLegendItem(hotspot._key)}
                                    onMouseLeave={() => setHoveredLegendItem(null)}
                                    onClick={() => setActiveHotspot(hotspot._key)}
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
                )}
            </div>
        </section>
    );
}
