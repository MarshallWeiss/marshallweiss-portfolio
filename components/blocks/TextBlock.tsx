import { cn } from '@/lib/utils'
import BlockHeading from './BlockHeading'
import BlockWrapper from './BlockWrapper'

type SpacingValue = 'none' | 'compact' | 'default' | 'spacious'

interface TextBlockProps {
    headline?: string
    subheading?: string
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large'
    text: string
    textSize?: 'small' | 'medium' | 'large' | 'xlarge'
    alignment?: 'left' | 'center' | 'right'
    maxWidth?: 'narrow' | 'medium' | 'wide'
    width?: 'contained' | 'wide' | 'full'
    background?: 'none' | 'white' | 'gray'
    spacing?: SpacingValue
    paddingTop?: SpacingValue
    paddingBottom?: SpacingValue
}

export default function TextBlock({
    headline,
    subheading,
    headlineSize = 'medium',
    text,
    textSize = 'medium',
    alignment = 'center',
    maxWidth = 'medium',
    width = 'contained',
    background = 'none',
    spacing = 'default',
    paddingTop,
    paddingBottom,
}: TextBlockProps) {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-left md:text-center',
        right: 'text-left md:text-right',
    }

    const maxWidthClasses = {
        narrow: 'max-w-prose',  // ~65ch
        medium: 'max-w-3xl',     // ~48rem
        wide: 'max-w-5xl',       // ~64rem
    }

    const textSizeClasses = {
        small: 'text-base leading-relaxed',
        medium: 'text-lg leading-relaxed',
        large: 'text-xl leading-relaxed',
        xlarge: 'text-2xl md:text-3xl leading-relaxed',
    }

    const hasIndependentPadding = paddingTop || paddingBottom

    const paddingClasses: Record<SpacingValue, { top: string; bottom: string }> = {
        none: { top: '', bottom: '' },
        compact: { top: 'pt-8 md:pt-12', bottom: 'pb-8 md:pb-12' },
        default: { top: 'pt-12 md:pt-24', bottom: 'pb-12 md:pb-24' },
        spacious: { top: 'pt-16 md:pt-32', bottom: 'pb-16 md:pb-32' },
    }

    return (
        <BlockWrapper
            width={width}
            background={background}
            spacing={hasIndependentPadding ? 'none' : spacing}
            className={hasIndependentPadding ? cn(
                paddingClasses[paddingTop || spacing].top,
                paddingClasses[paddingBottom || spacing].bottom,
            ) : undefined}
        >
            <div className={cn(
                'mx-auto',
                maxWidthClasses[maxWidth],
                alignmentClasses[alignment]
            )}>
                <BlockHeading
                    headline={headline}
                    subheading={subheading}
                    headlineSize={headlineSize}
                    textAlign={alignment}
                />
                <div className={cn("text-gray-600 whitespace-pre-wrap", textSizeClasses[textSize])}>
                    {text}
                </div>
            </div>
        </BlockWrapper>
    )
}
