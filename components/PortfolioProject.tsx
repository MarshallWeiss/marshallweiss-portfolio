import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { resolveProjectStory, type PortfolioProjectData } from '@/lib/portfolio';

export default function PortfolioProject({
  project,
  priority = false,
}: {
  project: PortfolioProjectData;
  priority?: boolean;
}) {
  const story = resolveProjectStory(project);
  return (
    <Link
      className={`portfolio-project project-${story.color}`}
      href={`/case-studies/${project.slug.current}`}
    >
      <div className="project-art">
        <div className="project-art-top">
          <span>El Confidencial</span>
          <ArrowUpRight size={22} aria-hidden="true" />
        </div>
        {project.heroImage && (
          <div
            className={`project-screen ${story.imageFit === 'cover' ? 'is-filled' : ''}`}
          >
            <Image
              src={urlFor(project.heroImage)
                .width(1600)
                .quality(85)
                .auto('format')
                .url()}
              alt={project.title}
              fill
              sizes="(max-width: 760px) calc(100vw - 72px), (max-width: 1440px) 50vw, 660px"
              className="project-image"
              priority={priority}
            />
          </div>
        )}
      </div>
      <div className="project-caption">
        <span className="project-category">{story.category}</span>
        <h3>{story.headline}</h3>
        {story.description && <p>{story.description}</p>}
      </div>
    </Link>
  );
}
