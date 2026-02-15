import { cn } from '@/lib/utils'

interface DividerProps {
    style?: 'line' | 'dots' | 'space'
    width?: 'narrow' | 'medium' | 'wide' | 'full'
    spacing?: 'compact' | 'default' | 'spacious'
    color?: 'light' | 'medium' | 'dark'
}

export default function Divider({
    style = 'line',
    width = 'medium',
    spacing = 'default',
    color = 'light',
}: DividerProps) {
    const spacingClasses = {
        compact: 'py-4 md:py-6',
        default: 'py-8 md:py-12',
        spacious: 'py-12 md:py-20',
    }

    const widthClasses = {
        narrow: 'max-w-xs',
        medium: 'max-w-2xl',
        wide: 'max-w-5xl',
        full: 'w-full',
    }

    const colorClasses = {
        light: 'border-gray-200',
        medium: 'border-gray-300',
        dark: 'border-gray-400',
    }

    const dotColorClasses = {
        light: 'bg-gray-300',
        medium: 'bg-gray-400',
        dark: 'bg-gray-500',
    }

    return (
        <div className={cn('max-w-6xl mx-auto px-6', spacingClasses[spacing])}>
            <div className={cn('mx-auto', widthClasses[width])}>
                {style === 'line' && (
                    <hr className={cn('border-t', colorClasses[color])} />
                )}
                {style === 'dots' && (
                    <div className="flex items-center justify-center gap-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className={cn('w-1.5 h-1.5 rounded-full', dotColorClasses[color])} />
                        ))}
                    </div>
                )}
                {/* 'space' renders nothing — just the spacing wrapper */}
            </div>
        </div>
    )
}
