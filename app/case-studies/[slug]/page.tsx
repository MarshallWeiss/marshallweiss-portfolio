import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { groq } from 'next-sanity';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
    params: {
        slug: string;
    };
}

// Revalidate every hour
export const revalidate = 3600;

export async function generateStaticParams() {
    // If credentials are missing, skip generation
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return [];
    }

    try {
        const slugs = await client.fetch(groq`*[_type == "caseStudy" && defined(slug.current)][].slug.current`);
        return slugs.map((slug: string) => ({ slug }));
    } catch (error) {
        console.error('Error fetching static params:', error);
        return [];
    }
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = params;

    // Query to fetch the full document with expanded Mux video assets
    const query = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
        ...,
        modules[]{
            ...,
            _type == "backgroundVideo" => {
                ...,
                video{
                    ...,
                    asset->{
                        playbackId,
                        assetId,
                        status
                    }
                }
            },
            _type == "fullWidthMedia" => {
                ...,
                video{
                    ...,
                    asset->{
                        playbackId,
                        assetId,
                        status
                    }
                }
            }
        }
    }`;

    let caseStudy = null;

    try {
        caseStudy = await client.fetch(query, { slug }, { next: { revalidate: 0 } });
    } catch (error) {
        console.error("Sanity fetch error:", error);
        // If we can't fetch real data, maybe we are in local dev without keys.
        // We could fallback to mock data for demonstration if needed, 
        // but standard behavior is to show error or 404.
    }

    if (!caseStudy) {
        // Optional: Demo mode for development if no keys are set
        // Remove this block for production
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return (
                <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Sanity Not Configured</h1>
                        <p className="text-gray-600 mb-6">
                            Please create a .env.local file with your Sanity credentials to view this page.
                        </p>
                        <code className="bg-gray-100 p-4 rounded block text-left text-sm">
                            NEXT_PUBLIC_SANITY_PROJECT_ID=...<br />
                            NEXT_PUBLIC_SANITY_DATASET=...
                        </code>
                    </div>
                </div>
            )
        }
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <div className="px-6 md:px-12 h-16 md:h-20 flex items-center justify-between max-w-[1920px] mx-auto">
                    <Link
                        href="/case-studies"
                        className="text-sm font-medium text-gray-900 tracking-wide hover:text-gray-600 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Case Studies
                    </Link>
                    <span className="text-sm font-semibold text-gray-900 hidden md:block">
                        {caseStudy.title}
                    </span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-24 md:pt-32 px-6 md:px-12 max-w-[1920px] mx-auto pb-32">
                <BlockRenderer modules={caseStudy.modules} />
            </div>

            {/* Footer Navigation or Next Project could go here */}
        </main>
    );
}
