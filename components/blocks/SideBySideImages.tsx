'use client'

import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/sanity/lib/client'

interface SideBySideImagesProps {
    headline?: string
    leftImage?: any
    leftLabel?: string
    rightImage?: any
    rightLabel?: string
    background?: 'gray' | 'white'
}

function SanityImage({ image, alt, label }: { image: any; alt: string; label?: string }) {
    const imageProps = useNextSanityImage(client, image)

    if (!imageProps) return null

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full">
                <Image
                    {...(imageProps as any)}
                    alt={alt}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto object-contain"
                />
            </div>
            {label && (
                <p className="mt-3 text-sm text-gray-600 font-medium">{label}</p>
            )}
        </div>
    )
}

export default function SideBySideImages({
    headline,
    leftImage,
    leftLabel,
    rightImage,
    rightLabel,
    background = 'gray',
}: SideBySideImagesProps) {
    const bgClass = background === 'gray' ? 'bg-gray-100' : 'bg-white'

    return (
        <section className={`py-16 ${bgClass}`}>
            <div className="max-w-6xl mx-auto px-6">
                {headline && (
                    <h2 className="text-2xl font-semibold mb-8 text-center">{headline}</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {leftImage && (
                        <SanityImage
                            image={leftImage}
                            alt={leftLabel || 'Left image'}
                            label={leftLabel}
                        />
                    )}
                    {rightImage && (
                        <SanityImage
                            image={rightImage}
                            alt={rightLabel || 'Right image'}
                            label={rightLabel}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
