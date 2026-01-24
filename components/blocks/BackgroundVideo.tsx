'use client';
import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { cn } from '@/lib/utils';

interface BackgroundVideoProps {
    video?: {
        asset?: {
            playbackId?: string;
        };
        playbackId?: string;
    };
    heading?: string;
    text?: string;
    overlayOpacity?: number;
    overlayColor?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
}

export default function BackgroundVideo({
    video,
    heading,
    text,
    overlayOpacity = 50,
    overlayColor = 'dark',
    autoplay = true,
    loop = true,
    muted = true,
}: BackgroundVideoProps) {
    // Get Mux playback ID from expanded asset reference
    const playbackId = video?.asset?.playbackId || video?.playbackId;

    if (!playbackId) {
        return null;
    }

    return (
        <section className="relative w-screen aspect-video overflow-hidden bg-white" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
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
                } as React.CSSProperties}
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
            {(heading || text) && (
                <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12 pointer-events-none">
                    <div className="max-w-4xl text-center">
                        {heading && (
                            <h2
                                className={cn(
                                    'text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight',
                                    overlayColor === 'dark' ? 'text-white' : 'text-gray-900'
                                )}
                            >
                                {heading}
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
}
