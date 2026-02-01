import { cn } from '@/lib/utils'

interface TextBlockProps {
    headline?: string
    text: string
    alignment?: 'left' | 'center' | 'right'
    maxWidth?: 'narrow' | 'medium' | 'wide'
}

export default function TextBlock({
    headline,
    text,
    alignment = 'center',
    maxWidth = 'medium',
}: TextBlockProps) {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    const maxWidthClasses = {
        narrow: 'max-w-prose',  // ~65ch
        medium: 'max-w-3xl',     // ~48rem
        wide: 'max-w-5xl',       // ~64rem
    }

    return (
        <section className="py-12 md:py-24">
            <div className={cn(
                'mx-auto px-6',
                maxWidthClasses[maxWidth],
                alignmentClasses[alignment]
            )}>
                {headline && (
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        {headline}
                    </h2>
                )}
                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {text}
                </div>
            </div>
        </section>
    )
}
