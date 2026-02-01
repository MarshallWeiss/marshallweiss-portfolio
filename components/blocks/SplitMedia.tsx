'use client';
import React from 'react';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
import MediaItem from './MediaItem';

interface SplitMediaProps {
    // Content
    headline?: string
    subheading?: string
    text: string

    // Typography
    headlineSize?: 'small' | 'medium' | 'large'
    textAlign?: 'left' | 'center' | 'right'

    // Media
    mediaType?: 'image' | 'images' | 'video'
    image?: any
    images?: any[]
    video?: any
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16'
    objectFit?: 'cover' | 'contain'

    // Layout
    reverseLayout?: boolean
    width?: 'contained' | 'wide' | 'full'
    background?: 'none' | 'white' | 'gray'
    spacing?: 'compact' | 'default' | 'spacious'
}

// Separate component for individual images to use hooks properly
function SanityImage({
    image,
    aspectRatio = 'auto',
    objectFit = 'cover',
}: {
    image: any
    aspectRatio?: string
    objectFit?: string
}) {
    const imageProps = useNextSanityImage(client, image);

    if (!imageProps) return null;

    const aspectRatioClasses: Record<string, string> = {
        'auto': '',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }

    const objectFitClasses: Record<string, string> = {
        cover: 'object-cover',
        contain: 'object-contain',
    }

    return (
        <div className={cn(
            'relative rounded-xl overflow-hidden bg-gray-50 w-full',
            aspectRatio && aspectRatioClasses[aspectRatio]
        )}>
            <Image
                {...(imageProps as any)}
                alt="Split media"
                className={cn('w-full h-full', objectFitClasses[objectFit])}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    );
}

export default function SplitMedia({
    headline,
    subheading,
    text,
    headlineSize = 'medium',
    textAlign = 'left',
    mediaType = 'image',
    image,
    images,
    video,
    aspectRatio = 'auto',
    objectFit = 'cover',
    reverseLayout = false,
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: SplitMediaProps) {
    // Determine what media to display
    const hasVideo = mediaType === 'video' && video?.asset;
    const hasMultipleImages = mediaType === 'images' && images && images.length > 0;
    const displayImages = hasMultipleImages ? images : (image ? [image] : []);

    const aspectRatioClasses: Record<string, string> = {
        'auto': '',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center",
                reverseLayout ? "md:grid-flow-dense" : ""
            )}>
                {/* Text Side */}
                <div className={cn(
                    "prose prose-lg text-gray-600",
                    reverseLayout ? "md:col-start-2" : "md:col-start-1"
                )}>
                    <BlockHeading
                        headline={headline}
                        subheading={subheading}
                        headlineSize={headlineSize}
                        textAlign={textAlign}
                    />
                    <p className={cn(
                        "whitespace-pre-wrap leading-relaxed",
                        textAlign === 'center' && 'text-center',
                        textAlign === 'right' && 'text-right'
                    )}>
                        {text}
                    </p>
                </div>

                {/* Media Side */}
                <div className={cn(
                    reverseLayout ? "md:col-start-1" : "md:col-start-2"
                )}>
                    {/* Video */}
                    {hasVideo && (
                        <div className={cn(
                            "relative rounded-xl overflow-hidden bg-gray-50 w-full",
                            aspectRatio && aspectRatioClasses[aspectRatio]
                        )}>
                            <MuxPlayer
                                playbackId={video.asset.playbackId}
                                metadata={{
                                    video_title: headline || 'Split media video',
                                }}
                                streamType="on-demand"
                                className="w-full h-full"
                            />
                        </div>
                    )}

                    {/* Single Image */}
                    {!hasVideo && displayImages.length === 1 && (
                        <SanityImage
                            image={displayImages[0]}
                            aspectRatio={aspectRatio}
                            objectFit={objectFit}
                        />
                    )}

                    {/* Multiple Images */}
                    {!hasVideo && displayImages.length > 1 && (
                        <div className={cn(
                            "grid gap-4",
                            displayImages.length === 2 ? "grid-cols-2" : "grid-cols-2"
                        )}>
                            {displayImages.map((img, index) => (
                                <SanityImage
                                    key={img._key || index}
                                    image={img}
                                    aspectRatio={aspectRatio}
                                    objectFit={objectFit}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </BlockWrapper>
    );
}
