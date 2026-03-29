
const workHistory = [
  {
    title: 'Senior Product Designer',
    company: 'El Confidencial',
    period: '2022 - Present',
    description: 'Senior product designer for El Confidencial, a top digital newspaper in Spain (5M DUU, 60K paying subscribers). Involved in all aspects of product design, with a focus on long-term strategy, product discovery, user research, design system creation, subscription growth, and AI integration.',
  },
  {
    title: 'Assistant Professor',
    company: 'Universidad Europea',
    period: '2025 - Present',
    description: 'Assistant Professor in the Master in Communication and Digital Product Design at Universidad Europea de Madrid, helping students use design thinking and processes to take digital businesses from initial concept to final product.',
  },
  {
    title: 'UX/UI Designer',
    company: 'Portal Derecho, S.A.',
    period: '2020 - 2022',
    description: 'Led UX/UI research and design for Iustel, a legal document search platform. Responsible for all project phases, including user research, user persona and user-journey creation, wireframing, prototyping, design system development, and developer handoff.',
  },
  {
    title: 'Web and Graphic Designer',
    company: 'Freelance',
    period: '2018 - 2020',
    description: 'Completed a variety of web design/development and graphic design projects for businesses and organizations in both the United States and Spain. Worked with clients to create flexible, scalable, and maintainable design solutions.',
  },
];

const education = [
  { degree: 'Certificate, UX Design', school: 'CEI Escuela de Diseño (Madrid)', period: '2021 - 2022' },
  { degree: 'Master, Design', school: 'CEI Escuela de Diseño (Madrid)', period: '2020 - 2021' },
  { degree: 'M.A., Philosophy', school: 'Univ. Complutense de Madrid', period: '2018 - 2020' },
  { degree: 'B.A., Psychology', school: 'University of Wisconsin-Madison', period: '2012 - 2016' },
];

const tools = ['Claude Code', 'Figma', 'Cursor', 'Jira', 'Amplitude', 'Retool', 'ChatGPT', 'Bolt.new', 'Vercel', 'Midjourney'];

const skills = ['Product strategy', 'UX/UI design', 'Design system creation', 'Interactive prototyping', 'Data analysis', 'User Research'];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-16">
          {/* Left column */}
          <div className="space-y-12">
            {/* Header */}
            <div>
              <h1 className="font-display text-5xl md:text-6xl text-gray-900 mb-4">Marshall Weiss</h1>
              <p className="text-lg text-gray-700">
                <span className="font-medium">AI-first product designer and developer with four years of experience in a bilingual, bicultural environment.</span>{' '}
                Passionate about amplifying the impact of socially conscious products through excellent design.
              </p>
              <div className="flex gap-3 mt-6">
                <a
                  href="/Marshall-Weiss-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  🇺🇸 Download CV
                </a>
                <a
                  href="/Marshall-Weiss-CV-ES.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  🇪🇸 Descargar CV
                </a>
              </div>
            </div>

            {/* Work Experience */}
            <section>
              <h2 className="font-display text-2xl text-gray-900 mb-8">Selected Work Experience</h2>
              <div className="space-y-4">
                {workHistory.map((job, i) => (
                  <div key={i} className="p-5 bg-white/40 border border-gray-200/60 rounded-lg">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 mb-1">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                        <span className="text-base text-gray-400">·</span>
                        <span className="text-base text-gray-600">{job.company}</span>
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{job.period}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mt-2">{job.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* About Me */}
            <section>
              <h2 className="font-display text-2xl text-gray-900 mb-4">About Me</h2>
              <div className="space-y-3 text-base text-gray-600 leading-relaxed">
                <p>
                  I'm passionate about designing innovative products that contribute positively to society. My varied education and experience in psychology, philosophy, design, and entrepreneurship provides me with lateral thinking skills and a creative approach useful across all phases of the design process.
                </p>
                <p>
                  I'm comfortable working in in-office, hybrid and remote settings. Outside of work, I enjoy cycling, reading, and playing guitar.
                </p>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {/* Photo */}
            <div className="flex justify-center">
              <img
                src="/images/about/marsh photo gray background.png"
                alt="Marshall Weiss"
                className="w-36 h-36 lg:w-44 lg:h-44 rounded-full object-cover ring-1 ring-gray-900/5"
              />
            </div>

            {/* Contact */}
            <section>
              <h2 className="font-display text-2xl text-gray-900 mb-4">Contact</h2>
              <div className="space-y-2 text-sm">
                <a href="https://marshallweiss.com" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  marshallweiss.com
                </a>
                <a href="https://www.linkedin.com/in/marshallweissdesign/" target="_blank" rel="noopener noreferrer" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  linkedin.com/in/marshallweissdesign
                </a>
                <a href="mailto:marshallweiss94@gmail.com" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  marshallweiss94@gmail.com
                </a>
                <a href="tel:+34691608000" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  +34 691 608 000 (Spain)
                </a>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-display text-2xl text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">{edu.period}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools */}
            <section>
              <h2 className="font-display text-2xl text-gray-900 mb-4">Tools</h2>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="text-sm text-gray-600 px-2.5 py-1 bg-white/50 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="font-display text-2xl text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="text-sm text-gray-600 px-2.5 py-1 bg-white/50 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
