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

export function ImagePreview(props: PreviewProps<ImagePreviewData>) {
  const { value, media, schemaType } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [filename, setFilename] = useState<string>('Image')

  useEffect(() => {
    if (value?.asset?._ref) {
      // Fetch the full asset document to see what fields are available
      client
        .fetch('*[_id == $id][0]', { id: value.asset._ref })
        .then((assetDoc: any) => {
          // Try multiple possible field names
          const originalFilename = assetDoc?.originalFilename || assetDoc?.filename || assetDoc?.name
          if (originalFilename) {
            setFilename(originalFilename)
          }
        })
        .catch(() => {
          // Fallback if fetch fails
          setFilename('Image')
        })
    }
  }, [value?.asset?._ref, client])

  const displayName = filename.replace(/\.[^/.]+$/, '')
  const title = value?.caption || value?.alt || displayName

  const subtitleParts = []
  if (value?.caption) subtitleParts.push(`Caption: ${value.caption}`)
  if (value?.alt && value.alt !== displayName) subtitleParts.push(`Alt: ${value.alt}`)
  if (!value?.caption && !value?.alt) subtitleParts.push(`Filename: ${filename}`)

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
