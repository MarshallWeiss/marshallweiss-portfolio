import { cn } from '@/lib/utils'

interface BlockHeadingProps {
    headline?: string
    subheading?: string
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large'
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
        center: 'text-center',
        right: 'text-right',
    }

    return (
        <div className={cn('mb-8', alignmentClasses[textAlign], className)}>
            {headline && (
                <h2 className={cn(
                    'font-semibold text-gray-900',
                    headlineSizeClasses[headlineSize]
                )}>
                    {headline}
                </h2>
            )}
            {subheading && (
                <p className="text-lg text-gray-600 mt-2">
                    {subheading}
                </p>
            )}
        </div>
    )
}
