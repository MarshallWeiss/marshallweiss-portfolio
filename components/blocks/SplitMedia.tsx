'use client';
import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';

// Simple types for now, assuming standard Sanity image
interface SplitMediaProps {
    text: string;
    image?: any;
    reverseLayout?: boolean;
    headline?: string;
}

export default function SplitMedia({ text, image, reverseLayout = false, headline }: SplitMediaProps) {
    const imageProps = useNextSanityImage(client, image);

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
                    {image && imageProps && (
                        <figure className="relative rounded-xl overflow-hidden bg-gray-50 aspect-[4/3] w-full">
                            <Image
                                {...(imageProps as any)}
                                alt="Split media"
                                className="object-cover w-full h-full"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </figure>
                    )}
                </div>
            </div>
        </section>
    );
}
