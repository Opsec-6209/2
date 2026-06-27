export interface Article {
  id: string;
  iconType: "A" | "B";
  title: string;
  titleTranslations?: Record<string, string>;
  author: string;
  date: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: "text"; value: string; lang?: "ja" | "en" | "de" }
  | { type: "gif"; src: string; alt?: string; className?: string }
  | { type: "heading"; value: string; level: 1 | 2 | 3 }
  | { type: "list"; items: string[]; prefix?: string }
  | { type: "link"; href: string; text: string }
  | { type: "quote"; value: string; source?: string }
  | { type: "br"; count?: number }
  | { type: "now-wired" }
  | { type: "ascii"; value: string }
  | { type: "code"; value: string };

export const articles: Article[] = [
  {
    id: "about",
    iconType: "A",
    title: "About opsec_6209",
    titleTranslations: { ja: "opsec_6209について" },
    author: "-opsec_6209",
    date: "06.28.26",
    content: [
      { type: "text", value: "Developer based in NRW, Germany. I make things on the web, listen to nightcore, and explore the Wired." },
      { type: "br" },
      { type: "text", value: "NRW, Germany 出身の開発者。Web 上で何かを作り、ナイトコアを聴き、Wired を探索しています。" },
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/Lainpt3.gif", alt: "Lain" },
      { type: "br" },
      { type: "br" },
      { type: "text", value: "I code music players, dev tools, and small experiments. Always shipping something." },
      { type: "br" },
      { type: "text", value: "Fav OS: Arch Linux · Fav Editor: VS Code · Fav Anime: Serial Experiments Lain" },
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/FloatingScreen.gif", alt: "floating" },
    ],
  },
  {
    id: "tech",
    iconType: "A",
    title: "Tech Stack",
    titleTranslations: { ja: "技術スタック" },
    author: "-opsec_6209",
    date: "06.28.26",
    content: [
      { type: "list", prefix: ">", items: [
        "Languages: TypeScript, JavaScript, Python, HTML5, CSS3",
        "Frameworks: React, Vite, Electron, Tailwind CSS",
        "Tools: Git, GitHub, VS Code, Node.js, npm, Arch Linux",
        "Libraries: Monaco Editor, Recharts, Lucide React, Lenis",
        "Other: HTML5 Canvas, Web Audio API, Selenium, CustomTkinter",
      ]},
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/27.gif", alt: "noise" },
    ],
  },
  {
    id: "projects",
    iconType: "A",
    title: "Projects",
    titleTranslations: { ja: "プロジェクト" },
    author: "-opsec_6209",
    date: "06.28.26",
    content: [
      { type: "list", prefix: ">", items: [
        "opsec-playground - Code playground with live preview",
        "opsec_6209-studio - VS Code-like editor with Monaco",
        "tts-reader - Text-to-speech reader",
        "cybervault - Password generator & vault",
        "weather-dashboard - Weather UI with glassmorphism",
        "box-shadow-generator - CSS box-shadow tool",
        "github-profile-analyzer - GitHub profile explorer",
        "travel-tracker - Interactive world map",
        "crypto-live-dashboard - Real-time crypto prices",
        "cineverse - Movie database search",
        "pixel-art-editor - 16x16 pixel art editor",
        "recipe-generator - AI recipe generator",
        "Kahoot-Bot - Kahoot game bot",
      ]},
      { type: "br" },
      { type: "link", href: "https://github.com/Opsec-6209", text: "→ See all on GitHub" },
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/psx-game.gif", alt: "PSX game" },
    ],
  },
  {
    id: "social",
    iconType: "A",
    title: "Social",
    author: "-opsec_6209",
    date: "06.28.26",
    content: [
      { type: "list", prefix: ">", items: [
        "TikTok  →  @opsec_6209",
        "Discord  →  opsec_6209#0000",
        "GitHub  →  Opsec-6209",
      ]},
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/Cyberia_Red.gif", alt: "Cyberia" },
    ],
  },
  {
    id: "crypto",
    iconType: "A",
    title: "Crypto Addresses",
    author: "-opsec_6209",
    date: "06.28.26",
    content: [
      { type: "text", value: "[click to copy]" },
      { type: "br" },
      { type: "br" },
      { type: "list", prefix: ">", items: [
        "BTC  →  bc1q9h6tq8j5g7z3r2v4x6y8n1m3p5q7s9u2w4e6t8",
        "ETH  →  0x8f3C2A1B9D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9",
        "SOL  →  5xK9mN2pQ7rT4vW8yB1cE3fH6jL0nP5qS8uV2wX4yZ7aD9eF1gH3iJ6kM0pR2sU5vY8z",
      ]},
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/video.gif", alt: "video" },
    ],
  },
  {
    id: "now-wired",
    iconType: "A",
    title: "Now Wired: 26 Tracks",
    author: "-opsec_6209",
    date: "real-time",
    content: [{ type: "now-wired" }],
  },
  {
    id: "manifesto",
    iconType: "B",
    title: "300万回の閲覧",
    titleTranslations: { en: "3 million views" },
    author: "-opsec_6209",
    date: "23.06.26",
    content: [
      { type: "text", value: "このサイトはあまり更新されていません、それは私を悲しませます。" },
      { type: "br" },
      { type: "text", value: "This site hasn't been updated much, that makes me sad." },
      { type: "br" },
      { type: "br" },
      { type: "text", value: "After months of refusing, I started to notice that the spark Lain gave me faded. I get bored quickly, I always did. I want to make this site dynamic, not an endless repetition of the same technique and color palette." },
      { type: "br" },
      { type: "br" },
      { type: "text", value: "This entire site is dedicated to web culture, otaku music, Japan, post/transhumanism, nihilism and escapism." },
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/JJJjjjjdDDD.gif", alt: "noise" },
      { type: "br" },
      { type: "gif", src: "/2/whoid.gif", alt: "noise" },
      { type: "br" },
      { type: "br" },
      { type: "gif", src: "/2/00004444444.gif", alt: "noise" },
      { type: "br" },
      { type: "gif", src: "/2/0000033333.gif", alt: "noise" },
    ],
  },
  {
    id: "aether",
    iconType: "B",
    title: "Æther の文書化",
    titleTranslations: { en: "Documentation of the Æther" },
    author: "-opsec_6209",
    date: "06.30.26",
    content: [
      { type: "text", value: "Æther, also known as the Æther, the Wired, or the Zone, is an unexplained realm that millions of people have experienced at least once. It is a place where people can feel various emotions like happiness or despair, and they can observe themselves without controlling themselves." },
      { type: "br" },
      { type: "br" },
      { type: "text", value: "The Wired is humanity's attempt to recreate the Æther, but it is a flawed, corrupted version. Technology can create shared human experiences, but it cannot make one perceive the Æther. The Æther, in contrast, is pure and free from earthly concerns like selfishness, hatred, and anxiety." },
      { type: "br" },
      { type: "br" },
      { type: "link", href: "https://thaer.no/", text: "→ æther" },
      { type: "br" },
      { type: "gif", src: "/2/aether-preview-02.gif", alt: "æther" },
    ],
  },
];
