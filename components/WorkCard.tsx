'use client';

import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';

export default function WorkCard({ study }: { study: any }) {
    const imageProps = useNextSanityImage(client, study.heroImage, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(Math.min(options.width || 3000, 3000))
                .quality(95)
        }
    });

    const isVideoThumbnail = study.thumbnailType === 'video' && study.thumbnailVideo?.asset?.playbackId;

    return (
        <Link
            href={`/case-studies/${study.slug.current}`}
            className="group block"
            data-cursor-label="Explore"
        >
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-6">
                {isVideoThumbnail ? (
                    <div className="relative w-full h-full pointer-events-none">
                        <MuxPlayer
                            playbackId={study.thumbnailVideo.asset.playbackId}
                            streamType="on-demand"
                            autoPlay="muted"
                            muted
                            loop
                            playsInline
                            style={{
                                aspectRatio: '4/3',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                '--controls': 'none',
                                '--media-object-fit': 'cover',
                                '--media-object-position': 'center',
                            } as any}
                        />
                    </div>
                ) : imageProps ? (
                    <Image
                        {...(imageProps as any)}
                        alt={study.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        sizes="100vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium bg-gray-50">
                        {study.title[0]}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-display text-2xl text-stone-700 mb-2 group-hover:text-stone-500 transition-colors">
                        {study.title}
                    </h2>
                    {study.heroSubtitle && (
                        <p className="text-stone-500">{study.heroSubtitle}</p>
                    )}
                </div>
                <ArrowRight className="w-6 h-6 text-stone-300 group-hover:text-stone-500 transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
            </div>
        </Link>
    );
}
