'use client';
import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import MuxPlayer from '@mux/mux-player-react';

interface FullWidthMediaProps {
    image?: any;
    video?: {
        asset?: {
            playbackId?: string;
            assetId?: string;
            status?: string;
        };
    };
    mediaType?: 'image' | 'video';
    caption?: string;
    headline?: string;
}

export default function FullWidthMedia({ image, video, mediaType = 'image', caption, headline }: FullWidthMediaProps) {
    const imageProps = useNextSanityImage(client, image);

    const playbackId = video?.asset?.playbackId;
    const hasImage = image && imageProps;
    const hasVideo = mediaType === 'video' && playbackId;

    if (!hasImage && !hasVideo) return null;

    return (
        <section className="py-16 md:py-24 w-full">
            {(headline || caption) && (
                <div className="mb-10 md:mb-14 text-center max-w-4xl mx-auto">
                    {headline && (
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900">
                            {headline}
                        </h3>
                    )}
                    {caption && (
                        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                            {caption}
                        </p>
                    )}
                </div>
            )}
            <figure className="w-full max-w-6xl mx-auto">
                <div className="rounded-lg overflow-hidden bg-gray-50 shadow-lg">
                    {hasVideo ? (
                        <MuxPlayer
                            playbackId={playbackId}
                            streamType="on-demand"
                            autoPlay="muted"
                            loop
                            muted
                            style={{
                                width: '100%',
                                height: 'auto',
                                aspectRatio: '16/9',
                                '--controls': 'none',
                            } as React.CSSProperties}
                        />
                    ) : hasImage ? (
                        <Image
                            {...(imageProps as any)}
                            alt={caption || "Full width media"}
                            className="w-full h-auto"
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : null}
                </div>
            </figure>
        </section>
    );
}
