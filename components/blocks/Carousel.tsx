'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

            <div className="relative">
                {/* Navigation Arrows */}
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={cn(
                        "absolute left-0 top-1/3 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400",
                        !canScrollLeft && "opacity-30 cursor-not-allowed"
                    )}
                    aria-label="Previous slide"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={cn(
                        "absolute right-0 top-1/3 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center transition-all hover:border-gray-400",
                        !canScrollRight && "opacity-30 cursor-not-allowed"
                    )}
                    aria-label="Next slide"
                >
                    <ArrowRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Slides Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide px-14"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onScroll={checkScrollButtons}
                >
                    {slides.map((slide, idx) => (
                        <CarouselSlide key={slide._key || idx} slide={slide} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CarouselSlide({ slide }: { slide: Slide }) {
    const imageProps = useNextSanityImage(client, slide.image);

    return (
        <div className="carousel-slide flex-shrink-0 w-[500px] max-w-[80vw]">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm mb-4">
                {imageProps ? (
                    <Image
                        {...(imageProps as any)}
                        alt={slide.title || 'Carousel slide'}
                        className="object-cover w-full h-full"
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
