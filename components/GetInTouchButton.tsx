'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function GetInTouchButton() {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText('marshallweiss94@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="group relative inline-flex items-center gap-2 px-6 py-3.5 bg-stone-700 text-white text-base font-medium rounded-lg hover:bg-stone-600 transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden"
      >
        <span>Get in touch</span>
        {copied
          ? <Check className="w-4 h-4" />
          : <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        }
      </button>
      <div
        className={`absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 bg-stone-800 text-white text-xs rounded-full whitespace-nowrap transition-all duration-200 ${
          copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
        }`}
      >
        Copied to clipboard
      </div>
    </div>
  );
}
