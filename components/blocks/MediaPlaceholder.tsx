import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Blocks with no media used to render nothing, so a section could vanish
 * without anyone noticing. Outside production they now keep their copy and
 * show this marked slot instead; production still hides the empty block.
 */
export const SHOW_PENDING_MEDIA = process.env.NODE_ENV !== 'production';

interface MediaPlaceholderProps {
    /** What the missing media should show, e.g. "Before and after comparison". */
    label?: string;
    className?: string;
}

export default function MediaPlaceholder({ label, className }: MediaPlaceholderProps) {
    return (
        <div
            role="note"
            className={cn(
                'flex min-h-[220px] w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-amber-700/40 bg-amber-50/60 px-6 py-10 text-center md:min-h-[320px]',
                className
            )}
        >
            <ImageIcon className="h-6 w-6 text-amber-800/70" aria-hidden="true" />
            <p className="text-sm font-semibold text-amber-900">
                Image to come{label ? `: ${label}` : ''}
            </p>
            <p className="max-w-sm text-xs text-amber-900/80">
                Preview only. This slot is hidden in production until media is added in Sanity.
            </p>
        </div>
    );
}
