'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
    images?: any[];
    layout?: 'full' | 'contained';
    headline?: string;
}

export default function Carousel({ images, layout = 'full', headline }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (!images || images.length === 0) return null;


    const scrollTo = (index: number) => {
        setActiveIndex(index);
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const width = container.offsetWidth;
            container.scrollTo({
                left: width * index,
                behavior: 'smooth'
            });
        }
    };

    const next = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        scrollTo(nextIndex);
    };

    const prev = () => {
        const prevIndex = (activeIndex - 1 + images.length) % images.length;
        scrollTo(prevIndex);
    };

    return (
        <section className={cn(
            "py-12 md:py-16 w-full",
            layout === 'contained' ? "max-w-6xl mx-auto px-6 md:px-0" : ""
        )}>
            {headline && (
                <div className={cn(
                    "mb-6 md:mb-8",
                    layout === 'full' ? "max-w-6xl mx-auto px-6 md:px-12" : ""
                )}>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{headline}</h3>
                </div>
            )}
            <div className="relative group">
                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onScroll={(e) => {
                        const container = e.currentTarget;
                        const index = Math.round(container.scrollLeft / container.offsetWidth);
                        if (index !== activeIndex) setActiveIndex(index);
                    }}
                >
                    {images.map((img, idx) => (
                        <CarouselItem key={img._key || idx} image={img} layout={layout} />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-900" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 text-gray-900" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                idx === activeIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CarouselItem({ image, layout }: { image: any, layout: string }) {
    const imageProps = useNextSanityImage(client, image);

    return (
        <div className="min-w-full flex-shrink-0 snap-center relative">
            <div className={cn(
                "relative overflow-hidden bg-gray-100",
                layout === 'full' ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10] rounded-xl"
            )}>
                {imageProps ? (
                    <Image
                        {...(imageProps as any)}
                        alt="Carousel slide"
                        className="object-cover w-full h-full"
                        sizes="100vw"
                    />
                ) : null}
            </div>
        </div>
    );
}
