import React from 'react';
import Hero from './Hero';
import Metadata from './Metadata';
import SplitMedia from './SplitMedia';
import MediaGrid from './MediaGrid';
import FullWidthMedia from './FullWidthMedia';
import Carousel from './Carousel';
import BackgroundVideo from './BackgroundVideo';

interface BlockRendererProps {
    modules: any[];
}

export default function BlockRenderer({ modules }: BlockRendererProps) {
    if (!modules || !Array.isArray(modules)) {
        return null;
    }

    return (
        <div className="space-y-12 md:space-y-24 lg:space-y-32">
            {modules.map((module) => {
                // Use _key as key if available, otherwise random fallback
                const key = module._key || Math.random().toString(36).substring(7);

                switch (module._type) {
                    case 'hero':
                        return <Hero key={key} {...module} />;

                    case 'metadata':
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
