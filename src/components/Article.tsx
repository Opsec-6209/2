import type { ContentBlock, Article as ArticleType } from "../data/articles";

interface ArticleProps {
  article: ArticleType;
}

export function Article({ article }: ArticleProps) {
  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={idx} style={{ margin: "8px 0" }}>
            {block.value}
          </p>
        );
      case "gif":
        return (
          <img
            key={idx}
            src={block.src}
            alt={block.alt || ""}
            className={block.className || ""}
            style={{
              maxWidth: "100%",
              height: "auto",
              imageRendering: "pixelated",
              margin: "16px auto",
              display: "block",
            }}
          />
        );
      case "heading":
        return (
          <h2 key={idx} style={{ fontSize: "20px", margin: "24px 0 8px", color: "var(--color-text)" }}>
            {block.value}
          </h2>
        );
      case "list":
        return (
          <div key={idx} style={{ margin: "8px 0" }}>
            {block.items.map((item, i) => (
              <div key={i} style={{ margin: "2px 0", display: "flex" }}>
                {block.prefix && (
                  <span style={{ color: "var(--color-accent)", marginRight: "8px", flexShrink: 0 }}>
                    {block.prefix}
                  </span>
                )}
                <span>{item}</span>
              </div>
            ))}
          </div>
        );
      case "link":
        return (
          <p key={idx} style={{ margin: "8px 0" }}>
            <a href={block.href} target="_blank" rel="noopener noreferrer">
              {block.text}
            </a>
          </p>
        );
      case "quote":
        return (
          <blockquote
            key={idx}
            style={{
              margin: "12px 0",
              paddingLeft: "16px",
              borderLeft: "2px solid var(--color-accent)",
              color: "var(--color-text-dim)",
              fontStyle: "italic",
            }}
          >
            {block.value}
            {block.source && <div style={{ marginTop: "4px", fontSize: "10px" }}>— {block.source}</div>}
          </blockquote>
        );
      case "br":
        return <br key={idx} />;
      case "ascii":
        return (
          <pre
            key={idx}
            style={{
              fontSize: "10px",
              lineHeight: 1.2,
              color: "var(--color-accent)",
              overflow: "auto",
              margin: "8px 0",
            }}
          >
            {block.value}
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="article"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "16px",
        borderTop: "1px solid var(--color-hr)",
      }}
    >
      <div className={`icon-${article.iconType.toLowerCase()}`} />
      <h1
        style={{
          fontSize: "24px",
          fontFamily: "var(--font-serif)",
          margin: "8px 0",
          color: "var(--color-text)",
        }}
      >
        {article.title}
      </h1>
      <h5 className="author" style={{ fontSize: "12px", color: "var(--color-text-dim)", margin: "4px 0" }}>
        {article.author}
      </h5>
      <h5 className="date" style={{ fontSize: "12px", color: "var(--color-text-dim)", margin: "4px 0" }}>
        {article.date}
      </h5>
      <br />
      <hr />
      <br />
      <br />
      {article.content.map((block, idx) => renderBlock(block, idx))}
      <br />
      <br />
    </div>
  );
}
