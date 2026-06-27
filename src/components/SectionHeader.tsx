interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  date?: string;
  author?: string;
}

export function SectionHeader({
  id,
  title,
  subtitle,
  icon,
  date,
  author,
}: SectionHeaderProps) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="section-ascii mb-4">═══ ◆ ═══</div>
      {icon && (
        <div className="flex justify-center mb-3">
          <img
            src={icon}
            alt=""
            className="w-12 h-12 gif-pixelated opacity-90"
          />
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-fg text-center mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-sm text-dim text-center mb-2">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-3 font-mono text-xs text-mute mb-6">
        {author && <span className="text-cyan">— {author}</span>}
        {date && <span>// {date}</span>}
      </div>
    </div>
  );
}
