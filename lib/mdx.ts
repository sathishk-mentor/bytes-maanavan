import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ByteMetadata, Byte } from './types';

const contentDirectory = path.join(process.cwd(), 'content/bytes');

// Ensure content directory exists
function ensureContentDirectory() {
  if (!fs.existsSync(contentDirectory)) {
    return false;
  }
  return true;
}

// Recursively get all MDX files
function getAllMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  let mdxFiles: string[] = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      mdxFiles = mdxFiles.concat(getAllMdxFiles(filePath));
    } else if (file.endsWith('.mdx')) {
      mdxFiles.push(filePath);
    }
  });

  return mdxFiles;
}

export async function getAllBytes(): Promise<ByteMetadata[]> {
  if (!ensureContentDirectory()) {
    return [];
  }

  const mdxFiles = getAllMdxFiles(contentDirectory);

  const bytes = mdxFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title || '',
      slug: data.slug || '',
      summary: data.summary || '',
      category: data.category || '',
      tags: data.tags || [],
      level: data.level || 'beginner',
      duration: data.duration || '',
      updatedAt: data.updatedAt || new Date().toISOString(),
      order: data.order || 0,
      isPopular: data.isPopular || false,
    } as ByteMetadata;
  });

  // Sort by category order, then by byte order
  return bytes.sort((a, b) => {
    if (a.category === b.category) {
      return a.order - b.order;
    }
    return a.category.localeCompare(b.category);
  });
}

export async function getByteBySlug(slug: string): Promise<Byte | null> {
  if (!ensureContentDirectory()) {
    return null;
  }

  const mdxFiles = getAllMdxFiles(contentDirectory);

  for (const filePath of mdxFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    if (data.slug === slug) {
      return {
        title: data.title || '',
        slug: data.slug || '',
        summary: data.summary || '',
        category: data.category || '',
        tags: data.tags || [],
        level: data.level || 'beginner',
        duration: data.duration || '',
        updatedAt: data.updatedAt || new Date().toISOString(),
        order: data.order || 0,
        isPopular: data.isPopular || false,
        content,
      };
    }
  }

  return null;
}

export async function getBytesByCategory(category: string): Promise<ByteMetadata[]> {
  const allBytes = await getAllBytes();
  return allBytes
    .filter((byte) => byte.category === category)
    .sort((a, b) => a.order - b.order);
}

export async function getPopularBytes(): Promise<ByteMetadata[]> {
  const allBytes = await getAllBytes();
  return allBytes.filter((byte) => byte.isPopular).slice(0, 8);
}

export async function getAdjacentBytes(slug: string): Promise<{
  prev: ByteMetadata | null;
  next: ByteMetadata | null;
}> {
  const currentByte = await getByteBySlug(slug);

  if (!currentByte) {
    return { prev: null, next: null };
  }

  const categoryBytes = await getBytesByCategory(currentByte.category);
  const currentIndex = categoryBytes.findIndex((byte) => byte.slug === slug);

  return {
    prev: currentIndex > 0 ? categoryBytes[currentIndex - 1] : null,
    next: currentIndex < categoryBytes.length - 1 ? categoryBytes[currentIndex + 1] : null,
  };
}

export async function getRelatedBytes(slug: string, limit: number = 4): Promise<ByteMetadata[]> {
  const currentByte = await getByteBySlug(slug);

  if (!currentByte) {
    return [];
  }

  const categoryBytes = await getBytesByCategory(currentByte.category);
  return categoryBytes
    .filter((byte) => byte.slug !== slug)
    .slice(0, limit);
}

export async function getBytesCount(): Promise<number> {
  const allBytes = await getAllBytes();
  return allBytes.length;
}

export async function getCategoryBytesCount(category: string): Promise<number> {
  const bytes = await getBytesByCategory(category);
  return bytes.length;
}

export async function getBeginnerBytesCount(category: string): Promise<number> {
  const bytes = await getBytesByCategory(category);
  return bytes.filter((byte) => byte.level === 'beginner').length;
}
