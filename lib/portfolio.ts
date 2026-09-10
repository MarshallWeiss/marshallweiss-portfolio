import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

/**
 * Fallback presentation copy for the case studies that existed before the
 * card/overview fields were added to the Sanity schema. Sanity always wins:
 * these values are only used when the matching field is empty, so editing a
 * case study in Studio is all that's needed to change what the site shows.
 *
 * Once every case study has its fields filled in from Studio, this map can go.
 */
export const projectStoryFallbacks: Record<
  string,
  {
    headline: string;
    description: string;
    category: string;
    color: string;
    summary: string;
    evidence: string;
    evidenceLabel?: string;
  }
> = {
  'el-confidencial-cms-modernization': {
    headline: 'A better place to write.',
    description:
      'Jarvis — bringing the writing, editing, and AI tools of a newsroom into one workspace.',
    category: 'Editorial tools & AI',
    color: 'blue',
    summary:
      'Modernizing a 15-year-old CMS into a writing workspace, with integrated multimedia, related-article suggestions, and style guidance.',
    evidence:
      'Rolled out section by section, with the breaking-news desk last to protect its time-critical workflow.',
  },
  'el-confidencial-home-page-redesign': {
    headline: 'Making sense of the news.',
    description:
      'A new front page for El Confidencial, organized around stories and the way people read.',
    category: 'Reader experience',
    color: 'sage',
    summary:
      'A responsive, modular homepage that shifts from traditional sections to topics, alongside El Confidencial’s 25th-anniversary rebrand.',
    evidence:
      'First-week observations: engagement time rose about 10%; recirculation fell about 12%; ad revenue held broadly flat. These are early, week-over-week results.',
    evidenceLabel: 'Early results, with a tradeoff',
  },
  'checkout-optimization': {
    headline: 'A clearer path to subscribing.',
    description:
      'Rethinking the steps between deciding to subscribe and becoming a reader.',
    category: 'Subscriptions',
    color: 'peach',
    summary:
      'A systematic redesign of El Confidencial’s subscription checkout, focused on friction in the purchase flow.',
    evidence:
      'Explore the case study for the research, design changes, and evaluation.',
  },
  'paywall-redesign': {
    headline: 'Showing the value of a story.',
    description: 'A more considered subscription offer for El Confidencial’s readers.',
    category: 'Subscriptions',
    color: 'lilac',
    summary:
      'Rethinking how the newspaper presents its subscription offer at the moment a reader encounters the paywall.',
    evidence:
      'Explore the case study for the problem, design approach, and outcomes.',
  },
  'jarvis-design-system': {
    headline: 'A shared language for the team.',
    description:
      'The components and foundations behind a more consistent newsroom product.',
    category: 'Design systems',
    color: 'blue',
    summary:
      'Building the component library and design language for El Confidencial’s product team.',
    evidence:
      'Explore the case study for the system and how it supports product work.',
  },
};

/** Order used only when a case study has no `displayOrder` set in Sanity. */
const legacyOrder = Object.keys(projectStoryFallbacks);

export interface PortfolioProjectData {
  title: string;
  subtitle?: string;
  slug: { current: string };
  heroImage?: any;
  cardHeadline?: string;
  cardCategory?: string;
  accentColor?: string;
  cardImageFit?: 'contain' | 'cover';
  displayOrder?: number;
  overviewSummary?: string;
  overviewEvidence?: string;
  overviewEvidenceLabel?: string;
}

/**
 * Resolves what a project card should show. Sanity fields take precedence;
 * the fallback map fills gaps for case studies published before those fields
 * existed, and sensible defaults cover anything brand new.
 */
export function resolveProjectStory(project: PortfolioProjectData) {
  const fallback = projectStoryFallbacks[project.slug?.current] ?? undefined;
  return {
    headline: project.cardHeadline || fallback?.headline || project.title,
    description: project.subtitle || fallback?.description || '',
    category: project.cardCategory || fallback?.category || 'Product design',
    color: project.accentColor || fallback?.color || 'blue',
    summary: project.overviewSummary || fallback?.summary || '',
    evidence: project.overviewEvidence || fallback?.evidence || '',
    imageFit: project.cardImageFit || 'contain',
    evidenceLabel:
      project.overviewEvidenceLabel ||
      fallback?.evidenceLabel ||
      'In practice',
  };
}

/** Rank a case study for editorial ordering. Sanity's displayOrder wins. */
export function rankProject(project: {
  slug?: { current: string } | string;
  displayOrder?: number;
}) {
  if (typeof project.displayOrder === 'number') return project.displayOrder;
  const slug =
    typeof project.slug === 'string' ? project.slug : project.slug?.current;
  const legacy = slug ? legacyOrder.indexOf(slug) : -1;
  // Legacy slugs keep their historical order; everything else falls to the end.
  return legacy === -1 ? Number.MAX_SAFE_INTEGER : legacy;
}

export function sortProjects<T extends { slug: any; displayOrder?: number }>(
  projects: T[],
): T[] {
  return [...projects].sort((a, b) => rankProject(a) - rankProject(b));
}

export const portfolioProjectFields = groq`
  title,
  subtitle,
  slug,
  cardHeadline,
  cardCategory,
  accentColor,
  cardImageFit,
  displayOrder,
  "heroImage": coalesce(
    thumbnailImage,
    modules[_type == "hero" && showImage != false][0].image,
    modules[_type == "fullWidthMedia" && mediaType == "image"][0].image
  )
`;

export async function getPortfolioProjects() {
  const projects = await client.fetch(groq`
    *[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc) {
      ${portfolioProjectFields}
    }
  `);
  return sortProjects(projects as PortfolioProjectData[]);
}
