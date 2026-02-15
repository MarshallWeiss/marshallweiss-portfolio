import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Fetch currently reading book
export async function getCurrentlyReading() {
  const query = `*[_type == "currentlyReading" && status == "reading"] | order(startedAt desc) [0] {
    _id,
    title,
    author,
    description,
    cover,
    startedAt
  }`;

  const book = await client.fetch(query);

  if (!book) return null;

  return {
    id: book._id,
    title: book.title,
    author: book.author,
    description: book.description,
    cover: book.cover ? urlFor(book.cover).url() : null,
  };
}

// Fetch past books (finished reading)
export async function getPastBooks(limit: number = 6) {
  const query = `*[_type == "currentlyReading" && status == "finished"] | order(startedAt desc) [0...${limit}] {
    _id,
    title,
    author,
    cover,
    startedAt
  }`;

  const books = await client.fetch(query);

  return books.map((book: any) => ({
    id: book._id,
    title: book.title,
    author: book.author,
    cover: book.cover ? urlFor(book.cover).url() : null,
    startedAt: book.startedAt,
  }));
}

// Fetch work projects
export async function getWorkProjects(limit: number = 3) {
  const query = `*[_type == "workProject" && status == "in-progress"] | order(priority asc) [0...${limit}] {
    _id,
    title,
    description,
    company,
    startDate,
    confidential
  }`;

  const projects = await client.fetch(query);

  return projects.map((project: any) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    company: project.company,
    startDate: project.startDate,
    confidential: project.confidential ?? true,
  }));
}

// Fetch doing items
export async function getDoingItems(limit: number = 5) {
  const query = `*[_type == "doingItem" && status == "active"] | order(priority asc) [0...${limit}] {
    _id,
    title,
    description
  }`;

  const items = await client.fetch(query);

  return items.map((item: any) => ({
    id: item._id,
    title: item.title,
    description: item.description,
  }));
}

// Fetch curated articles
export async function getCuratedArticles() {
  const query = `*[_type == "curatedArticle"] | order(addedAt desc) {
    _id,
    title,
    url,
    source,
    description,
    category,
    addedAt
  }`;

  const articles = await client.fetch(query);

  return articles.map((article: any) => ({
    id: article._id,
    title: article.title,
    url: article.url,
    source: article.source,
    description: article.description,
    category: article.category,
    addedAt: article.addedAt,
  }));
}

// Fetch fun projects
export async function getFunProjects(limit: number = 3) {
  const query = `*[_type == "funProject" && status == "in-progress"] | order(updatedAt desc) [0...${limit}] {
    _id,
    title,
    description,
    tags,
    url,
    image
  }`;

  const projects = await client.fetch(query);

  return projects.map((project: any) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    tags: project.tags || [],
    url: project.url,
    image: project.image ? urlFor(project.image).url() : null,
  }));
}
