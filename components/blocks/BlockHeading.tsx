import { cn } from '@/lib/utils'

type HeadlineSize = 'xsmall' | 'small' | 'medium' | 'large'

/**
 * Small headlines mark sub-sections, so they sit one level below the section
 * headings around them. Item headings inside a block (cards, slides, hotspots)
 * go one level below the block's own heading.
 */
export function headingLevel(size: HeadlineSize = 'medium'): 2 | 3 {
    return size === 'small' || size === 'xsmall' ? 3 : 2
}

export function childHeadingTag(size: HeadlineSize = 'medium'): 'h3' | 'h4' {
    return headingLevel(size) === 3 ? 'h4' : 'h3'
}

interface BlockHeadingProps {
    headline?: string
    subheading?: string
    headlineSize?: HeadlineSize
    textAlign?: 'left' | 'center' | 'right'
    className?: string
}

export default function BlockHeading({
    headline,
    subheading,
    headlineSize = 'medium',
    textAlign = 'left',
    className,
}: BlockHeadingProps) {
    if (!headline && !subheading) return null

    const headlineSizeClasses = {
        xsmall: 'text-lg md:text-xl',
        small: 'text-xl md:text-2xl',
        medium: 'text-2xl md:text-3xl',
        large: 'text-3xl md:text-4xl lg:text-5xl',
    }

    const alignmentClasses = {
        left: 'text-left',
        center: 'text-left md:text-center',
        right: 'text-left md:text-right',
    }

    const Heading = headingLevel(headlineSize) === 3 ? 'h3' : 'h2'

    return (
        <div className={cn('mb-6', alignmentClasses[textAlign], className)}>
            {headline && (
                <Heading className={cn(
                    'font-display text-gray-900 text-balance',
                    headlineSizeClasses[headlineSize]
                )}>
                    {headline}
                </Heading>
            )}
            {subheading && (
                <p className={cn('text-base md:text-lg text-gray-600 mt-2 max-w-[34em]', textAlign === 'center' && 'md:mx-auto', textAlign === 'right' && 'md:ml-auto')}>
                    {subheading}
                </p>
            )}
        </div>
    )
}
