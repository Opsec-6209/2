export function Footer() {
  return (
    <footer className="mt-32 pb-12 px-6">
      <div className="section-ascii mb-8">═══════════════</div>

      <div className="max-w-2xl mx-auto text-center">
        <img
          src="/2/mebious_icon_02.gif"
          alt="opsec_6209"
          className="w-16 h-16 mx-auto gif-pixelated mb-4"
        />
        <div className="font-display text-lg text-fg mb-2">opsec_6209</div>
        <div className="font-mono text-xs text-mute mb-6">
          ⌈ 2013 — 2026 ⌋
        </div>

        <div className="flex justify-center gap-6 mb-6 font-mono text-sm">
          <a
            href="https://www.tiktok.com/@opsec_6209"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-pink"
          >
            [tiktok]
          </a>
          <a
            href="https://github.com/Opsec-6209"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-fg"
          >
            [github]
          </a>
          <a
            href="https://discord.com/users/868572830269329439"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-cyan"
          >
            [discord]
          </a>
        </div>

        <div className="font-mono text-[10px] text-mute">
          made in the wired · NRW, DE · Arch Linux btw
        </div>
      </div>
    </footer>
  );
}
