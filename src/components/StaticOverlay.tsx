interface StaticOverlayProps {
  active: boolean;
  color?: string;
}

export function StaticOverlay({ active, color = "#00ff88" }: StaticOverlayProps) {
  if (!active) return null;
  return (
    <div
      className="static-overlay active"
      style={{
        color: color,
      }}
    />
  );
}
