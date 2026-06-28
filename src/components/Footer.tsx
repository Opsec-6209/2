export function Footer() {
  return (
    <footer className="mt-32 pb-32 px-6">
      <div className="section-ascii mb-8 text-violet">
        ═══════════════ ◈ ═══════════════
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <div className="relative inline-block mb-4">
          <img
            src="/2/mebious_icon_02.gif"
            alt="opsec_6209"
            className="w-16 h-16 gif-pixelated float-slow"
          />
          <div className="absolute inset-0 rounded-full bg-violet/20 blur-xl -z-10" />
        </div>
        <div className="font-display text-lg text-fg mb-1 glitch-rgb">
          opsec_6209
        </div>
        <div className="font-mono text-xs text-mute mb-6 tracking-widest">
          ⌈ 2013 — 2026 ⌋
        </div>

        <div className="flex justify-center gap-6 mb-6 font-mono text-sm">
          <a
            href="https://www.tiktok.com/@opsec_6209"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-pink transition-colors"
          >
            [tiktok]
          </a>
          <a
            href="https://github.com/Opsec-6209"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-fg transition-colors"
          >
            [github]
          </a>
          <a
            href="https://discord.com/users/868572830269329439"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-cyan transition-colors"
          >
            [discord]
          </a>
        </div>

        <pre className="font-code text-[10px] text-mute leading-relaxed mb-4 select-none">
{`    ╔════════════════════════════════════╗
    ║  made in the wired                ║
    ║  NRW, DE · arch linux btw        ║
    ║  noise level: stable              ║
    ╚════════════════════════════════════╝`}
        </pre>

        <div className="font-mono text-[10px] text-mute">
          ⌈ end of stream ⌉
        </div>
      </div>
    </footer>
  );
}
