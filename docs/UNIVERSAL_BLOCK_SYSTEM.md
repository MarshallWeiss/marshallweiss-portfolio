# Universal Block System

## Overview

Implemented a systematic approach to block architecture with shared capabilities across all blocks.

## Shared Field Definitions (`sanity/schemas/shared-fields.ts`)

### 1. Layout Fields
- **width**: `contained` | `wide` | `full`
- **background**: `none` | `white` | `gray`
- **spacing**: `compact` | `default` | `spacious`

### 2. Typography Fields
- **textAlign**: `left` | `center` | `right`

### 3. Heading Fields
- **headline**: Main heading text
- **subheading**: Optional subheading
- **headlineSize**: `small` | `medium` | `large`

### 4. Media Fields
- **aspectRatio**: `auto` | `square` | `4:3` | `16:9` | `3:4` | `9:16`
- **objectFit**: `cover` (fill, may crop) | `contain` (fit, no crop)
- **mediaType**: `image` | `video`

## Shared Components

### BlockWrapper (`components/blocks/BlockWrapper.tsx`)
Handles universal layout options for all blocks:
- Container width (contained/wide/full)
- Background colors
- Vertical spacing

### BlockHeading (`components/blocks/BlockHeading.tsx`)
Consistent heading rendering:
- Headlines with size control
- Optional subheadings
- Text alignment

### MediaItem (`components/blocks/MediaItem.tsx`)
Universal media rendering component:
- Supports both images and videos
- Aspect ratio control
- Object fit options

## Blocks Updated

### ✅ splitMedia
- Now supports: headline, subheading, headlineSize
- Media: image, multiple images, OR video
- Aspect ratio and object fit controls
- Width, background, spacing options
- Text alignment

### ✅ fullWidthMedia
- Added: subheading, headlineSize
- Aspect ratio and object fit controls
- Width, background, spacing options

### ✅ textBlock (NEW)
- Headline and subheading
- Text alignment (left/center/right)
- Max width options (narrow/medium/wide)
- Full layout controls

## Blocks To Update

### High Priority
- [ ] **mediaGrid** - Add aspect ratio, width/background options
- [ ] **carousel** - Add layout options, consistent heading
- [ ] **contentCards** - Add layout options
- [ ] **comparison** - Add layout options, aspect ratio
- [ ] **sideBySideImages** - Add aspect ratio, object fit

### Medium Priority
- [ ] **accordion** - Add layout options
- [ ] **hero** - Add layout options
- [ ] **backgroundVideo** - Add layout options
- [ ] **annotatedImage** - Add layout options

### Low Priority (Special Cases)
- [ ] **metadata** - Keep as-is (special layout)

## Benefits

1. **Consistency**: All blocks behave the same way
2. **Flexibility**: Authors can control layout without code changes
3. **Maintainability**: Shared logic in one place
4. **Scalability**: New blocks automatically get all features

## Usage Example

In Sanity Studio, every block now has:

**Content Section**
- Headline (with size control)
- Subheading
- Body content

**Media Section** (if applicable)
- Media type selector
- Aspect ratio selector
- Object fit option

**Layout Section**
- Container width
- Background color
- Vertical spacing

**Typography Section** (if applicable)
- Text alignment

## Next Steps

1. Update remaining blocks to use shared fields
2. Create migration guide for existing content
3. Document authoring patterns
4. Add more aspect ratio presets if needed
5. Consider adding horizontal padding options
