'use client';
import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';

interface SplitMediaProps {
    text: string;
    image?: any;
    images?: any[];
    reverseLayout?: boolean;
    headline?: string;
}

// Separate component for individual images to use hooks properly
function SanityImage({ image, className }: { image: any; className?: string }) {
    const imageProps = useNextSanityImage(client, image);

    if (!imageProps) return null;

    return (
        <Image
            {...(imageProps as any)}
            alt="Split media"
            className={cn("object-cover w-full h-full", className)}
            sizes="(max-width: 768px) 100vw, 50vw"
        />
    );
}

export default function SplitMedia({ text, image, images, reverseLayout = false, headline }: SplitMediaProps) {
    // Use images array if available, otherwise fall back to single image
    const hasMultipleImages = images && images.length > 0;
    const displayImages = hasMultipleImages ? images : (image ? [image] : []);

    return (
        <section className="py-12 md:py-24">
            <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center",
                reverseLayout ? "md:grid-flow-dense" : ""
            )}>
                {/* Text Side */}
                <div className={cn(
                    "prose prose-lg text-gray-600",
                    reverseLayout ? "md:col-start-2" : "md:col-start-1"
                )}>
                    {headline && <h3 className="text-2xl font-semibold text-gray-900 mb-4">{headline}</h3>}
                    <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
                </div>

                {/* Media Side */}
                <div className={cn(
                    reverseLayout ? "md:col-start-1" : "md:col-start-2"
                )}>
                    {displayImages.length === 1 && (
                        <figure className="relative rounded-xl overflow-hidden bg-gray-50 aspect-[4/3] w-full">
                            <SanityImage image={displayImages[0]} />
                        </figure>
                    )}
                    {displayImages.length > 1 && (
                        <div className={cn(
                            "grid gap-4",
                            displayImages.length === 2 ? "grid-cols-2" : "grid-cols-2"
                        )}>
                            {displayImages.map((img, index) => (
                                <figure
                                    key={img._key || index}
                                    className="relative rounded-xl overflow-hidden bg-gray-50 aspect-[3/4] w-full"
                                >
                                    <SanityImage image={img} />
                                </figure>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
