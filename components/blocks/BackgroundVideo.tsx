'use client';
import React, { useRef, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { cn } from '@/lib/utils';

interface BackgroundVideoProps {
    video?: any; // Sanity file reference
    heading?: string;
    text?: string;
    overlayOpacity?: number; // 0-100
    overlayColor?: string; // 'dark' or 'light'
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
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && autoplay) {
            // Attempt to play, catching errors for browsers that block autoplay
            videoRef.current.play().catch((error) => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, [autoplay]);

    // Get video URL from Sanity
    const videoUrl = video?.asset?._ref
        ? `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${video.asset._ref.replace('file-', '').replace('-mp4', '.mp4').replace('-mov', '.mov').replace('-webm', '.webm')}`
        : null;

    return (
        <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
            {/* Background Video */}
            {videoUrl && (
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay={autoplay}
                    loop={loop}
                    muted={muted}
                    playsInline
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* Overlay */}
            <div
                className={cn(
                    'absolute inset-0',
                    overlayColor === 'dark' ? 'bg-black' : 'bg-white'
                )}
                style={{ opacity: overlayOpacity / 100 }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
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
        </section>
    );
}
