'use client'

import Image from 'next/image'
import MuxPlayer from '@mux/mux-player-react'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/sanity/lib/client'
import { cn } from '@/lib/utils'

interface MediaItemProps {
    mediaType?: 'image' | 'video'
    image?: any
    video?: any
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16'
    objectFit?: 'cover' | 'contain'
    alt?: string
    className?: string
}

export default function MediaItem({
    mediaType = 'image',
    image,
    video,
    aspectRatio = 'auto',
    objectFit = 'cover',
    alt = 'Media',
    className,
}: MediaItemProps) {
    const imageProps = mediaType === 'image' && image ? useNextSanityImage(client, image) : null

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

    const containerClasses = cn(
        'relative w-full rounded-xl overflow-hidden bg-gray-50',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
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
            <div className={containerClasses}>
                <Image
                    {...imageProps as any}
                    alt={alt}
                    className={cn(
                        'w-full h-full',
                        objectFitClasses[objectFit]
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        )
    }

    return null
}
