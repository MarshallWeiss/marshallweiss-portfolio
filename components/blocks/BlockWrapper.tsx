import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BlockWrapperProps {
    children: ReactNode
    width?: 'contained' | 'wide' | 'full'
    background?: 'none' | 'white' | 'gray'
    spacing?: 'none' | 'compact' | 'default' | 'spacious'
    className?: string
}

export default function BlockWrapper({
    children,
    width = 'contained',
    background = 'none',
    spacing = 'default',
    className,
}: BlockWrapperProps) {
    // Width classes
    const widthClasses = {
        contained: 'max-w-6xl mx-auto px-0 md:px-6',
        wide: 'max-w-7xl mx-auto px-0 md:px-6',
        full: 'w-full',
    }

    // Background classes
    const backgroundClasses = {
        none: '',
        white: 'bg-white',
        gray: 'bg-gray-50',
    }

    // Spacing classes
    const spacingClasses = {
        none: '',
        compact: 'py-8 md:py-12',
        default: 'py-12 md:py-24',
        spacious: 'py-16 md:py-32',
    }

    return (
        <section className={cn(
            spacingClasses[spacing],
            backgroundClasses[background],
            // Break out of parent padding for full-width backgrounds on mobile
            background !== 'none' && '-mx-6 md:mx-0',
            // Also break out on desktop for full-width blocks
            width === 'full' && background !== 'none' && 'md:-mx-12',
            className
        )}>
            <div className={cn(
                background === 'none' && width !== 'full' ? widthClasses[width] : '',
                background !== 'none' ? 'w-full' : ''
            )}>
                {background !== 'none' && width !== 'full' && (
                    <div className={cn(
                        width === 'contained' ? 'max-w-6xl' : 'max-w-7xl',
                        'mx-auto px-6'
                    )}>
                        {children}
                    </div>
                )}
                {(background === 'none' || width === 'full') && (
                    width === 'full' && background !== 'none' ? (
                        <div className="px-6 md:px-12 max-w-[1920px] mx-auto">
                            {children}
                        </div>
                    ) : children
                )}
            </div>
        </section>
    )
}
