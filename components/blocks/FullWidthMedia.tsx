'use client';
import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import MuxPlayer from '@mux/mux-player-react';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
import { cn } from '@/lib/utils';

interface FullWidthMediaProps {
    image?: any;
    video?: {
        asset?: {
            playbackId?: string;
            assetId?: string;
            status?: string;
        };
    };
    mediaType?: 'image' | 'video' | 'figma';
    figmaUrl?: string;
    caption?: string;
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    textAlign?: 'left' | 'center' | 'right';
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    imageBackground?: 'none' | 'gray';
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function FullWidthMedia({
    image,
    video,
    mediaType = 'image',
    figmaUrl,
    caption,
    headline,
    subheading,
    headlineSize = 'medium',
    textAlign = 'center',
    aspectRatio = 'auto',
    objectFit = 'cover',
    imageBackground = 'none',
    autoplay = true,
    loop = true,
    muted = true,
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: FullWidthMediaProps) {
    const imageProps = useNextSanityImage(client, image, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(Math.min(options.width || 3000, 3000))
                .quality(95)
        }
    });

    const playbackId = video?.asset?.playbackId;
    const hasImage = image && imageProps;
    const hasVideo = mediaType === 'video' && playbackId;
    const hasFigma = mediaType === 'figma' && figmaUrl;

    if (!hasImage && !hasVideo && !hasFigma) return null;

    const alignmentClass = textAlign === 'center' ? 'text-left md:text-center' : textAlign === 'right' ? 'text-left md:text-right' : 'text-left';

    const aspectRatioClasses: Record<string, string> = {
        'auto': '',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    };

    const objectFitClasses: Record<string, string> = {
        cover: 'object-cover',
        contain: 'object-contain',
    };

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <BlockHeading
                headline={headline}
                subheading={subheading}
                headlineSize={headlineSize}
                textAlign={textAlign}
                className=""
            />
            {caption && (
                <p className={cn("text-gray-600 text-lg leading-relaxed mb-10 md:mb-14", alignmentClass)}>
                    {caption}
                </p>
            )}
            <figure className="w-full">
                <div className={cn(
                    "rounded-lg overflow-hidden",
                    imageBackground === 'gray' && 'bg-gray-50',
                    aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio]
                )}>
                    {hasVideo ? (
                        <MuxPlayer
                            playbackId={playbackId}
                            streamType="on-demand"
                            autoPlay={autoplay}
                            loop={loop}
                            muted={muted}
                            className="w-full h-full"
                        />
                    ) : hasFigma ? (
                        <iframe
                            src={figmaUrl}
                            allowFullScreen
                            className="w-full h-full border-0"
                            style={{ minHeight: '600px' }}
                        />
                    ) : hasImage ? (
                        <Image
                            {...(imageProps as any)}
                            alt={caption || "Full width media"}
                            className={cn("w-full h-auto", objectFitClasses[objectFit])}
                            sizes="100vw"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : null}
                </div>
            </figure>
        </BlockWrapper>
    );
}
