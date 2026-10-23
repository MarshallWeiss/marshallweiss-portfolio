import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PortfolioProject from "@/components/PortfolioProject";
import { getPortfolioProjects } from "@/lib/portfolio";
import { getFunProjects } from "@/lib/sanity-these-days";
import thoughtsData from "@/data/thoughts.json";
import { SHOW_PERSONAL_WRITING } from "@/lib/flags";
import AtlasArtwork from "@/components/AtlasArtwork";

export const revalidate = 60;

type SideProject = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  image?: string | null;
};

/**
 * Small artwork for a side project. Known projects get their own drawing;
 * anything else (including a renamed project) falls back to its Sanity image,
 * or to its initial, so a card is never dropped.
 */
function SideProjectArt({ project }: { project: SideProject }) {
  if (/atlas/i.test(project.title)) {
    return (
      <span className="side-art side-art--atlas">
        <AtlasArtwork />
      </span>
    );
  }
  if (/four.?track|recorder/i.test(project.title)) {
    return (
      <span className="side-art side-art--recorder">
        <Image
          src={project.image || "/experiments/four-track-recorder.png"}
          width={300}
          height={300}
          alt=""
          sizes="120px"
        />
      </span>
    );
  }
  if (/lapidarium/i.test(project.title)) {
    return (
      <span className="side-art side-art--lapidarium">
        <Image
          src="https://lapidarium.vercel.app/renders/amber/amber_021.webp"
          width={300}
          height={300}
          alt=""
          sizes="120px"
        />
      </span>
    );
  }
  return (
    <span className="side-art">
      {project.image ? (
        <Image src={project.image} width={300} height={300} alt="" sizes="120px" />
      ) : (
        <span className="side-art-initial">{project.title.charAt(0)}</span>
      )}
    </span>
  );
}

export default async function Home() {
  const [projects, sideProjects] = await Promise.all([
    getPortfolioProjects(),
    getFunProjects(3) as Promise<SideProject[]>,
  ]);
  const [featured, ...articles] = thoughtsData.items;
  return (
    <div className="portfolio-home">
      <section className="portfolio-hero portfolio-container">
        <h1>
          Designing the tools
          <br className="desktop-break" /> behind the stories
        </h1>
        <div className="hero-intro">
          <div className="intro-person">
            <Image
              src="/images/about/marsh photo gray background.png"
              alt="Marshall Weiss"
              width={64}
              height={64}
              priority
            />
            <span>
              Marshall Weiss
              <br />
              <span className="muted">Madrid &amp; Washington, DC</span>
            </span>
          </div>
          <p>
            I’m a senior product designer and developer working where
            design, journalism, and AI meet.
          </p>
          <p className="intro-detail">
            Currently at{" "}
            <a
              href="https://www.elconfidencial.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              El Confidencial
            </a>
            .<br />
            Also teaching at{" "}
            <a
              href="https://universidadeuropea.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Universidad Europea
            </a>
            .<br />
            Fully bilingual in English and Spanish.
          </p>
          <Link className="text-link" href="/about">
            A little more about me <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      {projects.length > 0 && (
        <section
          id="selected-work"
          className="selected-section portfolio-container"
          aria-labelledby="selected-work-heading"
        >
          <div className="section-intro">
            <h2 id="selected-work-heading">Selected work</h2>
            <Link className="text-link" href="/case-studies">
              All work <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="selected-grid">
            {projects.slice(0, 3).map((project, i) => (
              <PortfolioProject
                key={project.slug.current}
                project={project}
                priority={i < 2}
                featured={i === 0}
              />
            ))}
          </div>
        </section>
      )}
      {sideProjects.length > 0 && (
        <section
          className="side-section portfolio-container"
          aria-labelledby="side-projects-heading"
        >
          <div className="section-intro">
            <div>
              <h2 id="side-projects-heading">Side projects</h2>
              <p>Things I build in my own time, mostly to learn how they work. Still rough around the edges.</p>
            </div>
            <Link className="text-link" href="/current">
              More in Current <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="side-list">
            {sideProjects.map((project) => (
              <li key={project.id}>
                <a
                  className="side-project"
                  href={project.url || "/current"}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noopener noreferrer" : undefined}
                >
                  <SideProjectArt project={project} />
                  <span className="side-copy">
                    <span className="side-title">
                      {project.title}
                      {project.url && (
                        <>
                          <ArrowUpRight size={15} aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </>
                      )}
                    </span>
                    {project.description && (
                      <span className="side-description">{project.description}</span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      {SHOW_PERSONAL_WRITING && (
        <section className="writing-section portfolio-container">
          <div className="section-intro">
            <div>
              <h2>Writing</h2>
              <p>Notes on design, building software, and what I’m figuring out.</p>
            </div>
            <Link className="text-link" href="/thoughts">
              All writing <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-writing-grid">
            {featured && (
              <Link
                href={`/thoughts/${featured.slug}`}
                className="featured-essay"
              >
                <div className="essay-image">
                  <Image
                    src={`/images/thoughts/${featured.slug}-og.png`}
                    fill
                    alt=""
                    sizes="(max-width: 760px) 90vw, 50vw"
                  />
                </div>
                <div className="essay-info">
                  <h3>{featured.title}</h3>
                  <span>
                    {featured.category} · {featured.readingTime} min read
                  </span>
                </div>
              </Link>
            )}
            <div className="essay-list">
              {articles.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/thoughts/${article.slug}`}>
                  <h3>{article.title}</h3>
                  <span>
                    {article.category} · {article.readingTime} min read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
