'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';

interface Slide {
    _key?: string;
    image?: any;
    title?: string;
    description?: string;
}

interface CarouselProps {
    slides?: Slide[];
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    textAlign?: 'left' | 'center' | 'right';
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    slidesPerView?: '1' | '2' | '3' | '4';
    verticalAlign?: 'top' | 'center' | 'bottom';
    arrowPosition?: 'overlapping' | 'outside';
    infiniteLoop?: boolean;
    showBackground?: boolean;
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function Carousel({
    slides,
    headline,
    subheading,
    headlineSize,
    textAlign = 'left',
    aspectRatio = 'auto',
    objectFit = 'cover',
    slidesPerView = '2',
    verticalAlign = 'center',
    arrowPosition = 'overlapping',
    infiniteLoop = false,
    showBackground = true,
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: CarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);
    const goNext = () => {
        if (selectedIndex !== null && slides) {
            setSelectedIndex((selectedIndex + 1) % slides.length);
        }
    };
    const goPrev = () => {
        if (selectedIndex !== null && slides) {
            setSelectedIndex((selectedIndex - 1 + slides.length) % slides.length);
        }
    };

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            if (infiniteLoop) {
                // In infinite loop mode, arrows are always enabled
                setCanScrollLeft(true);
                setCanScrollRight(true);
            } else {
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
            }
        }
    };

    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);

    if (!slides || slides.length === 0) return null;

    // Vertical alignment classes
    const alignmentClass = {
        'top': 'items-start',
        'center': 'items-center',
        'bottom': 'items-end',
    }[verticalAlign];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const slideWidth = container.querySelector('.carousel-slide')?.clientWidth || 500;
            const gap = 48; // 12 * 4 (gap-12 in Tailwind)

            if (infiniteLoop) {
                // Infinite loop behavior
                if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - 10) {
                    // At the end, jump to start
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else if (direction === 'left' && scrollLeft <= 0) {
                    // At the start, jump to end
                    container.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
                } else {
                    // Normal scroll
                    const scrollAmount = direction === 'left' ? -(slideWidth + gap) : (slideWidth + gap);
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                // Standard scroll behavior
                const scrollAmount = direction === 'left' ? -(slideWidth + gap) : (slideWidth + gap);
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <BlockHeading
                headline={headline}
                subheading={subheading}
                headlineSize={headlineSize}
                textAlign={textAlign}
                className="mb-8 md:mb-12"
            />

{arrowPosition === 'outside' ? (
                // Outside positioning - arrows in flex layout
                <div className="flex items-center gap-4">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400",
                            !canScrollLeft && "opacity-30 cursor-not-allowed"
                        )}
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Slides Container */}
                    <div
                        ref={scrollContainerRef}
                        className={cn("flex-1 flex gap-12 overflow-x-auto scrollbar-hide", alignmentClass)}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onScroll={checkScrollButtons}
                    >
                        {slides.map((slide, idx) => (
                            <CarouselSlide
                                key={slide._key || idx}
                                slide={slide}
                                onOpen={() => openLightbox(idx)}
                                aspectRatio={aspectRatio}
                                objectFit={objectFit}
                                slidesPerView={slidesPerView}
                                showBackground={showBackground}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400",
                            !canScrollRight && "opacity-30 cursor-not-allowed"
                        )}
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            ) : (
                // Overlapping positioning - arrows absolute
                <div className="relative">
                    {/* Slides Container */}
                    <div
                        ref={scrollContainerRef}
                        className={cn("flex gap-12 overflow-x-auto scrollbar-hide", alignmentClass)}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onScroll={checkScrollButtons}
                    >
                        {slides.map((slide, idx) => (
                            <CarouselSlide
                                key={slide._key || idx}
                                slide={slide}
                                onOpen={() => openLightbox(idx)}
                                aspectRatio={aspectRatio}
                                objectFit={objectFit}
                                slidesPerView={slidesPerView}
                                showBackground={showBackground}
                            />
                        ))}
                    </div>

                    {/* Left Arrow - Overlapping */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400 shadow-lg",
                            !canScrollLeft && "opacity-30 cursor-not-allowed"
                        )}
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Right Arrow - Overlapping */}
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={cn(
                            "absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400 shadow-lg",
                            !canScrollRight && "opacity-30 cursor-not-allowed"
                        )}
                        aria-label="Next slide"
                    >
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            )}

            {/* Lightbox */}
            {selectedIndex !== null && (
                <Lightbox
                    slides={slides}
                    currentIndex={selectedIndex}
                    onClose={closeLightbox}
                    onNext={goNext}
                    onPrev={goPrev}
                />
            )}
        </BlockWrapper>
    );
}

function CarouselSlide({
    slide,
    onOpen,
    aspectRatio = 'auto',
    objectFit = 'cover',
    slidesPerView = '2',
    showBackground = true,
}: {
    slide: Slide;
    onOpen: () => void;
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    slidesPerView?: '1' | '2' | '3' | '4';
    showBackground?: boolean;
}) {
    const imageProps = useNextSanityImage(client, slide.image, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(options.width || 2400)
                .quality(95)
                .fit('max')
        }
    });

    // When aspect ratio is 'auto', don't force any aspect ratio (dynamic height)
    const aspectRatioClass = aspectRatio === 'auto' ? '' : {
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }[aspectRatio];

    const objectFitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

    // Calculate width based on slides per view
    const slideWidthClass = {
        '1': 'w-full max-w-full',                   // Full width for lightbox style
        '2': 'w-[500px] max-w-[80vw]',              // Default
        '3': 'w-[350px] max-w-[70vw]',              // Medium
        '4': 'w-[280px] max-w-[60vw]',              // Compact
    }[slidesPerView];

    // Dynamic sizes based on slidesPerView for optimal image loading
    const imageSizes = {
        '1': '100vw',
        '2': '(max-width: 768px) 80vw, 500px',
        '3': '(max-width: 768px) 70vw, 350px',
        '4': '(max-width: 768px) 60vw, 280px',
    }[slidesPerView];

    return (
        <div className={cn("carousel-slide flex-shrink-0", slideWidthClass)}>
            {/* Image */}
            <div
                className={cn(
                    "relative rounded-lg overflow-hidden shadow-sm mb-4 cursor-pointer group",
                    showBackground && "bg-gray-100",
                    aspectRatioClass
                )}
                onClick={onOpen}
            >
                {imageProps ? (
                    <Image
                        {...(imageProps as any)}
                        alt={slide.title || 'Carousel slide'}
                        className={cn(
                            "group-hover:scale-[1.02] transition-transform duration-300",
                            aspectRatioClass ? "w-full h-full" : "w-full h-auto",
                            objectFitClass
                        )}
                        sizes={imageSizes}
                    />
                ) : null}
            </div>

            {/* Title */}
            {slide.title && (
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {slide.title}
                </h4>
            )}

            {/* Description */}
            {slide.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                    {slide.description}
                </p>
            )}
        </div>
    );
}

function Lightbox({
    slides,
    currentIndex,
    onClose,
    onNext,
    onPrev
}: {
    slides: Slide[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    const [animationKey, setAnimationKey] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const currentSlide = slides[currentIndex];
    const imageProps = useNextSanityImage(client, currentSlide.image, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(options.width || 2400)
                .quality(95)
                .fit('max')
        }
    });

    const handleNext = () => {
        setDirection('right');
        setAnimationKey(prev => prev + 1);
        onNext();
    };

    const handlePrev = () => {
        setDirection('left');
        setAnimationKey(prev => prev + 1);
        onPrev();
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, currentIndex]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

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
            {slides.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeft className="w-10 h-10" />
                </button>
            )}

            {/* Next arrow */}
            {slides.length > 1 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <ChevronRight className="w-10 h-10" />
                </button>
            )}

            {/* Image and info */}
            <div
                key={animationKey}
                className="relative w-full h-full flex flex-col items-center justify-center p-16 animate-fade-slide"
                onClick={(e) => e.stopPropagation()}
                style={{
                    '--slide-direction': direction === 'right' ? '20px' : '-20px',
                } as any}
            >
                {imageProps && (
                    <Image
                        {...(imageProps as any)}
                        alt={currentSlide.title || "Lightbox view"}
                        className="object-contain max-h-[70vh] max-w-full rounded-lg shadow-2xl"
                        sizes="100vw"
                    />
                )}

                {/* Title and description below image */}
                {(currentSlide.title || currentSlide.description) && (
                    <div className="mt-6 text-center max-w-2xl">
                        {currentSlide.title && (
                            <h4 className="text-xl font-medium text-gray-900 mb-2">
                                {currentSlide.title}
                            </h4>
                        )}
                        {currentSlide.description && (
                            <p className="text-gray-600 leading-relaxed">
                                {currentSlide.description}
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Image counter */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
                    {currentIndex + 1} / {slides.length}
                </div>
            )}
        </div>
    );
}
