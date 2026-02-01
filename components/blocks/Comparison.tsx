'use client';
import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';

interface ComparisonProps {
    headline?: string;
    description?: string;
    leftImage?: any;
    leftLabel?: string;
    rightImage?: any;
    rightLabel?: string;
}

export default function Comparison({
    headline,
    description,
    leftImage,
    leftLabel,
    rightImage,
    rightLabel
}: ComparisonProps) {
    const leftImageProps = useNextSanityImage(client, leftImage);
    const rightImageProps = useNextSanityImage(client, rightImage);

    if (!leftImage && !rightImage) return null;

    return (
        <section className="py-16 md:py-24">
            {/* Header */}
            {(headline || description) && (
                <div className="mb-12 md:mb-16 max-w-4xl mx-auto text-center">
                    {headline && (
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 mb-4">
                            {headline}
                        </h3>
                    )}
                    {description && (
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left */}
                {leftImage && leftImageProps && (
                    <div>
                        {leftLabel && (
                            <p className="text-sm font-medium text-gray-900 mb-4">{leftLabel}</p>
                        )}
                        <div className="rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                            <Image
                                {...(leftImageProps as any)}
                                alt={leftLabel || "Left comparison image"}
                                className="w-full h-auto"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                )}

                {/* Right */}
                {rightImage && rightImageProps && (
                    <div>
                        {rightLabel && (
                            <p className="text-sm font-medium text-gray-900 mb-4">{rightLabel}</p>
                        )}
                        <div className="rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                            <Image
                                {...(rightImageProps as any)}
                                alt={rightLabel || "Right comparison image"}
                                className="w-full h-auto"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
