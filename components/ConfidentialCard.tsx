'use client';

import { useState, useRef } from 'react';

interface WorkProject {
  id: string;
  title: string;
  description?: string;
  company?: string;
  confidential: boolean;
}

interface ConfidentialCardProps {
  projects: WorkProject[];
}

export default function ConfidentialCard({ projects }: ConfidentialCardProps) {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const hasConfidential = projects.some((p) => p.confidential);

  function handleMouseMove(e: React.MouseEvent) {
    if (!hasConfidential || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleMouseLeave() {
    setTooltip({ visible: false, x: 0, y: 0 });
  }

  return (
    <div
      ref={cardRef}
      className="border border-gray-200 rounded-xl p-8 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="font-display text-xl text-gray-900 mb-6">Working</h2>
      <div className="space-y-5">
        {projects.length > 0 ? (
          projects.map((project) =>
            project.confidential ? (
              <div key={project.id} className="relative">
                <div className="select-none">
                  <h3 className="text-base font-medium text-gray-900 mb-1 blur-[6px]">
                    {project.title}
                  </h3>
                  {project.company && (
                    <p className="text-xs text-gray-500 mb-2 blur-[6px]">
                      {project.company}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-sm text-gray-600 leading-relaxed blur-[6px]">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div key={project.id}>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  {project.title}
                </h3>
                {project.company && (
                  <p className="text-xs text-gray-500 mb-2">{project.company}</p>
                )}
                {project.description && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            )
          )
        ) : (
          <div className="relative">
            <div className="select-none">
              <h3 className="text-base font-medium text-gray-900 mb-1 blur-[6px]">
                Subscription growth initiative
              </h3>
              <p className="text-xs text-gray-500 mb-2 blur-[6px]">El Confidencial</p>
              <p className="text-sm text-gray-600 leading-relaxed blur-[6px]">
                Leading product discovery and design for a new subscriber conversion flow
                targeting engaged readers.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cursor-following tooltip */}
      {hasConfidential && tooltip.visible && (
        <div
          className="absolute pointer-events-none z-10 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-full whitespace-nowrap shadow-lg"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -140%)',
          }}
        >
          Sorry, confidential!
        </div>
      )}
    </div>
  );
}
