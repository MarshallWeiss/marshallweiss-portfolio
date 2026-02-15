import Image from 'next/image';
import { Download } from 'lucide-react';

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

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-1 ring-gray-900/5 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/about/profile.jpg"
                  alt="Marshall Weiss"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </div>

            <div className="flex-1 space-y-6 max-w-2xl">
              <div>
                <h1 className="font-display text-4xl md:text-5xl text-gray-900 mb-3">Marshall Weiss</h1>
                <p className="text-xl text-gray-600">Senior Product Designer</p>
              </div>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  I'm a Senior Product Designer at El Confidencial with about six years in product design. My path here was winding but intentional.
                </p>
                <p>
                  I started with a bachelor's degree in Psychology at the University of Wisconsin-Madison, then moved to Spain to pursue a master's in Philosophy at Universidad Complutense. During COVID, I finally took the leap into something I'd always wanted to do but found intimidating—a master's in Graphic Design. Through that program, I discovered the world of UX design.
                </p>
                <p>
                  After completing a UX design course, I started taking on freelance projects and gradually built my way into the field. Now, as a senior product designer, I'm fascinated by how AI is reshaping our workflows—the new possibilities it creates, and the ethical and political questions it raises.
                </p>
              </div>

              <a
                href="/Marshall-Weiss-CV.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience Timeline */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl text-gray-900 mb-10">Experience</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-[7px] top-2 bottom-2 w-px bg-gray-200" />

            <div className="space-y-10">
              {workHistory.map((job, i) => (
                <div key={i} className="relative pl-8 md:pl-10">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-gray-900 bg-white" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 shrink-0">{job.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl text-gray-900 mb-10">Education</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <div key={i} className="border-t border-gray-200 pt-4">
                <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-500 mt-1">{edu.school}</p>
                <p className="text-sm text-gray-400 mt-0.5">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl text-gray-900 mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:marshallweiss94@gmail.com"
              className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-200">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 mb-1">Email</div>
                  <div className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    marshallweiss94@gmail.com
                  </div>
                </div>
              </div>
            </a>

            <a
              href="tel:+34691608000"
              className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-gray-400 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-200">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-500 mb-1">Phone</div>
                  <div className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    +34 691 608 000
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
