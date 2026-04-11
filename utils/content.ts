import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentEntry, SectionKey } from "../types";
import { sectionConfig } from "./sections";

const contentRoot = path.join(process.cwd(), "content");

function getSectionDirectory(section: SectionKey) {
  return path.join(contentRoot, sectionConfig[section].directory);
}

function parseEntry(section: SectionKey, slug: string): ContentEntry {
  const fullPath = path.join(getSectionDirectory(section), `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title || slug),
    content,
    section,
    excerpt: data.excerpt ? String(data.excerpt) : null,
    date: data.date ? String(data.date) : null,
    order: typeof data.order === "number" ? data.order : null,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

export function getAllEntries(section: SectionKey): ContentEntry[] {
  const sectionDirectory = getSectionDirectory(section);
  if (!fs.existsSync(sectionDirectory)) {
    return [];
  }

  const entries = fs
    .readdirSync(sectionDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
    .map((slug) => parseEntry(section, slug));

  if (sectionConfig[section].sort === "order") {
    return entries.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
  }

  return entries.sort((a, b) => {
    const left = a.date ? new Date(a.date).getTime() : 0;
    const right = b.date ? new Date(b.date).getTime() : 0;
    return right - left;
  });
}

export function getEntryBySlug(section: SectionKey, slug: string) {
  return parseEntry(section, slug);
}

export function getAllSlugs(section: SectionKey) {
  return getAllEntries(section).map((entry) => entry.slug);
}

export function getHomeSections() {
  return (Object.keys(sectionConfig) as SectionKey[]).map((section) => ({
    key: section,
    ...sectionConfig[section],
    entries: getAllEntries(section),
  }));
}
