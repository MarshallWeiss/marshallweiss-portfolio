import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { PreviewProps } from 'sanity'

interface ImagePreviewData {
  asset?: {
    _ref?: string
  }
  alt?: string
  caption?: string
}

interface ImageMetadata {
  filename: string
  dimensions?: {
    width: number
    height: number
  }
  size?: number
}

export function ImagePreview(props: PreviewProps<ImagePreviewData>) {
  const { value, media, schemaType } = props as any
  const client = useClient({ apiVersion: '2024-01-01' })
  const [metadata, setMetadata] = useState<ImageMetadata>({ filename: 'Image' })

  useEffect(() => {
    if (value?.asset?._ref) {
      // Fetch the full asset document including metadata
      client
        .fetch('*[_id == $id][0]{originalFilename, filename, name, metadata, size}', { id: value.asset._ref })
        .then((assetDoc: any) => {
          const originalFilename = assetDoc?.originalFilename || assetDoc?.filename || assetDoc?.name
          setMetadata({
            filename: originalFilename || 'Image',
            dimensions: assetDoc?.metadata?.dimensions,
            size: assetDoc?.size,
          })
        })
        .catch(() => {
          setMetadata({ filename: 'Image' })
        })
    }
  }, [value?.asset?._ref, client])

  const displayName = metadata.filename.replace(/\.[^/.]+$/, '')
  const title = value?.caption || value?.alt || displayName

  const subtitleParts = []
  if (value?.caption) subtitleParts.push(`Caption: ${value.caption}`)
  if (value?.alt && value.alt !== displayName) subtitleParts.push(`Alt: ${value.alt}`)
  if (!value?.caption && !value?.alt) subtitleParts.push(`Filename: ${metadata.filename}`)

  // Add dimensions if available
  if (metadata.dimensions) {
    subtitleParts.push(`${metadata.dimensions.width} × ${metadata.dimensions.height}px`)
  }

  // Add file size if available
  if (metadata.size) {
    const sizeInKB = Math.round(metadata.size / 1024)
    const sizeInMB = (metadata.size / (1024 * 1024)).toFixed(2)
    const sizeDisplay = metadata.size > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`
    subtitleParts.push(sizeDisplay)
  }

  // Use Sanity UI components for proper styling
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
      {media && <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '4px', overflow: 'hidden' }}>{media}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500, marginBottom: '4px', fontSize: '14px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{subtitleParts.join(' • ')}</div>
      </div>
    </div>
  )
}
