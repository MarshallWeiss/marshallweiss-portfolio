import React from 'react';
import BlockWrapper from './BlockWrapper';
import MediaItem from './MediaItem';

interface HeroProps {
    title: string;
    subtitle?: string;
    intro?: string;
    image?: any;
    showImage?: boolean;
    role?: string;
    client?: string;
    year?: string;
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    imageShadow?: 'none' | 'small' | 'medium' | 'large';
    enableLightbox?: boolean;
    imageCaption?: string;
    priority?: boolean;
    isInline?: boolean;
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function Hero({
    title,
    subtitle,
    intro,
    image,
    showImage = true,
    role,
    client,
    year,
    aspectRatio = 'auto',
    objectFit = 'cover',
    imageShadow = 'none',
    enableLightbox = false,
    imageCaption,
    priority = false,
    isInline,
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: HeroProps) {
    const hasMetadata = role || client || year;

    const content = (
        <div className={isInline ? "" : ""}>
            {/* Title and Metadata with space between */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12 mb-12">
                {/* Title Section - max 60% */}
                <div className="md:max-w-[60%]">
                    {subtitle && (
                        <p className="text-sm md:text-base text-gray-500 mb-4 font-normal tracking-wide">
                            {subtitle}
                        </p>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-[1.15] tracking-tight">
                        {title}
                    </h1>
                    {intro && (
                        <div className="max-w-2xl">
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                {intro}
                            </p>
                        </div>
                    )}
                </div>

                {/* Metadata Section - aligned right */}
                {hasMetadata && (
                    <div className="md:flex-shrink-0 md:ml-auto">
                        <div className="divide-y divide-gray-200 md:pt-8 min-w-[280px]">
                            {role && (
                                <div className="flex justify-between items-baseline py-4 first:pt-0 gap-8">
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </dt>
                                    <dd className="text-base text-gray-900 text-right">
                                        {role}
                                    </dd>
                                </div>
                            )}
                            {client && (
                                <div className="flex justify-between items-baseline py-4 gap-8">
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client
                                    </dt>
                                    <dd className="text-base text-gray-900 text-right">
                                        {client}
                                    </dd>
                                </div>
                            )}
                            {year && (
                                <div className="flex justify-between items-baseline py-4 last:pb-0 gap-8">
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Year
                                    </dt>
                                    <dd className="text-base text-gray-900 text-right">
                                        {year}
                                    </dd>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Cover Image */}
            {image && !isInline && showImage && (
                <div>
                    <MediaItem
                        image={image}
                        alt={title}
                        aspectRatio={aspectRatio}
                        objectFit={objectFit}
                        imageShadow={imageShadow}
                        enableLightbox={enableLightbox}
                        imageCaption={imageCaption}
                        priority={priority}
                    />
                </div>
            )}
        </div>
    );

    if (isInline) {
        return content;
    }

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            {content}
        </BlockWrapper>
    );
}
