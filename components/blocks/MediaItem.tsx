'use client'

import { useState } from 'react'
import Image from 'next/image'
import MuxPlayer from '@mux/mux-player-react'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface MediaItemProps {
    mediaType?: 'image' | 'video'
    image?: any
    video?: any
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16'
    objectFit?: 'cover' | 'contain'
    imageShadow?: 'none' | 'small' | 'medium' | 'large'
    enableLightbox?: boolean
    imageCaption?: string
    alt?: string
    className?: string
    priority?: boolean
}

export default function MediaItem({
    mediaType = 'image',
    image,
    video,
    aspectRatio = 'auto',
    objectFit = 'cover',
    imageShadow = 'none',
    enableLightbox = false,
    imageCaption,
    alt = 'Media',
    className,
    priority = false,
}: MediaItemProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const imageProps = mediaType === 'image' && image ? useNextSanityImage(client, image, {
        imageBuilder: (imageUrlBuilder, options) => {
            return imageUrlBuilder
                .width(Math.min(options.width || 3000, 3000))
                .quality(95)
        }
    }) : null

    // Aspect ratio classes
    const aspectRatioClasses = {
        'auto': '',
        'square': 'aspect-square',
        '4:3': 'aspect-[4/3]',
        '16:9': 'aspect-video',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]',
    }

    // Object fit classes
    const objectFitClasses = {
        cover: 'object-cover',
        contain: 'object-contain',
    }

    // Shadow classes
    const shadowClasses = {
        'none': '',
        'small': 'shadow-sm',
        'medium': 'shadow-md',
        'large': 'shadow-lg',
    }

    const containerClasses = cn(
        'relative w-full rounded-xl overflow-hidden',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
        shadowClasses[imageShadow],
        enableLightbox && 'cursor-pointer hover:opacity-95 transition-opacity',
        className
    )

    // Render video
    if (mediaType === 'video' && video?.asset) {
        return (
            <div className={containerClasses}>
                <MuxPlayer
                    playbackId={video.asset.playbackId}
                    streamType="on-demand"
                    className="w-full h-full"
                />
            </div>
        )
    }

    // Render image
    if (mediaType === 'image' && imageProps) {
        return (
            <>
                <div>
                    <div
                        className={containerClasses}
                        onClick={() => enableLightbox && setLightboxOpen(true)}
                    >
                        <Image
                            {...imageProps as any}
                            alt={alt}
                            className={cn(
                                'w-full h-full',
                                objectFitClasses[objectFit]
                            )}
                            sizes="100vw"
                            priority={priority}
                        />
                    </div>
                    {imageCaption && (
                        <p className="mt-3 text-sm text-gray-500 text-center italic">
                            {imageCaption}
                        </p>
                    )}
                </div>

                {/* Lightbox */}
                {enableLightbox && lightboxOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-6 right-6 z-10 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <Image
                            {...imageProps as any}
                            alt={alt}
                            className="object-contain max-h-[90vh] max-w-[90vw]"
                            sizes="100vw"
                        />
                    </div>
                )}
            </>
        )
    }

    return null
}
