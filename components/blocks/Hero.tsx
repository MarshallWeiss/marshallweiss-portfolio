import React from 'react';

interface HeroProps {
    title: string;
    subtitle?: string;
    intro?: string;
    isInline?: boolean;
}

export default function Hero({ title, subtitle, intro, isInline }: HeroProps) {
    const content = (
        <div className={isInline ? "" : "max-w-4xl"}>
            {subtitle && (
                <p className="text-sm md:text-base text-gray-500 mb-4 font-normal tracking-wide">
                    {subtitle}
                </p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-6 leading-[1.15] tracking-tight">
                {title}
            </h1>
            {intro && (
                <div className={isInline ? "" : "max-w-2xl"}>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        {intro}
                    </p>
                </div>
            )}
        </div>
    );

    if (isInline) {
        return content;
    }

    return (
        <section className="mb-24 mt-12 md:mt-24">
            {content}
        </section>
    );
}
