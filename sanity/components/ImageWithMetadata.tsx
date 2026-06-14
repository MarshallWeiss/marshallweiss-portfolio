import React, { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { Stack, Text, Card } from '@sanity/ui'

interface ImageMetadata {
  dimensions?: {
    width: number
    height: number
  }
  size?: number
}

export function ImageWithMetadata(props: any) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [metadata, setMetadata] = useState<ImageMetadata>({})
  const imageRef = props.value?.asset?._ref

  useEffect(() => {
    if (imageRef) {
      client
        .fetch('*[_id == $id][0]{metadata, size}', { id: imageRef })
        .then((assetDoc: any) => {
          setMetadata({
            dimensions: assetDoc?.metadata?.dimensions,
            size: assetDoc?.size,
          })
        })
        .catch(() => {
          setMetadata({})
        })
    } else {
      setMetadata({})
    }
  }, [imageRef, client])

  const formatFileSize = (bytes: number) => {
    const sizeInKB = Math.round(bytes / 1024)
    const sizeInMB = (bytes / (1024 * 1024)).toFixed(2)
    return bytes > 1024 * 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`
  }

  const metadataText = []
  if (metadata.dimensions) {
    metadataText.push(`${metadata.dimensions.width} × ${metadata.dimensions.height}px`)
  }
  if (metadata.size) {
    metadataText.push(formatFileSize(metadata.size))
  }

  return (
    <Stack space={2}>
      {props.renderDefault(props)}
      {metadataText.length > 0 && (
        <Card padding={2} radius={2} tone="transparent" border>
          <Text size={1} muted>
            📐 {metadataText.join(' • ')}
          </Text>
        </Card>
      )}
    </Stack>
  )
}
