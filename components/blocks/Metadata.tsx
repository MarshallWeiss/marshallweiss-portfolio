import React from 'react';

interface MetadataProps {
    role?: string;
    client?: string;
    year?: string;
}

export default function Metadata({ role, client, year }: MetadataProps) {
    return (
        <section className="border-t border-b border-gray-200 py-6 md:py-8 my-16 md:my-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {role && (
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Role</span>
                        <span className="text-base md:text-lg font-medium text-gray-900">{role}</span>
                    </div>
                )}
                {client && (
                    <div className="flex flex-col md:border-l md:border-gray-100 md:pl-12">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Client</span>
                        <span className="text-base md:text-lg font-medium text-gray-900">{client}</span>
                    </div>
                )}
                {year && (
                    <div className="flex flex-col md:border-l md:border-gray-100 md:pl-12">
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">Year</span>
                        <span className="text-base md:text-lg font-medium text-gray-900">{year}</span>
                    </div>
                )}
            </div>
        </section>
    );
}
