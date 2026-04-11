import { parseRichContent } from "../../utils/embeds";
import MarkdownRenderer from "./MarkdownRenderer";
import EmbedBlock from "./EmbedBlock";

interface RichContentRendererProps {
  content: string;
}

const RichContentRenderer = ({ content }: RichContentRendererProps) => {
  const blocks = parseRichContent(content);

  return (
    <div className="space-y-8">
      {blocks.map((block, index) =>
        block.type === "markdown" ? (
          <MarkdownRenderer key={`markdown-${index}`} content={block.content} />
        ) : (
          <EmbedBlock key={`embed-${index}`} embed={block.embed} />
        ),
      )}
    </div>
  );
};

export default RichContentRenderer;
