import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">About</h1>
        <div className="prose prose-gray max-w-none">
          <div className="flex flex-col md:flex-row gap-16 mb-8">
            <div className="flex-shrink-0 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]">
              <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/profile.png"
                  alt="Marshall Weiss"
                  fill
                  className="object-cover shadow-[4px_4px_12px_0px_rgba(0,0,0,0.9)]"
                  style={{ boxSizing: 'content-box' }}
                  sizes="(max-width: 768px) 224px, 320px"
                />
              </div>
            </div>
            <div className="flex-1 max-w-lg">
              <p className="text-gray-700 leading-relaxed mb-4">
                Hi! I'm Marshall Weiss, a product designer currently working for El Confidencial, one of the largest digital newspapers in Spain.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Originally from Washington, DC, I have spent the last decade living and working in Madrid, Spain. My full bilinguality (native English and Spanish) and bicultural understanding are complemented by my diverse academic background spanning Psychology, Philosophy, Graphic Design, and UX Design. I am fascinated by product design, user research, and design ops. I have completed a wide range of projects in UX/UI design, research, web development, and graphic design for companies and individuals based both in the United States and Spain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
