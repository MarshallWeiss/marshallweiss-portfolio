import React, { useState } from 'react'
import {
  Dialog,
  Box,
  Stack,
  Text,
  Button,
  Card,
  Flex,
  TextInput,
} from '@sanity/ui'
import { ImageGroup, ExistingImageGroup } from '@/lib/gallery-grouping'

export interface GalleryConfig {
  groupName: string
  headline: string
  type: 'mediaGrid' | 'carousel'
  columns?: '1' | '2' | '3'
  layout?: 'full' | 'contained'
  files?: File[]
  imageRefs?: Array<{ _key?: string; asset: { _ref: string } }>
}

interface GalleryCreationDialogProps {
  groups?: ImageGroup[]
  existingGroups?: ExistingImageGroup[]
  onClose: () => void
  onCreate: (configs: GalleryConfig[]) => void
}

export function GalleryCreationDialog({
  groups = [],
  existingGroups = [],
  onClose,
  onCreate,
}: GalleryCreationDialogProps) {
  const [configs, setConfigs] = useState<GalleryConfig[]>(() => {
    // Handle file-based groups
    const fileConfigs = groups.map((group) => ({
      groupName: group.name,
      headline: group.name.charAt(0).toUpperCase() + group.name.slice(1).replace(/[-_]/g, ' '),
      type: (group.files.length >= 5 ? 'carousel' : 'mediaGrid') as 'mediaGrid' | 'carousel',
      columns: '2' as const,
      layout: 'full' as const,
      files: group.files,
    }))

    // Handle existing image groups
    const existingConfigs = existingGroups.map((group) => ({
      groupName: group.name,
      headline: group.name.charAt(0).toUpperCase() + group.name.slice(1).replace(/[-_]/g, ' '),
      type: (group.images.length >= 5 ? 'carousel' : 'mediaGrid') as 'mediaGrid' | 'carousel',
      columns: '2' as const,
      layout: 'full' as const,
      imageRefs: group.images.map((img) => ({
        _key: img._key,
        asset: img.asset,
      })),
    }))

    return [...fileConfigs, ...existingConfigs]
  })

  const updateConfig = (index: number, updates: Partial<GalleryConfig>) => {
    const newConfigs = [...configs]
    newConfigs[index] = { ...newConfigs[index], ...updates }
    setConfigs(newConfigs)
  }

  const handleCreate = () => {
    onCreate(configs)
    onClose()
  }

  return (
    <Dialog
      header="Create Galleries"
      id="gallery-creation-dialog"
      onClose={onClose}
      width={2}
      zOffset={1000}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={1} muted>
            Configure your galleries. Each group of images will become a gallery block.
          </Text>

          {configs.map((config, index) => (
            <Card key={index} padding={3} tone="default" radius={2} border>
              <Stack space={3}>
                <Flex align="center" gap={2}>
                  <Text size={1} weight="semibold">
                    Gallery {index + 1}
                  </Text>
                  <Text size={0} muted>
                    ({config.files.length} images)
                  </Text>
                </Flex>

                <TextInput
                  label="Headline"
                  value={config.headline}
                  onChange={(e) =>
                    updateConfig(index, { headline: e.currentTarget.value })
                  }
                  placeholder="Enter gallery headline"
                />

                <Box>
                  <Text size={1} weight="medium" style={{ marginBottom: '8px' }}>
                    Gallery Type
                  </Text>
                  <Flex gap={3}>
                    <Card
                      padding={2}
                      radius={2}
                      style={{
                        cursor: 'pointer',
                        border: config.type === 'mediaGrid' ? '2px solid #2276fc' : '1px solid #e5e7eb',
                        backgroundColor: config.type === 'mediaGrid' ? '#f0f7ff' : 'transparent',
                      }}
                      onClick={() => updateConfig(index, { type: 'mediaGrid' })}
                    >
                      <Text size={1}>Media Grid</Text>
                    </Card>
                    <Card
                      padding={2}
                      radius={2}
                      style={{
                        cursor: 'pointer',
                        border: config.type === 'carousel' ? '2px solid #2276fc' : '1px solid #e5e7eb',
                        backgroundColor: config.type === 'carousel' ? '#f0f7ff' : 'transparent',
                      }}
                      onClick={() => updateConfig(index, { type: 'carousel' })}
                    >
                      <Text size={1}>Carousel</Text>
                    </Card>
                  </Flex>
                </Box>

                {config.type === 'mediaGrid' && (
                  <Box>
                    <Text size={1} weight="medium" style={{ marginBottom: '8px' }}>
                      Columns
                    </Text>
                    <Flex gap={2}>
                      {(['1', '2', '3'] as const).map((cols) => (
                        <Card
                          key={cols}
                          padding={2}
                          radius={2}
                          style={{
                            cursor: 'pointer',
                            border: config.columns === cols ? '2px solid #2276fc' : '1px solid #e5e7eb',
                            backgroundColor: config.columns === cols ? '#f0f7ff' : 'transparent',
                          }}
                          onClick={() => updateConfig(index, { columns: cols })}
                        >
                          <Text size={1}>{cols}</Text>
                        </Card>
                      ))}
                    </Flex>
                  </Box>
                )}

                {config.type === 'carousel' && (
                  <Box>
                    <Text size={1} weight="medium" style={{ marginBottom: '8px' }}>
                      Layout
                    </Text>
                    <Flex gap={2}>
                      {(['full', 'contained'] as const).map((layout) => (
                        <Card
                          key={layout}
                          padding={2}
                          radius={2}
                          style={{
                            cursor: 'pointer',
                            border: config.layout === layout ? '2px solid #2276fc' : '1px solid #e5e7eb',
                            backgroundColor: config.layout === layout ? '#f0f7ff' : 'transparent',
                          }}
                          onClick={() => updateConfig(index, { layout })}
                        >
                          <Text size={1}>
                            {layout === 'full' ? 'Full Width' : 'Contained'}
                          </Text>
                        </Card>
                      ))}
                    </Flex>
                  </Box>
                )}

                <Box padding={2} style={{ backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                  <Text size={0} muted>
                    {config.files
                      ? `Files: ${config.files.map((f) => f.name).join(', ')}`
                      : `Images: ${config.imageRefs?.length || 0} image(s)`}
                  </Text>
                </Box>
              </Stack>
            </Card>
          ))}

          <Flex gap={2} justify="flex-end" style={{ marginTop: '16px' }}>
            <Button text="Cancel" mode="ghost" onClick={onClose} />
            <Button text="Create Galleries" tone="primary" onClick={handleCreate} />
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  )
}
