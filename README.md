# Portfolio

A modern, minimalist portfolio website built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding Content

To add new items to any section, edit the corresponding JSON file in the `data/` directory:

- `data/case-studies.json` - Case studies
- `data/thoughts.json` - Thoughts/blog posts
- `data/book-club.json` - Book club entries
- `data/experiments.json` - Experiments
- `data/tutorials.json` - Tutorials

Each JSON file follows this structure:

```json
{
  "items": [
    {
      "id": "unique-id",
      "title": "Item Title",
      "description": "Brief description",
      "date": "2024-01-15",
      "slug": "item-slug"
    }
  ]
}
```

## Project Structure

- `app/` - Next.js app router pages
- `components/` - Reusable React components
- `data/` - JSON data files for content
- `styles/` - Global styles and Tailwind CSS
