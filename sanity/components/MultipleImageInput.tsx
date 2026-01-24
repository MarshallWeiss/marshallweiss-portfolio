import React, { useCallback, useState } from 'react'
import { set, useClient, useFormValue } from 'sanity'
import { ArrayInputProps } from 'sanity'
import { Stack, Button, Card, Text, Box, Flex, Spinner } from '@sanity/ui'
import { detectImageGroups, ImageGroup, detectGroupsFromExistingImages, ExistingImageGroup } from '@/lib/gallery-grouping'
import { createMediaGridBlock, createCarouselBlock, createImageAssetRef } from '@/lib/gallery-generator'
import { GalleryCreationDialog, GalleryConfig } from './GalleryCreationDialog'

/**
 * Custom input component for uploading multiple images at once
 * Supports folder upload and automatic gallery creation
 */
export function MultipleImageInput(props: ArrayInputProps) {
  const { value = [], onChange } = props
  const [uploading, setUploading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [showGalleryDialog, setShowGalleryDialog] = useState(false)
  const [pendingGroups, setPendingGroups] = useState<ImageGroup[]>([])
  const [pendingExistingGroups, setPendingExistingGroups] = useState<ExistingImageGroup[]>([])
  const [pendingAssets, setPendingAssets] = useState<Map<string, string>>(new Map()) // file name -> asset ID
  const client = useClient({ apiVersion: '2024-01-01' })
  
  // Access parent document's modules array
  const modules = (useFormValue(['modules']) as any[]) || []

  const handleFileSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      setUploading(true)
      const fileArray = Array.from(files)
      const assetMap = new Map<string, string>() // file name -> asset ID
      const newItems: any[] = []

      try {
        // Upload each file using Sanity client
        for (const file of fileArray) {
          try {
            // Upload the asset
            const assetDocument = await client.assets.upload('image', file, {
              filename: file.name,
            })

            assetMap.set(file.name, assetDocument._id)

            // Create image object with asset reference
            // Generate unique key for array item (required by Sanity)
            const imageItem = {
              _type: 'image',
              _key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
              asset: {
                _type: 'reference',
                _ref: assetDocument._id,
              },
              // Auto-populate alt text from filename
              alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            }

            newItems.push(imageItem)
          } catch (error: any) {
            console.error('Error uploading file:', file.name, error)
          }
        }

        // Check for image groups (folder structure or naming convention)
        const groups = detectImageGroups(fileArray)

        if (groups.length > 0) {
          // Groups detected - show gallery creation dialog
          setPendingGroups(groups)
          setPendingAssets(assetMap)
          setShowGalleryDialog(true)
          // Don't add to images array yet - wait for gallery creation
        } else {
          // No groups detected - add images to images array as normal
          if (newItems.length > 0) {
            const currentValue = value || []
            onChange(set([...currentValue, ...newItems]))
          }
        }
      } finally {
        setUploading(false)
        // Reset input
        event.target.value = ''
      }
    },
    [value, onChange, client]
  )

  const handleFolderSelect = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files
      if (!files || files.length === 0) return

      setUploading(true)
      const fileArray = Array.from(files)
      const assetMap = new Map<string, string>()

      try {
        // Upload each file
        for (const file of fileArray) {
          try {
            const assetDocument = await client.assets.upload('image', file, {
              filename: file.name,
            })
            assetMap.set(file.name, assetDocument._id)
          } catch (error: any) {
            console.error('Error uploading file:', file.name, error)
          }
        }

        // Detect groups (should be by folder structure)
        const groups = detectImageGroups(fileArray)

        if (groups.length > 0) {
          setPendingGroups(groups)
          setPendingAssets(assetMap)
          setShowGalleryDialog(true)
        } else {
          // Fallback: add to images array
          const newItems = fileArray
            .filter((file) => assetMap.has(file.name))
            .map((file) => ({
              _type: 'image',
              _key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
              asset: {
                _type: 'reference',
                _ref: assetMap.get(file.name)!,
              },
              alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            }))

          if (newItems.length > 0) {
            const currentValue = value || []
            onChange(set([...currentValue, ...newItems]))
          }
        }
      } finally {
        setUploading(false)
        event.target.value = ''
      }
    },
    [value, onChange, client]
  )

  const handleScanExistingImages = useCallback(async () => {
    if (!value || value.length === 0) {
      alert('No images to scan. Please upload some images first.')
      return
    }

    setScanning(true)
    try {
      // Fetch originalFilename for each image's asset
      const imagesWithFilenames = await Promise.all(
        (value as any[]).map(async (img) => {
          if (!img.asset?._ref) return null
          try {
            const assetDoc = await client.fetch('*[_id == $id][0]', {
              id: img.asset._ref,
            })
            // Try multiple sources for filename
            const originalFilename =
              assetDoc?.originalFilename ||
              assetDoc?.filename ||
              img.alt ||
              img.caption ||
              ''
            return {
              ...img,
              originalFilename,
            }
          } catch (error) {
            console.error('Error fetching asset:', error)
            // Fallback to alt text or caption
            return {
              ...img,
              originalFilename: img.alt || img.caption || '',
            }
          }
        })
      )

      const validImages = imagesWithFilenames.filter((img): img is any => img !== null && img.originalFilename)
      const groups = detectGroupsFromExistingImages(validImages)

      if (groups.length > 0) {
        setPendingExistingGroups(groups)
        setShowGalleryDialog(true)
      } else {
        // Show message that no groups were found
        alert(
          'No gallery groups found.\n\n' +
            'Make sure images follow naming conventions like:\n' +
            '- "gallery-checkout-1.jpg", "gallery-checkout-2.jpg"\n' +
            '- "checkout-gallery-1.png", "checkout-gallery-2.png"\n\n' +
            'Images need to have at least 2 files with matching prefixes to form a gallery.'
        )
      }
    } catch (error) {
      console.error('Error scanning images:', error)
      alert('Error scanning images. Please try again.')
    } finally {
      setScanning(false)
    }
  }, [value, client])

  const handleCreateGalleries = useCallback(
    async (configs: GalleryConfig[]) => {
      // Try to access the form context to update modules
      // In Sanity, we need to access the parent form's onChange
      const formContext = (props as any).__internal?.form
      const parentForm = formContext?.parent
      
      if (!parentForm || !parentForm.onChange) {
        console.warn('Cannot access form context to update modules. Galleries will not be created automatically.')
        // Fallback: add images to images array instead (only for file-based configs)
        if (configs.some((c) => c.files)) {
          const newItems = configs
            .filter((c) => c.files)
            .flatMap((config) =>
              config.files!
                .map((file) => {
                  const assetId = pendingAssets.get(file.name)
                  if (!assetId) return null
                  return {
                    _type: 'image',
                    _key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
                    asset: { _type: 'reference', _ref: assetId },
                    alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
                  }
                })
                .filter((item): item is any => item !== null)
            )
          if (newItems.length > 0) {
            const currentValue = value || []
            onChange(set([...currentValue, ...newItems]))
          }
        }
        setShowGalleryDialog(false)
        setPendingGroups([])
        setPendingExistingGroups([])
        setPendingAssets(new Map())
        return
      }

      // Build new modules array with gallery blocks
      const newModules = [...modules]

      for (const config of configs) {
        let assetRefs: any[] = []

        // Handle file-based configs (new uploads)
        if (config.files) {
          assetRefs = config.files
            .map((file) => {
              const assetId = pendingAssets.get(file.name)
              return assetId ? createImageAssetRef(assetId) : null
            })
            .filter((ref): ref is any => ref !== null)
        }
        // Handle existing image configs
        else if (config.imageRefs) {
          assetRefs = config.imageRefs.map((img) => createImageAssetRef(img.asset._ref))
        }

        if (assetRefs.length === 0) continue

        // Create the appropriate block
        let block: any
        if (config.type === 'mediaGrid') {
          block = createMediaGridBlock(assetRefs, config.headline, config.columns || '2')
        } else {
          block = createCarouselBlock(assetRefs, config.headline, config.layout || 'full')
        }

        newModules.push(block)
      }

      // Update modules array using parent form's onChange
      try {
        parentForm.onChange(set(newModules))
      } catch (error) {
        console.error('Error updating modules:', error)
      }

      // Remove used images from images array
      const usedAssetIds = new Set<string>()

      // From file-based configs
      configs
        .filter((c) => c.files)
        .forEach((config) => {
          config.files!.forEach((file) => {
            const assetId = pendingAssets.get(file.name)
            if (assetId) usedAssetIds.add(assetId)
          })
        })

      // From existing image configs
      configs
        .filter((c) => c.imageRefs)
        .forEach((config) => {
          config.imageRefs!.forEach((img) => {
            if (img.asset._ref) usedAssetIds.add(img.asset._ref)
          })
        })

      const remainingImages = (value || []).filter((img: any) => {
        const assetRef = img.asset?._ref
        return !assetRef || !usedAssetIds.has(assetRef)
      })

      onChange(set(remainingImages))

      // Clean up
      setPendingGroups([])
      setPendingExistingGroups([])
      setPendingAssets(new Map())
      setShowGalleryDialog(false)
    },
    [modules, pendingAssets, value, onChange, props]
  )

  return (
    <>
      <Stack space={3}>
        <Card padding={3} tone="primary" radius={2}>
          <Flex align="center" gap={2}>
            {uploading || scanning ? (
              <Spinner />
            ) : (
              <Text size={2}>📤</Text>
            )}
            <Box flex={1}>
              <Text size={1} weight="medium">
                Upload Multiple Images
              </Text>
              <Text size={0} muted>
                {uploading
                  ? 'Uploading...'
                  : scanning
                  ? 'Scanning existing images...'
                  : 'Select files or folders to upload. Use naming like "gallery-name-1.jpg" to auto-create galleries.'}
              </Text>
            </Box>
            <Flex gap={2}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading || scanning}
                style={{ display: 'none' }}
                id="multiple-image-upload"
              />
              <Button
                as="label"
                htmlFor="multiple-image-upload"
                text={uploading ? 'Uploading...' : 'Select Files'}
                tone="primary"
                mode="ghost"
                disabled={uploading || scanning}
                style={{ cursor: uploading || scanning ? 'wait' : 'pointer' }}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                webkitdirectory=""
                directory=""
                onChange={handleFolderSelect}
                disabled={uploading || scanning}
                style={{ display: 'none' }}
                id="folder-upload"
              />
              <Button
                as="label"
                htmlFor="folder-upload"
                text={uploading ? 'Uploading...' : 'Upload Folder'}
                tone="primary"
                mode="ghost"
                disabled={uploading || scanning}
                style={{ cursor: uploading || scanning ? 'wait' : 'pointer' }}
              />
            </Flex>
          </Flex>
        </Card>

        {/* Scan existing images button */}
        {value && value.length > 0 && (
          <Card padding={3} tone="default" radius={2} border>
            <Flex align="center" gap={2}>
              <Text size={2}>🔍</Text>
              <Box flex={1}>
                <Text size={1} weight="medium">
                  Scan Existing Images
                </Text>
                <Text size={0} muted>
                  Detect galleries from already uploaded images using naming conventions
                </Text>
              </Box>
              <Button
                text={scanning ? 'Scanning...' : 'Scan for Galleries'}
                tone="default"
                mode="ghost"
                disabled={scanning || uploading}
                onClick={handleScanExistingImages}
                style={{ cursor: scanning || uploading ? 'wait' : 'pointer' }}
              />
            </Flex>
          </Card>
        )}

        {/* Render existing array items using default array input */}
        {props.renderDefault(props)}
      </Stack>

      {/* Gallery Creation Dialog */}
      {showGalleryDialog && (pendingGroups.length > 0 || pendingExistingGroups.length > 0) && (
        <GalleryCreationDialog
          groups={pendingGroups}
          existingGroups={pendingExistingGroups}
          onClose={() => {
            setShowGalleryDialog(false)
            setPendingGroups([])
            setPendingExistingGroups([])
            setPendingAssets(new Map())
          }}
          onCreate={handleCreateGalleries}
        />
      )}
    </>
  )
}
