'use client';

import { useState } from 'react';
import { Stack, Button, TextInput, Card, Text } from '@sanity/ui';
import { set, unset } from 'sanity';
import { StringInputProps } from 'sanity';

export function WikipediaBookInput(props: StringInputProps) {
  const [wikiUrl, setWikiUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBookData = async () => {
    if (!wikiUrl) return;

    setLoading(true);
    setError('');

    try {
      // Extract page title from Wikipedia URL
      const urlMatch = wikiUrl.match(/wiki\/(.+?)(?:\?|#|$)/);
      if (!urlMatch) {
        throw new Error('Invalid Wikipedia URL');
      }

      const pageTitle = decodeURIComponent(urlMatch[1]);

      // Fetch Wikipedia data using their API
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        pageTitle
      )}&prop=extracts|pageimages|info&exintro=true&explaintext=true&piprop=original&inprop=url&format=json&origin=*`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];

      if (!page || page.missing) {
        throw new Error('Wikipedia page not found');
      }

      // Extract book info from the page
      const title = page.title;
      const description = page.extract || '';
      const coverUrl = page.original?.source || '';

      // Try to extract author from description (basic heuristic)
      const authorMatch = description.match(/(?:by|written by|author)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
      const author = authorMatch ? authorMatch[1] : '';

      // Populate the form fields via Sanity's patch system
      const parentPath = props.path.slice(0, -1); // Remove 'title' from path to get parent

      // Update title
      props.onChange(set(title));

      // Update other fields through the document
      if (author) {
        (props as any).context?.document?.patch?.([
          { set: { author } }
        ]);
      }

      if (description) {
        (props as any).context?.document?.patch?.([
          { set: { description: description.slice(0, 500) } }
        ]);
      }

      // Note: Cover image needs to be handled separately as it requires asset upload
      if (coverUrl) {
        console.log('Cover image URL:', coverUrl);
        // TODO: Implement image upload from URL
      }

      setWikiUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch book data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={3}>
      <Card padding={3} radius={2} shadow={1}>
        <Stack space={3}>
          <Text size={1} weight="semibold">Auto-populate from Wikipedia</Text>
          <TextInput
            placeholder="Paste Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Book_name)"
            value={wikiUrl}
            onChange={(e) => setWikiUrl(e.currentTarget.value)}
          />
          <Button
            text={loading ? 'Fetching...' : 'Auto-populate'}
            onClick={fetchBookData}
            disabled={!wikiUrl || loading}
            tone="primary"
          />
          {error && <Text size={1} style={{ color: 'red' }}>{error}</Text>}
        </Stack>
      </Card>

      {/* Original title input */}
      <TextInput {...props.elementProps} />
    </Stack>
  );
}
