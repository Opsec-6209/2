import { Brackets } from "./Brackets";
import { MultilangPhrase } from "./MultilangPhrase";

export function Header() {
  return (
    <div id="navbar" style={{ textAlign: "center", padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
      <Brackets position="top" />

      <h1 style={{ fontSize: "28px", fontFamily: "var(--font-serif)", margin: "16px 0", lineHeight: 1.2 }}>
        <span className="wired-anim wdel1s" style={{ display: "block" }}>
          {"\u2308\u00A0\u00A0\u00A0Wired\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
        </span>
        <span className="wired-anim wdel2s" style={{ display: "block" }}>
          Sound for Wired People
        </span>
        <span className="wired-anim wdel3s" style={{ display: "block" }}>
          {"\u00A0\u00A0\u00A0People\u00A0\u230B"}
        </span>
      </h1>

      <MultilangPhrase />

      <p className="copy" style={{ fontSize: "11px", marginTop: "32px" }}>
        Copyright © 2013-2026
      </p>
      <p className="mail" style={{ fontSize: "11px" }}>
        <a href="mailto:opsec_6209@protonmail.com">opsec_6209@protonmail.com</a>
      </p>
      <p className="mail" style={{ fontSize: "11px" }}>
        <a href="https://github.com/Opsec-6209">GitHub profile</a>
      </p>

      <Brackets position="bottom" />

      <img
        className="logo"
        src="/2/mebious_icon_02.gif"
        alt="mebious"
        style={{
          width: "64px",
          height: "auto",
          margin: "16px auto",
          display: "block",
          imageRendering: "pixelated",
        }}
      />

      <p id="navline" style={{ fontSize: "11px", margin: "8px 0", lineHeight: 1.8 }}>
        <a href="#about">About Me</a> ︱ <a href="#wired">Wired</a> ︱ <a href="#tracklist">Tracklist</a> ︱ <a href="#dir">Dir/etc</a>
        <br />
        <a href="https://www.tiktok.com/@opsec_6209">TikTok</a> ︱{" "}
        <a href="https://github.com/Opsec-6209">GitHub</a> ︱{" "}
        <a href="https://discord.com/users/868572830269329439">Discord</a>
      </p>

      <hr style={{ margin: "16px 0" }} />

      <p style={{ fontSize: "11px" }}>
        You are invisible.
        <br />
        <a href="#go-visible">[Go visible]</a>
      </p>
    </div>
  );
}
