export function Footer() {
  return (
    <div
      id="footer"
      style={{
        textAlign: "center",
        marginTop: "32px",
        padding: "16px",
        borderTop: "1px solid var(--color-hr)",
      }}
    >
      <a href="https://github.com/Opsec-6209" target="_blank" rel="noopener noreferrer">
        <img
          src="/2/fauux-btn-01.gif"
          alt="button"
          style={{
            width: "88px",
            height: "31px",
            imageRendering: "pixelated",
            marginBottom: "16px",
          }}
        />
      </a>
      <br />
      <br />
      <span style={{ fontSize: "11px" }}>
        <a href="mailto:opsec_6209@protonmail.com">opsec_6209</a>
        <i> © 2013-2026</i>
      </span>
    </div>
  );
}
