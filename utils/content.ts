import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentEntry } from "../types";

const contentRoot = path.join(process.cwd(), "content");

function findMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return findMarkdownFiles(fullPath);
    }

    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function slugFromPath(filePath: string) {
  return path
    .relative(contentRoot, filePath)
    .replace(/\.md$/, "")
    .split(path.sep)
    .join("/");
}

function parseEntry(filePath: string): ContentEntry {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const slug = slugFromPath(filePath);

  return {
    slug,
    title: String(data.title || slug),
    content,
    excerpt: data.excerpt ? String(data.excerpt) : null,
    date: data.date ? String(data.date) : null,
    order: typeof data.order === "number" ? data.order : null,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

export function getAllEntries(): ContentEntry[] {
  return findMarkdownFiles(contentRoot).map(parseEntry).sort((a, b) => {
    if (a.order !== null || b.order !== null) {
      return (a.order ?? 9999) - (b.order ?? 9999);
    }

    const left = a.date ? new Date(a.date).getTime() : 0;
    const right = b.date ? new Date(b.date).getTime() : 0;
    return right - left;
  });
}

export function getEntryBySlug(slug: string) {
  const filePath = path.join(contentRoot, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseEntry(filePath);
}
