import React from 'react';

interface HeroProps {
    title: string;
    subtitle?: string;
    intro?: string;
}

export default function Hero({ title, subtitle, intro }: HeroProps) {
    return (
        <section className="mb-24 mt-12 md:mt-24">
            <div className="max-w-4xl">
                {subtitle && (
                    <p className="text-sm md:text-base text-gray-500 mb-4 font-normal tracking-wide uppercase">
                        {subtitle}
                    </p>
                )}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                    {title}
                </h1>
                {intro && (
                    <div className="max-w-2xl">
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                            {intro}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
