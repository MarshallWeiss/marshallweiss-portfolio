'use client';
import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';

interface FullWidthMediaProps {
    image?: any;
    caption?: string;
    headline?: string;
}

export default function FullWidthMedia({ image, caption, headline }: FullWidthMediaProps) {
    const imageProps = useNextSanityImage(client, image);

    if (!image) return null;

    return (
        <section className="py-12 md:py-24 w-full">
            {headline && (
                <div className="mb-6 md:mb-8 max-w-4xl mx-auto px-6 md:px-0">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{headline}</h3>
                </div>
            )}
            <figure className="w-full">
                <div className="rounded-xl overflow-hidden bg-gray-50 shadow-sm relative w-full">
                    {imageProps && (
                        <Image
                            {...(imageProps as any)}
                            alt={caption || "Full width media"}
                            className="w-full h-auto object-cover"
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                </div>
                {caption && (
                    <figcaption className="mt-4 text-center text-sm text-gray-500 font-medium tracking-wide">
                        {caption}
                    </figcaption>
                )}
            </figure>
        </section>
    );
}
