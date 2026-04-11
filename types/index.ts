export type SectionKey = "self-definition" | "viewprint" | "artifacts";

export interface ContentEntry {
  slug: string;
  title: string;
  content: string;
  section: SectionKey;
  excerpt: string | null;
  date: string | null;
  order: number | null;
  tags: string[];
}

export type EmbedType = "youtube" | "spotify" | "audio";

export interface EmbedBlock {
  type: EmbedType;
  url: string;
}

export type RichContentBlock =
  | { type: "markdown"; content: string }
  | { type: "embed"; embed: EmbedBlock };
