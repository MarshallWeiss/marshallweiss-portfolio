import HomeNavigation from '@/components/HomeNavigation';
import GetInTouchButton from '@/components/GetInTouchButton';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import thoughtsData from '@/data/thoughts.json';

export default async function Home() {
  // Fetch case studies for preview data
  const caseStudiesQuery = groq`*[_type == "caseStudy" && defined(slug.current)] {
    title,
    slug,
    "role": modules[_type == "metadata"][0].role,
    "heroImage": coalesce(
      thumbnailImage,
      modules[_type == "hero" && showImage != false][0].image,
      modules[_type == "fullWidthMedia" && mediaType == "image"][0].image
    )
  } | order(select(slug.current == "el-confidencial-cms-modernization" => 0, 1), _createdAt desc)[0...3]`;

  const caseStudies = await client.fetch(caseStudiesQuery);
  const thoughts = thoughtsData.items;

  const sections = [
    {
      name: 'Work',
      path: '/case-studies',
      description: 'Product design work',
      previews: [{
        title: caseStudies[0]?.title || 'Case Studies',
        image: caseStudies[0]?.heroImage ? urlFor(caseStudies[0].heroImage).width(640).url() : undefined,
      }],
    },
    {
      name: 'Thoughts',
      path: '/thoughts',
      description: 'Writing on design and AI',
      previews: [{
        title: thoughts[0]?.title || 'Thoughts',
        image: thoughts[0]?.image,
      }],
    },
    {
      name: 'Current',
      path: '/current',
      description: 'What I\'m up to now',
      previews: [{
        title: 'Retro Four Track Recorder',
        image: '/experiments/four-track-recorder.png',
      }],
    },
  ];

  return (
    <div className="flex-1 flex flex-col lg:justify-center py-8 sm:py-12 lg:py-0">
      {/* Use exact same container structure as Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-none">
        <div className="flex-1 flex flex-col justify-between gap-10 sm:gap-16 lg:flex-none lg:gap-24 lg:pt-8">
          {/* Top row: Heading and Navigation */}
          <div className="contents lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-24 xl:gap-40">
            {/* Left side - Heading */}
            <div className="max-w-[705px]">
              <div className="space-y-3 lg:space-y-5">
                <h1 className="font-display text-[2rem] sm:text-5xl lg:text-6xl text-stone-700 leading-[1.1]">
                  Marshall Weiss is an <span className="whitespace-nowrap">AI-first</span> product designer and developer.
                </h1>
                <p className="hidden sm:block font-sans text-xl lg:text-2xl text-stone-500">
                  I design and build products for one of Spain's largest independent newspapers, reaching millions of readers a day. Fully bilingual in English and Spanish.
                </p>
              </div>
            </div>

            {/* Right side - Navigation with hover previews */}
            <div className="w-full lg:w-auto">
              <HomeNavigation sections={sections} />
            </div>
          </div>

          {/* Bottom row: Profile/Currently and Contact */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src="/images/about/marsh photo gray background.png"
                alt="Marshall Weiss"
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col">
                <p className="font-display text-base sm:text-xl text-stone-600 mb-0.5 sm:mb-1">
                  Currently: Senior Product Designer at <a href="https://www.elconfidencial.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-stone-400 hover:text-stone-800 transition-colors">El Confidencial</a>.
                </p>
                <p className="text-sm sm:text-base text-stone-500">
                  Also teaching at Universidad Europea.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <GetInTouchButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
