import type { Metadata } from 'next';
import PortfolioProject from '@/components/PortfolioProject';
import { getPortfolioProjects } from '@/lib/portfolio';
export const metadata: Metadata = {
  title: 'Selected work',
  description:
    'Editorial tools, reader experiences, subscriptions, and design systems for El Confidencial.',
};
export const revalidate = 60;
export default async function WorkIndexPage() {
  const projects = await getPortfolioProjects();
  return (
    <div className="portfolio-container work-index">
      <div className="index-heading">
        <h1>Work, in context.</h1>
        <p>
          Four years of product design at El Confidencial, a Spanish national
          newspaper: the CMS its journalists write in, and the pages its
          readers see.
        </p>
      </div>
      <div className="work-index-grid">
        {projects.map((project, i) => (
          <PortfolioProject
            project={project}
            priority={i < 2}
            headingLevel={2}
            key={project.slug.current}
          />
        ))}
      </div>
    </div>
  );
}
