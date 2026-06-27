'use client';
import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';

interface BackgroundVideoProps {
    video?: {
        asset?: {
            playbackId?: string;
            /** Mux source aspect ratio, e.g. "9:5". Used to size the framed view exactly. */
            muxAspectRatio?: string;
        };
        playbackId?: string;
    };
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    text?: string;
    textAlign?: 'left' | 'center' | 'right';
    overlayOpacity?: number;
    overlayColor?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    /** Wrap the video in a browser-style frame (soft mat + rounded bordered panel), matching the Spotlight Tour. */
    frame?: boolean;
    /** Address shown in the fake browser bar (only when framed), e.g. elconfidencial.com */
    frameLabel?: string;
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function BackgroundVideo({
    video,
    headline,
    subheading,
    headlineSize = 'large',
    text,
    textAlign = 'center',
    overlayOpacity = 50,
    overlayColor = 'dark',
    autoplay = true,
    loop = true,
    muted = true,
    aspectRatio = '16:9',
    frame = false,
    frameLabel,
    width = 'full',
    background = 'none',
    spacing = 'default',
}: BackgroundVideoProps) {
    // Get Mux playback ID from expanded asset reference
    const playbackId = video?.asset?.playbackId || video?.playbackId;

    if (!playbackId) {
        return null;
    }

    const aspectRatioClass = {
        'auto': 'aspect-video',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }[aspectRatio];

    // When framed, size the box to the clip's native aspect ratio so nothing is
    // cropped at the sides (the configured aspectRatio still drives full-bleed
    // background videos). Falls back to the configured ratio if Mux didn't report one.
    const nativeAspect = video?.asset?.muxAspectRatio?.replace(':', ' / ');
    const useNativeAspect = frame && Boolean(nativeAspect);

    const videoSection = (
        <section
            className={cn("relative w-full overflow-hidden bg-white", !useNativeAspect && aspectRatioClass)}
            style={useNativeAspect ? { aspectRatio: nativeAspect } : undefined}
        >
            {/* Background Video using Mux Player */}
            <MuxPlayer
                playbackId={playbackId}
                autoPlay={autoplay ? "muted" : false}
                loop={loop}
                muted={muted}
                playsInline
                className="absolute inset-0 w-full h-full"
                style={{
                    '--controls': 'none',
                    '--media-object-fit': 'cover',
                    '--media-object-position': 'center',
                    '--media-background-color': 'white',
                    'backgroundColor': 'white',
                } as any}
                streamType="on-demand"
                maxResolution="2160p"
                minResolution="1080p"
            />

            {/* Overlay */}
            <div
                className={cn(
                    'absolute inset-0 pointer-events-none',
                    overlayColor === 'dark' ? 'bg-black' : 'bg-white'
                )}
                style={{ opacity: overlayOpacity / 100 }}
            />

            {/* Content */}
            {(headline || subheading || text) && (
                <div className={cn(
                    "relative z-10 h-full flex items-center justify-center px-6 md:px-12 pointer-events-none",
                    textAlign === 'left' ? 'justify-start' : textAlign === 'right' ? 'md:justify-end' : 'md:justify-center'
                )}>
                    <div className={cn(
                        "max-w-4xl",
                        textAlign === 'left' ? 'text-left' : textAlign === 'right' ? 'text-left md:text-right' : 'text-left md:text-center'
                    )}>
                        {subheading && (
                            <p className={cn(
                                'text-sm md:text-base mb-4 font-normal tracking-wide',
                                overlayColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            )}>
                                {subheading}
                            </p>
                        )}
                        {headline && (
                            <h2
                                className={cn(
                                    'font-bold mb-6 leading-tight',
                                    headlineSize === 'small' ? 'text-2xl md:text-3xl' :
                                    headlineSize === 'large' ? 'text-4xl md:text-6xl lg:text-7xl' :
                                    'text-3xl md:text-4xl lg:text-5xl',
                                    overlayColor === 'dark' ? 'text-white' : 'text-gray-900'
                                )}
                            >
                                {headline}
                            </h2>
                        )}
                        {text && (
                            <p
                                className={cn(
                                    'text-xl md:text-2xl leading-relaxed font-light',
                                    overlayColor === 'dark' ? 'text-gray-200' : 'text-gray-700'
                                )}
                            >
                                {text}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            {frame ? (
                <div className="rounded-2xl border border-stone-900/10 bg-[#F7F5F2] p-3 md:p-5">
                    <div className="overflow-hidden rounded-xl border border-stone-900/10 bg-white shadow-sm">
                        {/* Fake browser chrome */}
                        <div className="flex items-center gap-1.5 border-b border-stone-900/10 px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-stone-300" />
                            <span className="h-2 w-2 rounded-full bg-stone-300" />
                            <span className="h-2 w-2 rounded-full bg-stone-300" />
                            <div className="ml-2 flex-1 rounded bg-stone-100 px-2 py-0.5 text-[9px] text-stone-400">{frameLabel || ' '}</div>
                        </div>
                        {videoSection}
                    </div>
                </div>
            ) : videoSection}
        </BlockWrapper>
    );
}
