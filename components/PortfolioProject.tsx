import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MuxPlayer from '@mux/mux-player-react';
import { urlFor } from '@/sanity/lib/image';
import { resolveProjectStory, type PortfolioProjectData } from '@/lib/portfolio';

export default function PortfolioProject({
  project,
  priority = false,
  featured = false,
  showEvidence = false,
  headingLevel = 3,
}: {
  project: PortfolioProjectData;
  priority?: boolean;
  featured?: boolean;
  /** Show the study's outcome or scope statement under the description. */
  showEvidence?: boolean;
  /** 3 under a section heading (homepage); 2 when the cards are the page's sections. */
  headingLevel?: 2 | 3;
}) {
  const story = resolveProjectStory(project);
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const hasVideo = featured && project.thumbnailPlaybackId;
  return (
    <Link
      className={`portfolio-project project-${story.color}${featured ? ' is-featured' : ''}`}
      href={`/case-studies/${project.slug.current}`}
    >
      {/* The caption names the link; the artwork is a picture of the same project. */}
      <div className="project-art" aria-hidden="true">
        {hasVideo ? (
          <div className="project-screen is-filled">
            {/* The featured card plays the study's own thumbnail video, silently, instead of a still. */}
            <MuxPlayer
              playbackId={project.thumbnailPlaybackId}
              autoPlay="muted"
              loop
              muted
              playsInline
              streamType="on-demand"
              className="project-video"
              style={{
                '--controls': 'none',
                '--media-object-fit': 'cover',
                '--media-object-position': 'center top',
                '--media-background-color': 'white',
                backgroundColor: 'white',
              } as any}
            />
          </div>
        ) : project.heroImage ? (
          <div
            className={`project-screen ${story.imageFit === 'cover' ? 'is-filled' : ''}`}
          >
            <Image
              src={urlFor(project.heroImage)
                .width(1600)
                .quality(85)
                .auto('format')
                .url()}
              alt=""
              fill
              sizes={featured ? "(max-width: 760px) calc(100vw - 72px), (max-width: 1440px) 92vw, 1320px" : "(max-width: 760px) calc(100vw - 72px), (max-width: 1440px) 50vw, 660px"}
              className="project-image"
              priority={priority}
            />
          </div>
        ) : (
          <span className="project-art-fallback">{story.headline}</span>
        )}
      </div>
      <div className="project-caption">
        <div className="project-title">
          <Heading>{story.headline}</Heading>
          {story.meta && <p className="project-meta">{story.meta}</p>}
        </div>
        <div className="project-body">
          {story.description && <p className="project-description">{story.description}</p>}
          {showEvidence && story.evidence && (
            <p className="project-evidence">
              <span>{story.evidenceLabel}</span>
              {story.evidence}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
