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
        contained: 'max-w-6xl mx-auto px-6',
        wide: 'max-w-7xl mx-auto px-6',
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
            className
        )}>
            <div className={cn(
                background === 'none' && width !== 'full' ? widthClasses[width] : '',
                background !== 'none' ? 'w-full' : ''
            )}>
                {background !== 'none' && width !== 'full' && (
                    <div className={widthClasses[width]}>
                        {children}
                    </div>
                )}
                {(background === 'none' || width === 'full') && children}
            </div>
        </section>
    )
}
