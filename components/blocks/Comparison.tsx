'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';
import MediaItem from './MediaItem';

interface ComparisonProps {
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    description?: string;
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

export default function Comparison({
    headline,
    subheading,
    headlineSize,
    description,
    textAlign = 'center',
    leftImage,
    leftLabel,
    rightImage,
    rightLabel,
    labelSize = 'small',
    aspectRatio = 'auto',
    objectFit = 'cover',
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: ComparisonProps) {
    if (!leftImage && !rightImage) return null;

    const alignmentClass = textAlign === 'center' ? 'text-left md:text-center' : textAlign === 'right' ? 'text-left md:text-right' : 'text-left';

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
                className=""
            />
            {description && (
                <p className={cn("text-gray-600 text-lg leading-relaxed mb-12 md:mb-16", alignmentClass)}>
                    {description}
                </p>
            )}

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left */}
                {leftImage && (
                    <div>
                        {leftLabel && (
                            <p className={cn("font-medium text-gray-900 mb-4", labelSizeClasses[labelSize])}>{leftLabel}</p>
                        )}
                        <div className="shadow-lg">
                            <MediaItem
                                image={leftImage}
                                alt={leftLabel || "Left comparison image"}
                                aspectRatio={aspectRatio}
                                objectFit={objectFit}
                            />
                        </div>
                    </div>
                )}

                {/* Right */}
                {rightImage && (
                    <div>
                        {rightLabel && (
                            <p className={cn("font-medium text-gray-900 mb-4", labelSizeClasses[labelSize])}>{rightLabel}</p>
                        )}
                        <div className="shadow-lg">
                            <MediaItem
                                image={rightImage}
                                alt={rightLabel || "Right comparison image"}
                                aspectRatio={aspectRatio}
                                objectFit={objectFit}
                            />
                        </div>
                    </div>
                )}
            </div>
        </BlockWrapper>
    );
}
