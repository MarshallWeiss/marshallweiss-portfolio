import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import GetInTouchButton from './GetInTouchButton';
export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="portfolio-container">
        <div className="footer-main">
          <h2>Write to me in English or Spanish.</h2>
          <div className="footer-contact">
            <p>
              Email is the quickest way to reach me. My CV is on the About
              page.
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
            Designed and built in Madrid.
          </span>
          <div>
            <a
              href="https://www.linkedin.com/in/marshallweissdesign/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/about">
              About and CV <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
