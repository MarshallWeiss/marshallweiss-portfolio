'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Metadata from './Metadata';
import SplitMedia from './SplitMedia';
import MediaGrid from './MediaGrid';
import FullWidthMedia from './FullWidthMedia';
import Carousel from './Carousel';
import BackgroundVideo from './BackgroundVideo';
import ContentCards from './ContentCards';
import Accordion from './Accordion';
import Comparison from './Comparison';
import SideBySideImages from './SideBySideImages';
import TextBlock from './TextBlock';
import AnnotatedImage from './AnnotatedImage';
import Divider from './Divider';
import AnimatedDiagram from './AnimatedDiagram';
import LazyBlock from './LazyBlock';

interface BlockRendererProps {
    modules: any[];
}

/** Number of blocks to render eagerly (above the fold) */
const EAGER_COUNT = 2;

function renderBlock(module: any, eager = false) {
    switch (module._type) {
        case 'hero':
            return <Hero {...module} priority={eager} />;
        case 'metadata':
            return <Metadata {...module} />;
        case 'splitMedia':
            return <SplitMedia {...module} />;
        case 'mediaGrid':
            return <MediaGrid {...module} />;
        case 'fullWidthMedia':
            return <FullWidthMedia {...module} />;
        case 'carousel':
            return <Carousel {...module} />;
        case 'backgroundVideo':
            return <BackgroundVideo {...module} />;
        case 'contentCards':
            return <ContentCards {...module} />;
        case 'accordion':
        case 'splitAccordion':
            return <Accordion {...module} />;
        case 'comparison':
            return <Comparison {...module} />;
        case 'sideBySideImages':
            return <SideBySideImages {...module} />;
        case 'textBlock':
            return <TextBlock {...module} />;
        case 'annotatedImage':
            return <AnnotatedImage {...module} />;
        case 'animatedDiagram':
            return <AnimatedDiagram {...module} />;
        case 'divider':
            return <Divider {...module} />;
        default:
            console.warn(`Unknown block type: ${module._type}`);
            return (
                <div className="hidden">
                    Unknown block: {module._type}
                </div>
            );
    }
}

export default function BlockRenderer({ modules }: BlockRendererProps) {
    if (!modules || !Array.isArray(modules)) {
        return null;
    }

    // Group hero + metadata blocks together for side-by-side layout
    const processedModules: any[] = [];
    for (let i = 0; i < modules.length; i++) {
        const current = modules[i];
        const next = modules[i + 1];

        if (current._type === 'hero' && next?._type === 'metadata') {
            processedModules.push({
                ...current,
                role: next.role,
                client: next.client,
                year: next.year,
            });
            i++;
        } else {
            processedModules.push(current);
        }
    }

    return (
        <div>
            {processedModules.map((module, index) => {
                const key = module._key || Math.random().toString(36).substring(7);
                const isEager = index < EAGER_COUNT;
                const block = renderBlock(module, isEager);

                if (isEager) {
                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.2,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        >
                            {block}
                        </motion.div>
                    );
                }

                return (
                    <LazyBlock key={key}>
                        {block}
                    </LazyBlock>
                );
            })}
        </div>
    );
}
