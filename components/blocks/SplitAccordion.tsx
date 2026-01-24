'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
    _key?: string;
    title: string;
    content: string;
}

interface SplitAccordionProps {
    headline?: string;
    text?: string;
    items?: AccordionItem[];
    reverseLayout?: boolean;
}

export default function SplitAccordion({ headline, text, items, reverseLayout = false }: SplitAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!items || items.length === 0) return null;

    return (
        <section className="py-16 md:py-24">
            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24",
                reverseLayout ? "lg:grid-flow-dense" : ""
            )}>
                {/* Text Side */}
                <div className={cn(
                    reverseLayout ? "lg:col-start-2" : "lg:col-start-1"
                )}>
                    {headline && (
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-6">
                            {headline}
                        </h2>
                    )}
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
        </section>
    );
}
