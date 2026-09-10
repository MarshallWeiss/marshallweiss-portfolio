import type { Metadata } from 'next';
import GetInTouchButton from '@/components/GetInTouchButton';
export const metadata: Metadata = { title: 'Contact' };
export default function ContactPage() {
  return (
    <section className="portfolio-container contact-page">
      <h1>Say hello.</h1>
      <p>
        I’m based in Madrid and work in English and Spanish.
        <br />
        Get in touch about design, development, or teaching.
      </p>
      <GetInTouchButton />
      <a className="text-link" href="mailto:marshallweiss94@gmail.com">
        marshallweiss94@gmail.com
      </a>
    </section>
  );
}
