'use client';

import { ArrowRight } from 'lucide-react';

export default function GetInTouchButton() {
  return (
    <a
      href="mailto:marshallweiss94@gmail.com"
      className="group relative inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white text-base font-medium rounded-lg hover:bg-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
    >
      <span>Get in touch</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
