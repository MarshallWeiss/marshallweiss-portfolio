"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import { X, Maximize2 } from 'lucide-react';

interface MediaGridProps {
    images?: any[];
    columns?: '1' | '2' | '3';
    headline?: string;
}

export default function MediaGrid({ images, columns = '2', headline }: MediaGridProps) {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);

    if (!images || images.length === 0) return null;

    const gridCols = {
        '1': 'grid-cols-1',
        '2': 'grid-cols-1 md:grid-cols-2',
        '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    };

    return (
        <section className="py-12 md:py-16">
            {headline && (
                <div className="mb-6 md:mb-8 max-w-4xl">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{headline}</h3>
                </div>
            )}
            <div className={cn("grid gap-4 md:gap-8", gridCols[columns])}>
                {images.map((img, idx) => (
                    <GridItem key={img._key || idx} image={img} onOpen={() => setSelectedImage(img)} />
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedImage && (
                <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
            )}
        </section>
    );
}

function GridItem({ image, onOpen }: { image: any; onOpen: () => void }) {
    const imageProps = useNextSanityImage(client, image);

    if (!imageProps) return null;

    return (
        <div
            className="group relative cursor-zoom-in rounded-xl overflow-hidden bg-gray-50 hover:shadow-lg transition-all duration-300"
            onClick={onOpen}
        >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="text-white w-8 h-8 drop-shadow-md" />
            </div>
            <Image
                {...(imageProps as any)}
                alt="Gallery image"
                className="w-full h-auto object-cover aspect-[4/3]"
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    );
}

function Lightbox({ image, onClose }: { image: any; onClose: () => void }) {
    const imageProps = useNextSanityImage(client, image);

    // Close on Escape key
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200" onClick={onClose}>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors"
            >
                <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            <div
                className="relative w-full max-w-6xl max-h-screen flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            >
                {imageProps && (
                    <Image
                        {...(imageProps as any)}
                        alt="Lightbox view"
                        className="object-contain max-h-[90vh] w-auto h-auto rounded-md shadow-2xl"
                        sizes="100vw"
                    />
                )}
            </div>
        </div>
    );
}
