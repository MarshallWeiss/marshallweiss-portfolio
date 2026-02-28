'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
};

const contentTransition = {
    height: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
    opacity: { duration: 0.25, delay: 0.05 },
};

function AccordionItemPanel({
    item,
    isOpen,
    onToggle,
    variant = 'full',
}: {
    item: AccordionItem;
    isOpen: boolean;
    onToggle: () => void;
    variant?: 'full' | 'split';
}) {
    return (
        <div className={variant === 'full' ? 'border-b border-gray-200' : ''}>
            <button
                onClick={onToggle}
                className={cn(
                    "w-full flex items-center justify-between text-left hover:text-gray-600 transition-colors",
                    variant === 'full' ? 'py-5' : 'py-4'
                )}
            >
                <span className={cn(
                    "text-gray-900 pr-8",
                    variant === 'full' ? 'text-base md:text-lg font-normal' : 'text-lg font-medium'
                )}>
                    {item.title}
                </span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className={cn(
                        "w-5 h-5 flex-shrink-0",
                        variant === 'full' ? 'text-gray-400' : 'text-gray-500'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={variant === 'full' ? 1.5 : 2}
                        d="M19 9l-7 7-7-7"
                    />
                </motion.svg>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={contentVariants}
                        transition={contentTransition}
                        style={{ overflow: 'hidden' }}
                    >
                        <p className={cn(
                            "text-gray-600 leading-relaxed",
                            variant === 'full' ? 'pl-0 md:pl-12 max-w-3xl pb-6' : 'pb-4'
                        )}>
                            {item.content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
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
                        <AccordionItemPanel
                            key={item._key || index}
                            item={item}
                            isOpen={openIndex === index}
                            onToggle={() => toggleItem(index)}
                            variant="full"
                        />
                    ))}
                </div>
            </BlockWrapper>
        );
    }

    // Split Layout
    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
            <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24",
                reverseLayout ? "lg:grid-flow-dense" : ""
            )}>
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

                <div className={cn(
                    reverseLayout ? "lg:col-start-1" : "lg:col-start-2"
                )}>
                    <div className="divide-y divide-gray-200 border-t border-gray-200">
                        {items.map((item, index) => (
                            <AccordionItemPanel
                                key={item._key || index}
                                item={item}
                                isOpen={openIndex === index}
                                onToggle={() => toggleItem(index)}
                                variant="split"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    );
}
