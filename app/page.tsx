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
      name: 'Case Studies',
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
    <div className="min-h-screen flex items-center">
      {/* Use exact same container structure as Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-24 pt-8">
          {/* Top row: Heading and Navigation */}
          <div className="flex items-start justify-between gap-40">
            {/* Left side - Heading */}
            <div className="max-w-[705px]">
              <div className="space-y-5">
                <h1 className="font-display text-6xl text-stone-700 leading-[1.1]">
                  Marshall Weiss<br />
                  is a product designer
                </h1>
                <p className="font-sans text-2xl text-stone-500">
                  exploring the intersection of design, artificial intelligence, and philosophy.
                </p>
              </div>
            </div>

            {/* Right side - Navigation with hover previews */}
            <div>
              <HomeNavigation sections={sections} />
            </div>
          </div>

          {/* Bottom row: Profile/Currently and Contact */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src="/images/about/marsh photo gray background.png"
                alt="Marshall Weiss"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-display text-xl text-stone-600 mb-1">
                  Currently: Senior Product Designer at <a href="https://www.elconfidencial.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-stone-400 hover:text-stone-800 transition-colors">El Confidencial</a>.
                </p>
                <p className="text-base text-stone-500">
                  (one of the <a href="https://www.similarweb.com/website/elconfidencial.com/?_gl=1*az3vw8*_up*MQ..*_ga*MTc1NTcxMTQ5NC4xNzcyMzYxMjI0*_ga_V5DSP51YD0*czE3NzIzNjEyMjQkbzEkZzAkdDE3NzIzNjEyMjQkajYwJGwwJGgxNTYyMDcwMjA0#overview" target="_blank" rel="noopener noreferrer" className="underline decoration-stone-400 hover:text-stone-700 transition-colors">most visited</a> news sites in Spain!)
                </p>
              </div>
            </div>
            <GetInTouchButton />
          </div>
        </div>
      </div>
    </div>
  );
}
