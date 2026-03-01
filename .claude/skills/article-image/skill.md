# Article Image Generator

Generate thumbnail images for articles that don't have them yet.

## Usage

```
/article-image
```

## What This Skill Does

Scans `data/thoughts.json` for articles missing images and generates minimalist, concrete-style thumbnails.

## Process

1. **Read thoughts.json** - Find articles without `image` field
2. **Generate images** - Create minimalist thumbnails using one of these approaches:
   - **Option A (Recommended)**: Use Unsplash API with concrete/minimalist search terms based on article category
   - **Option B**: If image generation MCP is available, use it with prompts like:
     - "Abstract minimalist geometric shapes, concrete brutalist style, muted colors, simple composition"
     - "Minimalist design poster, concrete texture, simple shapes, neutral palette"
3. **Image style guidelines**:
   - Concrete/brutalist aesthetic
   - Muted color palette (grays, beiges, minimal accent colors)
   - Abstract geometric shapes or minimal photography
   - Professional, design-forward look
   - 400x400px minimum
4. **Update thoughts.json** - Add image URLs to articles
5. **Report** - Show which articles were updated

## Image URL Format

Use Unsplash URLs with specific parameters:
```
https://images.unsplash.com/photo-{ID}?w=400&h=400&fit=crop
```

## Categories → Image Themes

- **AI & Development**: Abstract tech, geometric patterns, circuits, minimal workspace
- **Design**: Concrete architecture, minimalist compositions, brutalist buildings
- **Product**: Clean product photography, simple objects, minimal staging
- **Default**: Abstract geometric shapes, concrete textures

## Example Unsplash Search Terms

- AI & Development: "minimalist technology", "abstract circuit", "geometric tech"
- Design: "brutalist architecture", "concrete building", "minimalist design"
- Product: "minimalist product", "simple object", "clean workspace"

## Output

Report which articles were updated with images and their new URLs.
