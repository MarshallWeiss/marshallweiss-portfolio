import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { groq } from 'next-sanity';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveProjectStory, sortProjects } from '@/lib/portfolio';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Revalidate every 30 seconds so published changes appear quickly
export const revalidate = 30;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const study = await client.fetch(
            groq`*[_type == "caseStudy" && slug.current == $slug][0]{ title, subtitle, overviewSummary }`,
            { slug }
        );
        if (!study) return {};
        return {
            title: study.title,
            description: study.overviewSummary || study.subtitle,
        };
    } catch {
        return {};
    }
}

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
    const { slug } = await params;

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
                        status,
                        "muxAspectRatio": data.aspect_ratio
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
            },
            _type == "splitMedia" => {
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

    // Query to get all case studies for navigation
    const allCaseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc) {
        title,
        displayOrder,
        "slug": slug.current
    }`;

    let caseStudy = null;
    let allCaseStudies: { title: string; slug: string; displayOrder?: number }[] = [];

    try {
        caseStudy = await client.fetch(query, { slug });
        allCaseStudies = sortProjects(await client.fetch(allCaseStudiesQuery));
    } catch (error) {
        console.error("Sanity fetch error:", error);
        // If we can't fetch real data, maybe we are in local dev without keys.
        // We could fallback to mock data for demonstration if needed,
        // but standard behavior is to show error or 404.
    }

    // Find current index and get previous/next (with infinite loop)
    const currentIndex = allCaseStudies.findIndex((study: any) => study.slug === slug);
    const prevCaseStudy = currentIndex > 0
        ? allCaseStudies[currentIndex - 1]
        : allCaseStudies[allCaseStudies.length - 1]; // Loop to last
    const nextCaseStudy = currentIndex < allCaseStudies.length - 1
        ? allCaseStudies[currentIndex + 1]
        : allCaseStudies[0]; // Loop to first

    if (!caseStudy) {
        // Optional: Demo mode for development if no keys are set
        // Remove this block for production
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
            return (
                <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-md text-center">
                        <h1 className="font-display text-2xl mb-4">Sanity Not Configured</h1>
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

    // Short reading path: a summary drawn from Sanity, plus an "on this page"
    // nav built from the modules an editor has explicitly opted in.
    const story = resolveProjectStory(caseStudy);
    const navSections = (caseStudy.modules || []).filter(
        (module: any) => module.showInSectionNav && typeof module.headline === 'string' && module.headline.trim()
    );

    const overview =
        story.summary || story.evidence || navSections.length > 0 ? (
            <>
                {(story.summary || story.evidence) && (
                    <aside className="case-quick-summary" aria-label="Project overview">
                        {story.summary && (
                            <div>
                                <h2>The short version</h2>
                                <p>{story.summary}</p>
                            </div>
                        )}
                        {story.evidence && (
                            <div>
                                <h2>{story.evidenceLabel}</h2>
                                <p>{story.evidence}</p>
                            </div>
                        )}
                    </aside>
                )}
                {navSections.length > 0 && (
                    <nav className="case-section-nav" aria-label="On this page">
                        {navSections.map((module: any) => (
                            <a key={module._key} href={`#section-${module._key}`}>
                                {module.headline.trim()}
                            </a>
                        ))}
                    </nav>
                )}
            </>
        ) : null;

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="px-6 md:px-12 max-w-[1920px] mx-auto pb-32 pt-8">
                {caseStudy.modules && caseStudy.modules.length > 0 ? (
                    <BlockRenderer modules={caseStudy.modules} overview={overview} />
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500">No modules found for this case study.</p>
                        <p className="text-sm text-gray-400 mt-2">Add modules in Sanity Studio to see content here.</p>
                    </div>
                )}
            </div>

            {/* Case Study Navigation */}
            {allCaseStudies.length > 1 && (
                <nav className="border-t border-gray-200 py-12 px-6 md:px-12 max-w-[1920px] mx-auto">
                    <div className="flex justify-between items-center gap-8">
                        {/* Previous Case Study */}
                        <Link
                            href={`/case-studies/${prevCaseStudy.slug}`}
                            className="group flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-base md:text-lg font-normal">{prevCaseStudy.title}</span>
                        </Link>

                        {/* Next Case Study */}
                        <Link
                            href={`/case-studies/${nextCaseStudy.slug}`}
                            className="group flex items-center gap-3 text-gray-900 hover:text-gray-600 transition-colors ml-auto"
                        >
                            <span className="text-base md:text-lg font-normal text-right">{nextCaseStudy.title}</span>
                            <ChevronRight className="w-6 h-6 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </nav>
            )}
        </div>
    );
}
