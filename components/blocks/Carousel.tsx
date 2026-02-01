'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
    _key?: string;
    image?: any;
    title?: string;
    description?: string;
}

interface CarouselProps {
    slides?: Slide[];
    headline?: string;
}

export default function Carousel({ slides, headline }: CarouselProps) {
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
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);

    if (!slides || slides.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const slideWidth = container.querySelector('.carousel-slide')?.clientWidth || 500;
            const scrollAmount = direction === 'left' ? -slideWidth : slideWidth;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 md:py-24">
            {headline && (
                <div className="mb-8 md:mb-12">
                    <h3 className="text-2xl md:text-3xl font-medium text-gray-900">{headline}</h3>
                </div>
            )}

            <div className="relative flex items-start gap-4">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={cn(
                        "flex-shrink-0 mt-[16.67%] -translate-y-1/2 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400",
                        !canScrollLeft && "opacity-30 cursor-not-allowed"
                    )}
                    aria-label="Previous slide"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>

                {/* Slides Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 flex gap-12 overflow-x-auto scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onScroll={checkScrollButtons}
                >
                    {slides.map((slide, idx) => (
                        <CarouselSlide key={slide._key || idx} slide={slide} onOpen={() => openLightbox(idx)} />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={cn(
                        "flex-shrink-0 mt-[16.67%] -translate-y-1/2 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400",
                        !canScrollRight && "opacity-30 cursor-not-allowed"
                    )}
                    aria-label="Next slide"
                >
                    <ArrowRight className="w-5 h-5 text-gray-700" />
                </button>
            </div>

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
        </section>
    );
}

function CarouselSlide({ slide, onOpen }: { slide: Slide; onOpen: () => void }) {
    const imageProps = useNextSanityImage(client, slide.image);

    return (
        <div className="carousel-slide flex-shrink-0 w-[500px] max-w-[80vw]">
            {/* Image */}
            <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm mb-4 cursor-pointer group"
                onClick={onOpen}
            >
                {imageProps ? (
                    <Image
                        {...(imageProps as any)}
                        alt={slide.title || 'Carousel slide'}
                        className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-300"
                        sizes="(max-width: 768px) 80vw, 500px"
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
    const imageProps = useNextSanityImage(client, currentSlide.image);

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
