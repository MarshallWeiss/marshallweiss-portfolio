"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaGridProps {
    images?: any[];
    columns?: '1' | '2' | '3';
    headline?: string;
    description?: string;
}

export default function MediaGrid({ images, columns = '2', headline, description }: MediaGridProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    const gridCols = {
        '1': 'grid-cols-1',
        '2': 'grid-cols-1 md:grid-cols-2',
        '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    };

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    const goNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length);
        }
    };
    const goPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <section className="py-12 md:py-16">
            {(headline || description) && (
                <div className="mb-8 md:mb-12 max-w-3xl mx-auto text-center">
                    {headline && (
                        <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">{headline}</h3>
                    )}
                    {description && (
                        <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
                    )}
                </div>
            )}
            <div className={cn("grid gap-4 md:gap-6", gridCols[columns])}>
                {images.map((img, idx) => (
                    <GridItem key={img._key || idx} image={img} onOpen={() => openLightbox(idx)} />
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedIndex !== null && (
                <Lightbox
                    images={images}
                    currentIndex={selectedIndex}
                    onClose={closeLightbox}
                    onNext={goNext}
                    onPrev={goPrev}
                />
            )}
        </section>
    );
}

function GridItem({ image, onOpen }: { image: any; onOpen: () => void }) {
    const imageProps = useNextSanityImage(client, image);

    if (!imageProps) return null;

    return (
        <div
            className="group relative cursor-pointer rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-all duration-300"
            onClick={onOpen}
        >
            <Image
                {...(imageProps as any)}
                alt={image.alt || "Gallery image"}
                className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    );
}

function Lightbox({
    images,
    currentIndex,
    onClose,
    onNext,
    onPrev
}: {
    images: any[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    const currentImage = images[currentIndex];
    const imageProps = useNextSanityImage(client, currentImage);

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-900 transition-colors"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Previous arrow */}
            {images.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeft className="w-10 h-10" />
                </button>
            )}

            {/* Next arrow */}
            {images.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <ChevronRight className="w-10 h-10" />
                </button>
            )}

            {/* Image */}
            <div
                className="relative w-full h-full flex items-center justify-center p-16"
                onClick={(e) => e.stopPropagation()}
            >
                {imageProps && (
                    <Image
                        {...(imageProps as any)}
                        alt={currentImage.alt || "Lightbox view"}
                        className="object-contain max-h-full max-w-full rounded-lg shadow-2xl"
                        sizes="100vw"
                    />
                )}
            </div>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    );
}
