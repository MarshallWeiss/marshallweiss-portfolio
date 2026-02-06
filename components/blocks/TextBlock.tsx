import { cn } from '@/lib/utils'
import BlockHeading from './BlockHeading'
import BlockWrapper from './BlockWrapper'

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
    spacing?: 'none' | 'compact' | 'default' | 'spacious'
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

    const textSizeClasses = {
        small: 'text-base leading-relaxed',
        medium: 'text-lg leading-relaxed',
        large: 'text-xl leading-relaxed',
        xlarge: 'text-2xl md:text-3xl leading-relaxed',
    }

    return (
        <BlockWrapper width={width} background={background} spacing={spacing}>
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
