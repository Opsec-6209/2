interface GifDisplayProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-24 h-auto",
  md: "w-40 h-auto",
  lg: "w-64 h-auto",
  xl: "w-80 h-auto",
};

export function GifDisplay({ src, alt = "", size = "md", className = "" }: GifDisplayProps) {
  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div className="relative group">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`gif-pixelated ${sizeMap[size]} opacity-90 group-hover:opacity-100 transition-opacity`}
        />
        <div className="absolute inset-0 border border-lain/0 group-hover:border-lain/30 transition-colors pointer-events-none" />
      </div>
    </div>
  );
}
