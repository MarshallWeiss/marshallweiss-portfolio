'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface Card {
    _key?: string;
    title?: string;
    text?: string;
    items?: string[];
}

interface ContentCardsProps {
    headline?: string;
    description?: string;
    style?: 'bordered' | 'filled';
    columns?: '2' | '3';
    cards?: Card[];
}

export default function ContentCards({
    headline,
    description,
    style = 'bordered',
    columns = '3',
    cards
}: ContentCardsProps) {
    if (!cards || cards.length === 0) return null;

    return (
        <section className="py-16 md:py-24">
            {/* Header */}
            {(headline || description) && (
                <div className="mb-10 md:mb-14">
                    {headline && (
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">
                            {headline}
                        </h2>
                    )}
                    {description && (
                        <p className="text-gray-600 text-lg max-w-3xl">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Cards Grid */}
            <div className={cn(
                "grid grid-cols-1 gap-4",
                columns === '2' ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
            )}>
                {cards.map((card, index) => (
                    <div
                        key={card._key || index}
                        className={cn(
                            "rounded-lg p-6 md:p-8",
                            style === 'bordered'
                                ? "bg-white border border-gray-200"
                                : "bg-gray-100"
                        )}
                    >
                        {card.title && (
                            <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3">
                                {card.title}
                            </h3>
                        )}

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
                ))}
            </div>
        </section>
    );
}
