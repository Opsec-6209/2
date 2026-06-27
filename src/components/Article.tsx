import { Card } from "./Card";
import { SectionHeader } from "./SectionHeader";
import { GifDisplay } from "./GifDisplay";
import { articles } from "../data/articles";
import type { ContentBlock } from "../data/articles";

interface ArticleProps {
  article: typeof articles[number];
}

export function Article({ article }: ArticleProps) {
  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={idx} className="font-mono text-base text-text leading-relaxed my-3">
            {block.value}
          </p>
        );
      case "gif":
        return (
          <GifDisplay
            key={idx}
            src={block.src}
            alt={block.alt}
            size="md"
          />
        );
      case "heading":
        return (
          <h3
            key={idx}
            className="font-display text-xl text-lain mt-6 mb-3"
          >
            {block.value}
          </h3>
        );
      case "list":
        return (
          <div key={idx} className="my-3 space-y-1">
            {block.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 font-mono text-base text-text"
              >
                {block.prefix && (
                  <span className="text-lain select-none flex-shrink-0 w-4">
                    {block.prefix}
                  </span>
                )}
                <span className="flex-1">{item}</span>
              </div>
            ))}
          </div>
        );
      case "link":
        return (
          <p key={idx} className="my-3">
            <a
              href={block.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:text-lain underline underline-offset-4 decoration-cyan/30 hover:decoration-lain/60 transition-colors"
            >
              {block.text} →
            </a>
          </p>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            className="my-4 pl-4 border-l-2 border-lain/40 text-dim font-mono italic"
          >
            {block.value}
            {block.source && (
              <div className="text-xs text-mute mt-1 not-italic">
                — {block.source}
              </div>
            )}
          </blockquote>
        );
      case "ascii":
        return (
          <pre
            key={idx}
            className="font-code text-xs text-lain my-4 overflow-x-auto leading-tight"
          >
            {block.value}
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      id={article.id}
      accent={article.iconType === "B" ? "pink" : "lain"}
      className="max-w-2xl mx-auto my-12 scroll-mt-20"
    >
      <SectionHeader
        id={article.id}
        title={article.title}
        icon={article.iconType === "B" ? "/2/mebious_icon_02.gif" : undefined}
        author={article.author}
        date={article.date}
      />

      <div className="section-ascii">────────────────</div>

      <div className="mt-4">{article.content.map((block, idx) => renderBlock(block, idx))}</div>
    </Card>
  );
}
