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
    // The subtitle is a short area label ("Subscriptions"). It sits with the
    // other facts in the metadata column rather than as a kicker above the H1.
    const focus = subtitle?.trim();
    const metadataRows = [
        { label: 'Role', value: role },
        { label: 'Client', value: client },
        { label: 'Focus', value: focus },
        { label: 'Year', value: year },
    ].filter((row) => row.value);
    const hasMetadata = metadataRows.length > 0;

    const content = (
        <div className={isInline ? "" : ""}>
            {/* Title and Metadata with space between */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-12 mb-12">
                {/* Title Section - max 60% */}
                <div className="md:max-w-[60%]">
                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.15] tracking-tight">
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
                        <dl className="divide-y divide-gray-200 md:pt-2 min-w-[280px]">
                            {metadataRows.map((row) => (
                                <div key={row.label} className="flex justify-between items-baseline py-4 first:pt-0 last:pb-0 gap-8">
                                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {row.label}
                                    </dt>
                                    <dd className="text-base text-gray-900 text-right">
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
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
