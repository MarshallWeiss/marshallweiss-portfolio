import React from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import WorkCard from '@/components/WorkCard';

// Revalidate every 5 seconds for development
export const revalidate = 5;

export default async function WorkIndexPage() {
    const query = groq`*[_type == "caseStudy" && defined(slug.current)] {
    title,
    subtitle,
    slug,
    thumbnailType,
    thumbnailVideo {
      asset->
    },
    "heroImage": coalesce(
      thumbnailImage,
      modules[_type == "hero" && showImage != false][0].image,
      modules[_type == "fullWidthMedia" && mediaType == "image"][0].image,
      modules[_type == "splitMedia" && mediaType == "image"][0].image,
      modules[_type == "carousel"][0].slides[0].image,
      modules[0].image
    ),
    "heroTitle": modules[0].title,
    "heroSubtitle": modules[0].subtitle
  } | order(select(slug.current == "el-confidencial-cms-modernization" => 0, 1), _createdAt desc)`;

    const caseStudies = await client.fetch(query);

    return (
        <main className="min-h-screen py-12 px-6 md:px-12 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                {caseStudies.map((study: any) => (
                    <WorkCard key={study.slug.current} study={study} />
                ))}
            </div>
        </main>
    );
}

