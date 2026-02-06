import React from 'react';
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

interface BlockRendererProps {
    modules: any[];
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
            // Merge metadata fields into hero for backward compatibility
            processedModules.push({
                ...current,
                role: next.role,
                client: next.client,
                year: next.year,
            });
            i++; // Skip the next module since we've merged it
        } else {
            processedModules.push(current);
        }
    }

    return (
        <div>
            {processedModules.map((module) => {
                // Use _key as key if available, otherwise random fallback
                const key = module._key || Math.random().toString(36).substring(7);

                switch (module._type) {
                    case 'hero':
                        return <Hero key={key} {...module} />;

                    case 'metadata':
                        // Standalone metadata blocks (legacy) - render as before
                        return <Metadata key={key} {...module} />;

                    case 'splitMedia':
                        return <SplitMedia key={key} {...module} />;

                    case 'mediaGrid':
                        return <MediaGrid key={key} {...module} />;

                    case 'fullWidthMedia':
                        return <FullWidthMedia key={key} {...module} />;

                    case 'carousel':
                        return <Carousel key={key} {...module} />;

                    case 'backgroundVideo':
                        return <BackgroundVideo key={key} {...module} />;

                    case 'contentCards':
                        return <ContentCards key={key} {...module} />;

                    case 'accordion':
                    case 'splitAccordion': // backward compatibility
                        return <Accordion key={key} {...module} />;

                    case 'comparison':
                        return <Comparison key={key} {...module} />;

                    case 'sideBySideImages':
                        return <SideBySideImages key={key} {...module} />;

                    case 'textBlock':
                        return <TextBlock key={key} {...module} />;

                    case 'annotatedImage':
                        return <AnnotatedImage key={key} {...module} />;

                    default:
                        console.warn(`Unknown block type: ${module._type}`);
                        return (
                            <div key={key} className="hidden">
                                Unknown block: {module._type}
                            </div>
                        );
                }
            })}
        </div>
    );
}
