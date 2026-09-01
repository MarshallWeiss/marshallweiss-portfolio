'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface NavSection {
  name: string;
  path: string;
  description: string;
  previews: {
    title: string;
    subtitle?: string;
    image?: string;
  }[];
}

interface HomeNavigationProps {
  sections: NavSection[];
}

export default function HomeNavigation({ sections }: HomeNavigationProps) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (sectionName: string) => {
    setHoveredSection(sectionName);
  };

  const handleMouseLeave = (sectionName: string) => {
    setHoveredSection(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[283px] relative"
      onMouseMove={handleMouseMove}
    >
      {sections.map((section, index) => {
        const currentPreview = section.previews[0];
        const isHovered = hoveredSection === section.name;

        return (
          <div key={section.path} className="relative">
            <Link
              href={section.path}
              className={`group flex items-center justify-between h-[76px] lg:h-[83px] ${
                index > 0 ? 'border-t border-gray-200 pt-px' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(section.name)}
              onMouseLeave={() => handleMouseLeave(section.name)}
            >
              <div>
                <h2 className="font-display text-xl text-gray-900 mb-1">
                  {section.name}
                </h2>
                <p className="text-base text-gray-500">{section.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-900 transition-colors" />
            </Link>

            {/* Hover Preview Card - Unified Design */}
            {isHovered && (
              <div
                className="fixed z-50 pointer-events-none"
                style={{
                  left: `${mousePosition.x - 340}px`,
                  top: `${mousePosition.y - 60}px`,
                }}
              >
                <div className="w-[320px] h-32 bg-white rounded-lg border border-gray-200 shadow-lg flex overflow-hidden">
                  <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-center">
                    <h3 className="font-medium text-base text-gray-900 leading-snug line-clamp-2">
                      {currentPreview.title}
                    </h3>
                  </div>
                  {currentPreview.image && (
                    <div className="flex-shrink-0 w-28 sm:w-32 p-2">
                      <div className="w-full h-full bg-gray-100 rounded overflow-hidden">
                        <img
                          src={currentPreview.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
