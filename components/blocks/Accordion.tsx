'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import BlockWrapper from './BlockWrapper';
import BlockHeading from './BlockHeading';

interface AccordionItem {
    _key?: string;
    title: string;
    content: string;
}

interface AccordionProps {
    headline?: string;
    subheading?: string;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large';
    textAlign?: 'left' | 'center' | 'right';
    text?: string;
    items?: AccordionItem[];
    layout?: 'fullWidth' | 'split';
    reverseLayout?: boolean;
    width?: 'contained' | 'wide' | 'full';
    background?: 'none' | 'white' | 'gray';
    spacing?: 'compact' | 'default' | 'spacious';
}

export default function Accordion({
    headline,
    subheading,
    headlineSize,
    textAlign = 'left',
    text,
    items,
    layout = 'fullWidth',
    reverseLayout = false,
    width = 'contained',
    background = 'none',
    spacing = 'default',
}: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!items || items.length === 0) return null;

    // Full Width Layout
    if (layout === 'fullWidth') {
        return (
            <BlockWrapper width={width} background={background} spacing={spacing}>
                <BlockHeading
                    headline={headline}
                    subheading={subheading}
                    headlineSize={headlineSize || 'large'}
                    textAlign={textAlign}
                    className="mb-10 md:mb-14"
                />
                <div className="border-t border-gray-200">
                    {items.map((item, index) => (
                        <div key={item._key || index} className="border-b border-gray-200">
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full flex items-center justify-between py-5 text-left hover:text-gray-600 transition-colors"
                            >
                                <span className="text-base md:text-lg font-normal text-gray-900 pr-8">
                                    {item.title}
                                </span>
                                <svg
                                    className={cn(
                                        "w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0",
                                        openIndex === index ? "rotate-180" : ""
                                    )}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300",
                                    openIndex === index ? "max-h-[500px] pb-6" : "max-h-0"
                                )}
                            >
                                <p className="text-gray-600 leading-relaxed pl-0 md:pl-12 max-w-3xl">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </BlockWrapper>
        );
    }

    // Split Layout (original SplitAccordion)
    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24",
                reverseLayout ? "lg:grid-flow-dense" : ""
            )}>
                {/* Text Side */}
                <div className={cn(
                    reverseLayout ? "lg:col-start-2" : "lg:col-start-1"
                )}>
                    <BlockHeading
                        headline={headline}
                        subheading={subheading}
                        headlineSize={headlineSize || 'medium'}
                        textAlign={textAlign}
                        className="mb-6"
                    />
                    {text && (
                        <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {text}
                        </div>
                    )}
                </div>

                {/* Accordion Side */}
                <div className={cn(
                    reverseLayout ? "lg:col-start-1" : "lg:col-start-2"
                )}>
                    <div className="divide-y divide-gray-200 border-t border-gray-200">
                        {items.map((item, index) => (
                            <div key={item._key || index}>
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full flex items-center justify-between py-4 text-left hover:text-gray-600 transition-colors"
                                >
                                    <span className="text-lg font-medium text-gray-900">
                                        {item.title}
                                    </span>
                                    <svg
                                        className={cn(
                                            "w-5 h-5 text-gray-500 transition-transform duration-200",
                                            openIndex === index ? "rotate-180" : ""
                                        )}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={cn(
                                        "overflow-hidden transition-all duration-200",
                                        openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                                    )}
                                >
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    );
}
