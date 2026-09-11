import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import PortfolioProject from "@/components/PortfolioProject";
import { getPortfolioProjects } from "@/lib/portfolio";
import { getFunProjects } from "@/lib/sanity-these-days";
import thoughtsData from "@/data/thoughts.json";
import { SHOW_PERSONAL_WRITING } from "@/lib/flags";
import LapidariumArtwork from "@/components/LapidariumArtwork";

export const revalidate = 60;
export default async function Home() {
  const [projects, experiments] = await Promise.all([
    getPortfolioProjects(),
    getFunProjects(),
  ]);
  const recorder = experiments.find((project: { title: string }) =>
    /four.?track|recorder/i.test(project.title),
  );
  const lapidarium = experiments.find((project: { title: string }) =>
    /lapidarium/i.test(project.title),
  );
  const [featured, ...articles] = thoughtsData.items;
  return (
    <div className="portfolio-home">
      <section className="portfolio-hero portfolio-container">
        <div className="hero-title-wrap">
          <h1>
            Designing the tools
            <br className="desktop-break" /> behind the stories
          </h1>
          <a className="hero-scroll" href="#selected-work">
            <ArrowDown size={18} aria-hidden="true" /> A few things I’ve worked
            on
          </a>
        </div>
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
              <span className="muted">Madrid, Spain</span>
            </span>
          </div>
          <p>
            I’m a product designer and developer working where design,
            journalism, and AI meet.
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
      <section
        id="selected-work"
        className="selected-section portfolio-container"
      >
        <div className="section-intro">
          <h2>Selected work</h2>
          <Link className="text-link" href="/case-studies">
            All projects <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="selected-grid">
          {projects.slice(0, 2).map((project) => (
            <PortfolioProject
              key={project.slug.current}
              project={project}
              priority
            />
          ))}
        </div>
      </section>
      <section className="experiments-section portfolio-container">
        <div className="section-intro">
          <div>
            <h2>Independent experiments.</h2>
            <p>Small products and systems made away from the newsroom.</p>
          </div>
          <Link className="text-link" href="/current">
            What I’m making <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="experiments-grid">
          {recorder && (
            <a
              className="experiment-card experiment-card--recorder"
              href={recorder.url || "/current"}
              target={recorder.url ? "_blank" : undefined}
              rel={recorder.url ? "noopener noreferrer" : undefined}
              aria-label={`Open ${recorder.title}`}
            >
              <div className="experiment-card-copy">
                <span className="experiment-card-label">
                  <span className="record-dot" /> Sound experiment
                </span>
                <h3>{recorder.title}</h3>
                {recorder.description && <p>{recorder.description}</p>}
                <span className="experiment-card-link">
                  Open recorder <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
              <div className="experiment-card-media">
                <Image
                className="recorder-card-art"
                src={recorder.image || "/experiments/four-track-recorder.png"}
                width={900}
                height={900}
                alt=""
                sizes="(max-width: 540px) 260px, (max-width: 1000px) 45vw, 25vw"
              />
              </div>
            </a>
          )}
          {lapidarium && (
            <a
              href={lapidarium.url || "/current"}
              target={lapidarium.url ? "_blank" : undefined}
              rel={lapidarium.url ? "noopener noreferrer" : undefined}
              className="experiment-card experiment-card--lapidarium"
              aria-label={`Explore ${lapidarium.title}`}
            >
              <div className="experiment-card-media">
                <LapidariumArtwork variant="card" imageSrc={lapidarium.image} />
              </div>
              <div className="experiment-card-copy">
                <span className="experiment-card-label">
                  Reference experiment
                </span>
                <h3>{lapidarium.title}</h3>
                {lapidarium.description && <p>{lapidarium.description}</p>}
                <span className="experiment-card-link">
                  Explore collection{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
            </a>
          )}
        </div>
      </section>
      {SHOW_PERSONAL_WRITING && (
        <section className="writing-section portfolio-container">
          <div className="section-intro">
            <div>
              <h2>Thinking out loud.</h2>
              <p>Notes on designing, building, and figuring things out.</p>
            </div>
            <Link className="text-link" href="/thoughts">
              All writing <ArrowUpRight size={18} aria-hidden="true" />
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
                  <span>
                    {featured.category} · {featured.readingTime} min read
                  </span>
                  <h3>{featured.title}</h3>
                  <MoveUpRight className="essay-arrow" aria-hidden="true" />
                </div>
              </Link>
            )}
            <div className="essay-list">
              {articles.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/thoughts/${article.slug}`}>
                  <span>
                    {article.category} · {article.readingTime} min read
                  </span>
                  <h3>{article.title}</h3>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="personal-strip portfolio-container">
        <p>There’s a person behind the pixels.</p>
        <Link className="text-link" href="/current">
          What I’m reading, making, and doing{" "}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
