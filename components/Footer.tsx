import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GetInTouchButton from './GetInTouchButton';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="portfolio-container">
        <div className="footer-main">
          <div>
            <p className="footer-kicker">Have something in mind?</p>
            <h2>
              Let’s make
              <br />
              something useful.
            </h2>
          </div>
          <div className="footer-contact">
            <p>
              Design, development, or a good conversation.
              <br />
              In English or Spanish.
            </p>
            <GetInTouchButton />
            <a className="footer-email" href="mailto:marshallweiss94@gmail.com">
              marshallweiss94@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Marshall Weiss</span>
          <span className="footer-location">
            Made with curiosity, in Madrid.
          </span>
          <div>
            <a
              href="https://www.linkedin.com/in/marshallweissdesign/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <Link href="/about">
              About & CV <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
