'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
import MediaItem from './MediaItem';

interface SideBySideImagesProps {
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    textAlign?: 'left' | 'center' | 'right';
    leftImage?: any;
    leftLabel?: string;
    rightImage?: any;
    rightLabel?: string;
    labelSize?: 'small' | 'medium' | 'large';
    aspectRatio?: 'auto' | 'square' | '4:3' | '16:9' | '3:4' | '9:16';
    objectFit?: 'cover' | 'contain';
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function SideBySideImages({
    headline,
    subheading,
    headlineSize,
    textAlign = 'center',
    leftImage,
    leftLabel,
    rightImage,
    rightLabel,
    labelSize = 'small',
    aspectRatio = 'auto',
    objectFit = 'contain',
    width = 'contained',
    background = 'gray',
    spacing = 'default',
}: SideBySideImagesProps) {
    const labelSizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    };

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <BlockHeading
                headline={headline}
                subheading={subheading}
                headlineSize={headlineSize}
                textAlign={textAlign}
                className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {leftImage && (
                    <div className="flex flex-col items-center">
                        <MediaItem
                            image={leftImage}
                            alt={leftLabel || 'Left image'}
                            aspectRatio={aspectRatio}
                            objectFit={objectFit}
                        />
                        {leftLabel && (
                            <p className={cn("mt-3 text-gray-600 font-medium", labelSizeClasses[labelSize])}>{leftLabel}</p>
                        )}
                    </div>
                )}
                {rightImage && (
                    <div className="flex flex-col items-center">
                        <MediaItem
                            image={rightImage}
                            alt={rightLabel || 'Right image'}
                            aspectRatio={aspectRatio}
                            objectFit={objectFit}
                        />
                        {rightLabel && (
                            <p className={cn("mt-3 text-gray-600 font-medium", labelSizeClasses[labelSize])}>{rightLabel}</p>
                        )}
                    </div>
                )}
            </div>
        </BlockWrapper>
    );
}
