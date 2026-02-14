import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Database IDs - these need to be set in .env.local
const DATABASES = {
  reading: process.env.NOTION_READING_DB_ID || '',
  workProjects: process.env.NOTION_WORK_PROJECTS_DB_ID || '',
  funProjects: process.env.NOTION_FUN_PROJECTS_DB_ID || '',
};

interface NotionPage {
  id: string;
  properties: any;
}

// Helper to extract text from Notion rich text
function getPlainText(richText: any[]): string {
  if (!richText || richText.length === 0) return '';
  return richText.map((text: any) => text.plain_text).join('');
}

// Helper to extract URL from Notion files
function getFileUrl(files: any[]): string {
  if (!files || files.length === 0) return '';
  const file = files[0];
  return file.type === 'external' ? file.external.url : file.file.url;
}

// Fetch currently reading book
export async function getCurrentlyReading() {
  if (!DATABASES.reading) return null;

  try {
    const response = await notion.databases.query({
      database_id: DATABASES.reading,
      filter: {
        property: 'Status',
        status: {
          equals: 'Reading',
        },
      },
      sorts: [
        {
          property: 'Started',
          direction: 'descending',
        },
      ],
      page_size: 1,
    });

    if (response.results.length === 0) return null;

    const page = response.results[0] as NotionPage;
    const props = page.properties;

    return {
      id: page.id,
      title: getPlainText(props.Title?.title || []),
      author: getPlainText(props.Author?.rich_text || []),
      description: getPlainText(props.Description?.rich_text || []),
      cover: getFileUrl(props.Cover?.files || []),
    };
  } catch (error) {
    console.error('Error fetching currently reading:', error);
    return null;
  }
}

// Fetch work projects
export async function getWorkProjects(limit: number = 3) {
  if (!DATABASES.workProjects) return [];

  try {
    const response = await notion.databases.query({
      database_id: DATABASES.workProjects,
      filter: {
        property: 'Status',
        status: {
          equals: 'In Progress',
        },
      },
      sorts: [
        {
          property: 'Priority',
          direction: 'ascending',
        },
      ],
      page_size: limit,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getPlainText(props.Title?.title || []),
        description: getPlainText(props.Description?.rich_text || []),
        company: getPlainText(props.Company?.rich_text || []),
        startDate: props['Start Date']?.date?.start || null,
      };
    });
  } catch (error) {
    console.error('Error fetching work projects:', error);
    return [];
  }
}

// Fetch fun projects
export async function getFunProjects(limit: number = 3) {
  if (!DATABASES.funProjects) return [];

  try {
    const response = await notion.databases.query({
      database_id: DATABASES.funProjects,
      filter: {
        property: 'Status',
        status: {
          equals: 'In Progress',
        },
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
      page_size: limit,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getPlainText(props.Title?.title || []),
        description: getPlainText(props.Description?.rich_text || []),
        tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        url: props.URL?.url || null,
      };
    });
  } catch (error) {
    console.error('Error fetching fun projects:', error);
    return [];
  }
}
