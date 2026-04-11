import { EmbedBlock, RichContentBlock } from "../types";

const embedPattern = /^:::(youtube|spotify|audio)\s+(\S+)\s*$/;

export function parseRichContent(content: string): RichContentBlock[] {
  const lines = content.split("\n");
  const blocks: RichContentBlock[] = [];
  const markdownBuffer: string[] = [];

  const flushMarkdown = () => {
    const markdown = markdownBuffer.join("\n").trim();
    if (markdown) {
      blocks.push({ type: "markdown", content: markdown });
    }
    markdownBuffer.length = 0;
  };

  for (const line of lines) {
    const match = line.trim().match(embedPattern);

    if (match) {
      flushMarkdown();
      const [, type, url] = match;
      blocks.push({
        type: "embed",
        embed: {
          type: type as EmbedBlock["type"],
          url,
        },
      });
      continue;
    }

    markdownBuffer.push(line);
  }

  flushMarkdown();

  return blocks;
}
