import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import PortfolioProject from '@/components/PortfolioProject';
import { getPortfolioProjects } from '@/lib/portfolio';
import { getFunProjects } from '@/lib/sanity-these-days';
import thoughtsData from '@/data/thoughts.json';

export const revalidate = 60;
export default async function Home() {
  const [projects, experiments] = await Promise.all([
    getPortfolioProjects(),
    getFunProjects(),
  ]);
  const recorder = experiments.find((project: { title: string }) =>
    /four.?track|recorder/i.test(project.title),
  );
  const [featured, ...articles] = thoughtsData.items;
  return (
    <div className="portfolio-home">
      <section className="portfolio-hero portfolio-container">
        <div className="hero-title-wrap">
          <h1>
            Designing the tools
            <br className="desktop-break" /> behind the stories
            <span className="hero-period">.</span>
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
            Currently at{' '}
            <a
              href="https://www.elconfidencial.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              El Confidencial
            </a>
            .<br />
            Also teaching at Universidad Europea.
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
        <div className="work-footnote">
          <span>From the newsroom to the reader.</span>
          <p>
            Editorial tools, reader experiences, subscription flows, and the
            systems that hold them together.
          </p>
        </div>
      </section>
      <section className="experiment-section">
        <div className="portfolio-container experiment-grid">
          <div className="experiment-copy">
            <span className="experiment-label">
              <span className="record-dot" /> Away from the newsroom
            </span>
            <h2>
              A little less screen.
              <br />A little more sound.
            </h2>
            <p>
              A four-track recorder, right in your browser. An experiment in
              making music software feel simple, tactile, and fun to play with.
            </p>
            <p className="experiment-note">
              Inspired by the four-track recorders of the 1980s. Built with
              React and the Web Audio API.
            </p>
            <a
              className="light-button"
              href={recorder?.url || '/current'}
              target={recorder?.url ? '_blank' : undefined}
              rel={recorder?.url ? 'noopener noreferrer' : undefined}
            >
              Try the recorder <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <a
            className="recorder-art"
            href={recorder?.url || '/current'}
            target={recorder?.url ? '_blank' : undefined}
            rel={recorder?.url ? 'noopener noreferrer' : undefined}
            aria-label="Open the four-track recorder"
          >
            <div className="recorder-rings" aria-hidden="true" />
            <Image
              src="/experiments/four-track-recorder.png"
              width={900}
              height={900}
              alt="The four-track recorder interface"
              sizes="(max-width: 760px) 90vw, 50vw"
            />
            <span className="recorder-caption">
              A side project, made to be played.
            </span>
          </a>
        </div>
      </section>
      <section className="crystal-section portfolio-container">
        <a
          href="https://lapidarium.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="crystal-art"
          aria-label="Explore Lapidarium, an encyclopedia of precious stones"
        >
          <span className="crystal-art-title">Lapidarium</span>
          <Image
            className="mineral mineral-amethyst"
            src="/experiments/lapidarium/amethyst.webp"
            width={800}
            height={800}
            alt="Rendered amethyst crystal"
            sizes="(max-width: 760px) 60vw, 30vw"
          />
          <Image
            className="mineral mineral-malachite"
            src="/experiments/lapidarium/malachite.webp"
            width={800}
            height={800}
            alt="Rendered malachite specimen"
            sizes="(max-width: 760px) 40vw, 22vw"
          />
          <Image
            className="mineral mineral-opal"
            src="/experiments/lapidarium/opal.webp"
            width={800}
            height={800}
            alt="Rendered opal"
            sizes="(max-width: 760px) 26vw, 15vw"
          />
          <span className="crystal-art-caption">
            An encyclopedia of precious stones
          </span>
        </a>
        <div className="crystal-copy">
          <span className="project-category">Independent experiment</span>
          <h2>
            A small window
            <br />
            into deep time.
          </h2>
          <p>
            Lapidarium is a digital encyclopedia of crystals and precious
            stones. A place to explore their forms, properties, and the way they
            catch the light.
          </p>
          <p className="crystal-detail">
            Interactive 3D forms and rendered mineral turntables bring the
            collection off the page.
          </p>
          <a
            href="https://lapidarium.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Explore Lapidarium <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>
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
                  src={featured.image}
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
      <section className="personal-strip portfolio-container">
        <p>There’s a person behind the pixels.</p>
        <Link className="text-link" href="/current">
          What I’m reading, making, and doing{' '}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
