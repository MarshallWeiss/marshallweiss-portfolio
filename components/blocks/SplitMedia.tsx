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
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large'
    textAlign?: 'left' | 'center' | 'right'

    // Media
    mediaType?: 'image' | 'images' | 'video' | 'figma'
    image?: any
    images?: any[]
    video?: any
    figmaUrl?: string
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16'
    objectFit?: 'cover' | 'contain'

    // Image styles
    imageBackground?: 'none' | 'gray'

    // Video controls
    autoplay?: boolean
    loop?: boolean
    muted?: boolean

    // Image height for multiple images
    imageHeight?: number

    // Layout
    layout?: 'sideBySide' | 'textAbove' | 'mediaAbove'
    reverseLayout?: boolean
    mediaRatio?: '40/60' | '50/50' | '60/40' | '70/30'
    textPadding?: 'none' | 'small' | 'medium' | 'large'
    width?: 'contained' | 'wide' | 'full'
    background?: 'none' | 'white' | 'gray'
    spacing?: 'compact' | 'default' | 'spacious'
}

// Separate component for individual images to use hooks properly
function SanityImage({
    image,
    aspectRatio = 'auto',
    objectFit = 'cover',
    fillHeight = false,
    imageBackground = 'none',
}: {
    image: any
    aspectRatio?: string
    objectFit?: string
    fillHeight?: boolean
    imageBackground?: string
}) {
    const imageProps = useNextSanityImage(client, image, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(Math.min(options.width || 3000, 3000))
                .quality(95)
        }
    });

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

    // When fillHeight is true, don't use aspect ratio - let images scale naturally
    const useAspectRatio = !fillHeight && aspectRatio !== 'auto';

    return (
        <div className={cn(
            'relative rounded-xl overflow-hidden',
            imageBackground === 'gray' && 'bg-gray-50',
            fillHeight ? 'h-full w-full flex items-center justify-center' : 'w-full',
            useAspectRatio && aspectRatioClasses[aspectRatio]
        )}>
            <Image
                {...(imageProps as any)}
                alt="Split media"
                className={cn(
                    fillHeight ? 'h-full w-auto max-w-full object-contain' : 'w-full h-auto',
                    !fillHeight && objectFitClasses[objectFit]
                )}
                sizes="100vw"
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
    figmaUrl,
    aspectRatio = 'auto',
    objectFit = 'cover',
    imageBackground = 'none',
    autoplay = true,
    loop = true,
    muted = true,
    imageHeight = 600,
    layout = 'sideBySide',
    reverseLayout = false,
    mediaRatio = '50/50',
    textPadding = 'none',
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: SplitMediaProps) {
    // Determine what media to display
    const hasVideo = mediaType === 'video' && video?.asset;
    const hasFigma = mediaType === 'figma' && figmaUrl;
    const hasMultipleImages = mediaType === 'images' && images && images.length > 0;

    // Handle new structure where images can be { image, aspectRatio } objects or plain images (backward compatibility)
    const displayImages = hasMultipleImages
        ? images.map((item: any) => ({
            image: item.image || item, // Support both new format and old format
            aspectRatio: item.aspectRatio || aspectRatio, // Use individual ratio or fall back to global
            _key: item._key
        }))
        : (image ? [{ image, aspectRatio, _key: 'single' }] : []);

    const aspectRatioClasses: Record<string, string> = {
        'auto': '',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }

    // Calculate column spans based on media ratio
    const columnSpans = {
        '40/60': { media: 'md:col-span-5', text: 'md:col-span-7' },
        '50/50': { media: 'md:col-span-6', text: 'md:col-span-6' },
        '60/40': { media: 'md:col-span-7', text: 'md:col-span-5' },
        '70/30': { media: 'md:col-span-8', text: 'md:col-span-4' },
    }[mediaRatio];

    // Text padding options - applies horizontally for side-by-side, horizontally for stacked
    const textPaddingClass = layout === 'sideBySide' ? {
        'none': '',
        'small': 'pr-8',
        'medium': 'pr-12 md:pr-16',
        'large': 'pr-16 md:pr-24',
    }[textPadding] : {
        'none': '',
        'small': 'px-8',
        'medium': 'px-12 md:px-16',
        'large': 'px-16 md:px-24',
    }[textPadding];

    // Render text content
    const renderTextContent = () => (
        <div className={cn(
            "prose prose-lg text-gray-600",
            layout === 'sideBySide' ? columnSpans.text : 'max-w-4xl',
            layout !== 'sideBySide' && textAlign === 'center' && 'md:mx-auto',
            textPaddingClass,
            layout === 'sideBySide' && reverseLayout ? "md:col-start-auto md:row-start-1" : ""
        )}>
            <BlockHeading
                headline={headline}
                subheading={subheading}
                headlineSize={headlineSize}
                textAlign={textAlign}
            />
            <p className={cn(
                "whitespace-pre-wrap leading-relaxed",
                textAlign === 'center' && 'md:text-center',
                textAlign === 'right' && 'md:text-right'
            )}>
                {text}
            </p>
        </div>
    );

    // Render media content
    const renderMediaContent = () => (
        <div className={cn(
            layout === 'sideBySide' ? columnSpans.media : 'w-full',
            layout === 'sideBySide' && reverseLayout ? "md:col-start-1 md:row-start-1" : ""
        )}>
            {/* Video */}
            {hasVideo && (
                <div className={cn(
                    "relative rounded-xl overflow-hidden w-full",
                    imageBackground === 'gray' && 'bg-gray-50',
                    aspectRatio && aspectRatioClasses[aspectRatio]
                )}>
                    <MuxPlayer
                        playbackId={video.asset.playbackId}
                        metadata={{
                            video_title: headline || 'Text and media video',
                        }}
                        streamType="on-demand"
                        autoPlay={autoplay}
                        loop={loop}
                        muted={muted}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Figma Prototype */}
            {hasFigma && (
                <div className={cn(
                    "relative rounded-xl overflow-hidden w-full",
                    imageBackground === 'gray' && 'bg-gray-50',
                    aspectRatio && aspectRatioClasses[aspectRatio]
                )}>
                    <iframe
                        src={figmaUrl}
                        allowFullScreen
                        className="w-full h-full border-0"
                        style={{ minHeight: '600px' }}
                    />
                </div>
            )}

            {/* Single Image */}
            {!hasVideo && !hasFigma && displayImages.length === 1 && (
                <SanityImage
                    image={displayImages[0].image}
                    aspectRatio={displayImages[0].aspectRatio}
                    objectFit={objectFit}
                    imageBackground={imageBackground}
                />
            )}

            {/* Multiple Images */}
            {!hasVideo && !hasFigma && displayImages.length > 1 && (
                <div className="flex gap-4">
                    {displayImages.map((item, index) => {
                        // Use individual aspect ratios but constrain to same height
                        return (
                            <div key={item._key || index} className="flex-shrink-0" style={{ height: `${imageHeight}px` }}>
                                <SanityImage
                                    image={item.image}
                                    aspectRatio={item.aspectRatio}
                                    objectFit="contain"
                                    fillHeight={true}
                                    imageBackground={imageBackground}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            {layout === 'sideBySide' ? (
                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center",
                    reverseLayout ? "md:grid-flow-dense" : ""
                )}>
                    {renderTextContent()}
                    {renderMediaContent()}
                </div>
            ) : layout === 'textAbove' ? (
                <div className="space-y-12 md:space-y-16">
                    {renderTextContent()}
                    {renderMediaContent()}
                </div>
            ) : (
                <div className="space-y-12 md:space-y-16">
                    {renderMediaContent()}
                    {renderTextContent()}
                </div>
            )}
        </BlockWrapper>
    );
}
