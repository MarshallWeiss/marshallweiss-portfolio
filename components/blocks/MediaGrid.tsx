"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';

const shadowClasses: Record<string, string> = {
    'none': '',
    'small': 'shadow-sm',
    'medium': 'shadow-md',
    'large': 'shadow-lg',
};

interface MediaGridProps {
    images?: any[];
    columns?: '1' | '2' | '3';
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    description?: string;
    textAlign?: 'left' | 'center' | 'right';
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    imageShadow?: 'none' | 'small' | 'medium' | 'large';
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function MediaGrid({
    images,
    columns = '2',
    headline,
    subheading,
    headlineSize,
    description,
    textAlign = 'center',
    aspectRatio = 'auto',
    objectFit = 'cover',
    imageShadow = 'none',
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: MediaGridProps) {
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

    const alignmentClass = textAlign === 'center' ? 'text-left md:text-center' : textAlign === 'right' ? 'text-left md:text-right' : 'text-left';

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <BlockHeading
                headline={headline}
                subheading={subheading}
                headlineSize={headlineSize}
                textAlign={textAlign}
                className={cn("", textAlign === 'center' && "max-w-3xl md:mx-auto")}
            />
            {description && (
                <p className={cn("text-gray-600 text-base md:text-lg leading-relaxed mb-8 md:mb-12 max-w-3xl", alignmentClass, textAlign === 'center' && "md:mx-auto")}>
                    {description}
                </p>
            )}
            <div className={cn("grid gap-4 md:gap-6", gridCols[columns])}>
                {images.map((img, idx) => (
                    <GridItem
                        key={img._key || idx}
                        image={img}
                        onOpen={() => openLightbox(idx)}
                        aspectRatio={aspectRatio}
                        objectFit={objectFit}
                        imageShadow={imageShadow}
                    />
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
        </BlockWrapper>
    );
}

function GridItem({
    image,
    onOpen,
    aspectRatio = 'auto',
    objectFit = 'cover',
    imageShadow = 'none',
}: {
    image: any;
    onOpen: () => void;
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    imageShadow?: 'none' | 'small' | 'medium' | 'large';
}) {
    const imageProps = useNextSanityImage(client, image, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(Math.min(options.width || 3000, 3000))
                .quality(95)
        }
    });

    if (!imageProps) return null;

    const aspectRatioClass = {
        'auto': '',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }[aspectRatio];

    const objectFitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

    return (
        <div
            className={cn("group relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300", shadowClasses[imageShadow], imageShadow !== 'none' && "hover:shadow-lg")}
            onClick={onOpen}
        >
            <Image
                {...(imageProps as any)}
                alt={image.alt || "Gallery image"}
                className={cn(
                    "w-full h-auto group-hover:scale-[1.02] transition-transform duration-300",
                    aspectRatioClass,
                    objectFitClass
                )}
                sizes="100vw"
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
    const imageProps = useNextSanityImage(client, currentImage, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(Math.min(options.width || 3000, 3000))
                .quality(95)
        }
    });

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
