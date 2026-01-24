/**
 * Functions to generate Sanity gallery block objects
 */

export interface ImageAsset {
  _type: 'reference'
  _ref: string
}

export interface MediaGridBlock {
  _type: 'mediaGrid'
  _key: string
  headline?: string
  images: ImageAsset[]
  columns: '1' | '2' | '3'
}

export interface CarouselBlock {
  _type: 'carousel'
  _key: string
  headline?: string
  images: ImageAsset[]
  layout: 'full' | 'contained'
}

/**
 * Creates a MediaGrid block for Sanity
 */
export function createMediaGridBlock(
  images: ImageAsset[],
  headline: string,
  columns: '1' | '2' | '3' = '2'
): MediaGridBlock {
  return {
    _type: 'mediaGrid',
    _key: `mediaGrid-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    headline: headline || undefined,
    images,
    columns,
  }
}

/**
 * Creates a Carousel block for Sanity
 */
export function createCarouselBlock(
  images: ImageAsset[],
  headline: string,
  layout: 'full' | 'contained' = 'full'
): CarouselBlock {
  return {
    _type: 'carousel',
    _key: `carousel-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    headline: headline || undefined,
    images,
    layout,
  }
}

/**
 * Converts uploaded asset documents to image asset references
 */
export function createImageAssetRef(assetId: string): ImageAsset {
  return {
    _type: 'reference',
    _ref: assetId,
  }
}
