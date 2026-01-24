/**
 * Utilities for grouping images by folder structure or filename prefixes
 */

export interface ImageGroup {
  name: string
  files: File[]
  source: 'folder' | 'naming'
}

export interface ExistingImageGroup {
  name: string
  images: Array<{
    _key: string
    asset: { _ref: string }
    alt?: string
    caption?: string
    originalFilename?: string
  }>
  source: 'naming'
}

export interface NamingPattern {
  prefix: string
  number: number
  galleryName: string
}

/**
 * Groups files by their folder path
 * Files in the same folder are grouped together
 */
export function groupByFolder(files: File[]): Map<string, File[]> {
  const groups = new Map<string, File[]>()
  
  for (const file of files) {
    // Extract folder path from file's webkitRelativePath
    // Format: "folder-name/image.jpg" or "parent/child/image.jpg"
    const relativePath = (file as any).webkitRelativePath || ''
    const folderPath = relativePath.split('/').slice(0, -1).join('/')
    
    // Use folder path as key, or "root" if no folder
    const key = folderPath || 'root'
    
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(file)
  }
  
  return groups
}

/**
 * Detects naming convention patterns in filename
 * Supports: gallery-{name}-{number}.ext or {name}-gallery-{number}.ext
 */
export function detectNamingConvention(filename: string): NamingPattern | null {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
  
  // Pattern 1: gallery-{name}-{number}
  const pattern1 = /^gallery-([^-]+)-(\d+)$/i
  const match1 = nameWithoutExt.match(pattern1)
  if (match1) {
    return {
      prefix: `gallery-${match1[1]}-`,
      number: parseInt(match1[2], 10),
      galleryName: match1[1],
    }
  }
  
  // Pattern 2: {name}-gallery-{number}
  const pattern2 = /^([^-]+)-gallery-(\d+)$/i
  const match2 = nameWithoutExt.match(pattern2)
  if (match2) {
    return {
      prefix: `${match2[1]}-gallery-`,
      number: parseInt(match2[2], 10),
      galleryName: match2[1],
    }
  }
  
  return null
}

/**
 * Groups files by detected naming convention prefixes
 */
export function groupByPrefix(files: File[]): Map<string, File[]> {
  const groups = new Map<string, File[]>()
  
  for (const file of files) {
    const pattern = detectNamingConvention(file.name)
    
    if (pattern) {
      const key = pattern.prefix
      
      if (!groups.has(key)) {
        groups.set(key, [])
      }
      groups.get(key)!.push(file)
    }
  }
  
  // Sort files within each group by number
  for (const [key, fileList] of groups.entries()) {
    fileList.sort((a, b) => {
      const patternA = detectNamingConvention(a.name)
      const patternB = detectNamingConvention(b.name)
      if (!patternA || !patternB) return 0
      return patternA.number - patternB.number
    })
  }
  
  return groups
}

/**
 * Detects and groups images from uploaded files
 * Returns groups detected by folder structure or naming convention
 */
export function detectImageGroups(files: File[]): ImageGroup[] {
  const groups: ImageGroup[] = []
  
  // Check if files have folder structure (webkitRelativePath)
  const hasFolderStructure = files.some(
    (file) => (file as any).webkitRelativePath && (file as any).webkitRelativePath.includes('/')
  )
  
  if (hasFolderStructure) {
    // Group by folder
    const folderGroups = groupByFolder(files)
    
    for (const [folderPath, fileList] of folderGroups.entries()) {
      if (fileList.length > 0) {
        // Extract folder name from path (use last folder name)
        const folderName = folderPath === 'root' 
          ? 'gallery' 
          : folderPath.split('/').pop() || 'gallery'
        
        groups.push({
          name: folderName,
          files: fileList,
          source: 'folder',
        })
      }
    }
  } else {
    // Group by naming convention
    const prefixGroups = groupByPrefix(files)
    
    for (const [prefix, fileList] of prefixGroups.entries()) {
      if (fileList.length > 0) {
        // Get gallery name from first file's pattern
        const pattern = detectNamingConvention(fileList[0].name)
        const galleryName = pattern?.galleryName || prefix.replace(/[-_]/g, ' ')
        
        groups.push({
          name: galleryName,
          files: fileList,
          source: 'naming',
        })
      }
    }
  }
  
  // If no groups detected, return empty array
  // (files will be added to images array as normal)
  return groups
}

/**
 * Detects groups from existing Sanity image objects by checking their originalFilename
 * Groups images that match naming convention patterns
 */
export function detectGroupsFromExistingImages(
  images: Array<{
    _key?: string
    asset?: { _ref?: string }
    alt?: string
    caption?: string
    originalFilename?: string
  }>
): ExistingImageGroup[] {
  const groups: ExistingImageGroup[] = []
  const prefixMap = new Map<string, Array<typeof images[0]>>()

  // Group images by naming convention prefix
  for (const image of images) {
    const filename = image.originalFilename || image.alt || ''
    if (!filename) continue

    const pattern = detectNamingConvention(filename)
    if (pattern) {
      const key = pattern.prefix
      if (!prefixMap.has(key)) {
        prefixMap.set(key, [])
      }
      prefixMap.get(key)!.push(image)
    }
  }

  // Sort images within each group by number
  for (const [prefix, imageList] of prefixMap.entries()) {
    if (imageList.length < 2) continue // Need at least 2 images for a gallery

    // Sort by number in filename
    imageList.sort((a, b) => {
      const filenameA = a.originalFilename || a.alt || ''
      const filenameB = b.originalFilename || b.alt || ''
      const patternA = detectNamingConvention(filenameA)
      const patternB = detectNamingConvention(filenameB)
      if (!patternA || !patternB) return 0
      return patternA.number - patternB.number
    })

    // Get gallery name from first image's pattern
    const firstFilename = imageList[0].originalFilename || imageList[0].alt || ''
    const pattern = detectNamingConvention(firstFilename)
    const galleryName = pattern?.galleryName || prefix.replace(/[-_]/g, ' ')

    groups.push({
      name: galleryName,
      images: imageList as any,
      source: 'naming',
    })
  }

  return groups
}
