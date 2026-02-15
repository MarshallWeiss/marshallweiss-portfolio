'use client';
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';

interface Card {
    _key?: string;
    title?: string;
    text?: string;
    items?: string[];
}

interface ContentCardsProps {
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    description?: string;
    textAlign?: 'left' | 'center' | 'right';
    headingSpacing?: 'compact' | 'default' | 'spacious';
    style?: 'bordered' | 'filled';
    columns?: '2' | '3';
    revealOnClick?: boolean;
    revealHint?: string;
    cards?: Card[];
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function ContentCards({
    headline,
    subheading,
    headlineSize,
    description,
    textAlign = 'left',
    headingSpacing = 'default',
    style = 'bordered',
    columns = '3',
    revealOnClick = false,
    revealHint = '👆 Click to reveal',
    cards,
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: ContentCardsProps) {
    const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [showCursorHint, setShowCursorHint] = useState(false);

    if (!cards || cards.length === 0) return null;

    const toggleCard = (index: number) => {
        if (!revealOnClick) return;

        setRevealedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const handleMouseMove = (e: React.MouseEvent, isRevealed: boolean) => {
        if (!revealOnClick || isRevealed) return;

        setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (isRevealed: boolean) => {
        if (!revealOnClick || isRevealed) return;
        setShowCursorHint(true);
    };

    const handleMouseLeave = () => {
        setShowCursorHint(false);
    };

    const alignmentClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';

    const headingSpacingClasses = {
        compact: 'mb-4',
        default: 'mb-8 md:mb-10',
        spacious: 'mb-12 md:mb-16',
    };

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <BlockHeading
                headline={headline}
                subheading={subheading}
                headlineSize={headlineSize}
                textAlign={textAlign}
                className={headingSpacingClasses[headingSpacing]}
            />
            {description && (
                <p className={cn(
                    "text-gray-600 text-lg max-w-3xl mb-10 md:mb-14",
                    alignmentClass,
                    textAlign === 'center' && 'mx-auto'
                )}>
                    {description}
                </p>
            )}

            {/* Cards Grid */}
            <div className={cn(
                "grid grid-cols-1 gap-4",
                columns === '2' ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
            )}>
                {cards.map((card, index) => {
                    const isRevealed = revealedCards.has(index);
                    const showContent = !revealOnClick || isRevealed;

                    return (
                        <div
                            key={card._key || index}
                            onClick={() => toggleCard(index)}
                            onMouseMove={(e) => handleMouseMove(e, isRevealed)}
                            onMouseEnter={() => handleMouseEnter(isRevealed)}
                            onMouseLeave={handleMouseLeave}
                            className={cn(
                                "rounded-lg p-6 md:p-8 transition-all duration-300 relative",
                                style === 'bordered'
                                    ? "bg-white border border-gray-200"
                                    : "bg-gray-100",
                                revealOnClick && "cursor-pointer select-none",
                                revealOnClick && !isRevealed && "hover:shadow-md hover:border-gray-300",
                                revealOnClick && isRevealed && "shadow-sm ring-1 ring-gray-200"
                            )}
                        >
                            {card.title && (
                                <h3 className="font-display text-lg md:text-xl text-gray-900 mb-3">
                                    {card.title}
                                </h3>
                            )}

                            {/* Content - blurred if not revealed */}
                            <div className={cn(
                                "transition-all duration-500",
                                revealOnClick && !isRevealed && "blur-sm pointer-events-none select-none",
                                revealOnClick && isRevealed && "animate-fade-in"
                            )}>
                                {/* Paragraph text */}
                                {card.text && (
                                    <p className="text-gray-600 leading-relaxed">
                                        {card.text}
                                    </p>
                                )}

                                {/* Bullet points */}
                                {card.items && card.items.length > 0 && (
                                    <ul className={cn("space-y-2", card.text && "mt-4")}>
                                        {card.items.map((item, itemIndex) => (
                                            <li
                                                key={itemIndex}
                                                className="flex items-start text-gray-600"
                                            >
                                                <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cursor-following hint */}
            {revealOnClick && showCursorHint && (
                <div
                    className="fixed pointer-events-none z-50 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-md shadow-lg"
                    style={{
                        left: `${cursorPosition.x + 12}px`,
                        top: `${cursorPosition.y + 12}px`,
                        transform: 'translate(0, 0)',
                    }}
                >
                    {revealHint}
                </div>
            )}
        </BlockWrapper>
    );
}
