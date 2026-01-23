'use client';

import React from 'react';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WorkCard({ study }: { study: any }) {
    const imageProps = useNextSanityImage(client, study.heroImage);

    return (
        <Link
            href={`/case-studies/${study.slug.current}`}
            className="group block"
        >
            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-6">
                {imageProps ? (
                    <Image
                        {...(imageProps as any)}
                        alt={study.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-medium bg-gray-50">
                        {study.title[0]}
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {study.title}
                    </h2>
                    {study.heroSubtitle && (
                        <p className="text-gray-500">{study.heroSubtitle}</p>
                    )}
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-blue-600 transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
            </div>
        </Link>
    );
}
