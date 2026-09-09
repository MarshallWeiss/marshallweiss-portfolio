# Article Image Generator

Generate the illustration set for one or all articles in `data/thoughts.json`.

## Usage

```
/article-image            # every article
/article-image <slug>     # one article
```

## What this skill does

Runs the seeded illustration script in `scripts/article-images.mjs`. Each article gets a "page schematic" in the site palette: a modular block grid, a few tinted blocks, one or two ink lead blocks, hairline type, paper grain, cropped at the edges. The slug is the seed, so the same article always renders the same composition and the whole set reads as one system.

Outputs, per article:

- `public/images/thoughts/<slug>.png` at 800x800, used for list cards and the home preview
- `public/images/thoughts/<slug>-og.png` at 1200x630, used as the Open Graph image

The script also writes the thumbnail path back into `data/thoughts.json` under `image`.

## Process

1. Run the script:

   ```bash
   npm run images:articles            # all, skips files that already exist
   npm run images:articles -- <slug>  # one article
   FORCE=1 npm run images:articles    # regenerate everything
   ```

2. Open the generated PNGs and check them. If a composition is weak, there is no per-image tweaking: change the slug seed offset or the palette rules in the script, then regenerate with `FORCE=1`.
3. Report which files were written.

## Accent color

The tint comes from the article's `category`. To override, add `"accent": "green" | "tan" | "lavender" | "ochre"` to the article entry in `thoughts.json` and regenerate that slug with `FORCE=1`.

## Do not

- Do not fall back to Unsplash or any stock photography. Consistency is the point.
- Do not hand-edit the PNGs. Change the script and regenerate.
