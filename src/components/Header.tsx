import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../cart";
import { useI18n } from "../i18n";
import { sound } from "../audio";
import { useEffect, useState, type CSSProperties } from "react";

const ZONE_IDS = ["hero-zone", "atelier", "walk-journal", "box-builder"] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { count, openDrawer } = useCart();
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(sound.isEnabled());
  const [activeZone, setActiveZone] = useState<string>("hero-zone");
  const location = useLocation();
  const onHome = location.pathname === "/";

  const close = () => setOpen(false);

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundOn(next);
  };

  const scrollToZone = (id: string) => {
    if (!onHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => {
      let current: string = ZONE_IDS[0];
      for (const id of ZONE_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveZone(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const zones = [
    { id: "hero-zone", label: t.nav.home, kind: "zone" as const },
    { id: "shop", label: t.nav.shop, kind: "route" as const, to: "/shop" },
    { id: "atelier", label: t.nav.atelier, kind: "zone" as const },
    { id: "walk-journal", label: t.nav.journal, kind: "zone" as const },
    { id: "box-builder", label: t.nav.subscribe, kind: "zone" as const },
  ];

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="wordmark" onClick={close} aria-label="MACK & CO.">
          <span className="wordmark-mack">MACK</span>
          <span className="wordmark-and">&amp; CO.</span>
        </Link>

        <nav className="nav-desktop zone-nav" aria-label="Primary">
          {zones.map((z) =>
            z.kind === "route" ? (
              <NavLink key={z.id} to={z.to!} className="zone-link">
                {z.label}
              </NavLink>
            ) : (
              <button
                key={z.id}
                type="button"
                className={`zone-link${activeZone === z.id && onHome ? " is-active" : ""}`}
                onClick={() => {
                  sound.pop();
                  scrollToZone(z.id);
                }}
              >
                {z.label}
              </button>
            )
          )}
          <button
            type="button"
            className="nav-cart-btn"
            onClick={() => {
              sound.pop();
              openDrawer();
            }}
          >
            {t.nav.cart}
            {count > 0 ? <span className="cart-count">{count}</span> : null}
          </button>
        </nav>

        <div className="header-tools">
          <button
            type="button"
            className={`sound-toggle-btn ${soundOn ? "is-active" : ""}`}
            onClick={toggleSound}
            title={soundOn ? t.sound.on : t.sound.off}
            aria-label={soundOn ? t.sound.on : t.sound.off}
          >
            <span className="sound-icon">{soundOn ? "🔊" : "🔇"}</span>
            <span className="sound-text">{soundOn ? "FX ON" : "FX OFF"}</span>
          </button>

          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              type="button"
              className={lang === "en" ? "is-on" : ""}
              onClick={() => {
                setLang("en");
                sound.chime();
              }}
            >
              {t.lang.en}
            </button>
            <button
              type="button"
              className={lang === "es" ? "is-on" : ""}
              onClick={() => {
                setLang("es");
                sound.chime();
              }}
            >
              {t.lang.es}
            </button>
          </div>

          <button
            type="button"
            className="header-bag"
            aria-label={t.nav.cart}
            onClick={() => {
              sound.pop();
              openDrawer();
            }}
          >
            <BagIcon />
            {count > 0 ? <span className="cart-count">{count}</span> : null}
          </button>

          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="nav-mobile zone-overlay" aria-label="Mobile">
          <span className="overlay-amp" aria-hidden="true">
            &amp;
          </span>
          {zones.map((z, i) =>
            z.kind === "route" ? (
              <NavLink
                key={z.id}
                to={z.to!}
                className="overlay-link"
                style={{ "--i": i } as CSSProperties}
                onClick={close}
              >
                <span className="overlay-num">0{i + 1}</span>
                {z.label}
              </NavLink>
            ) : (
              <button
                key={z.id}
                type="button"
                className="overlay-link"
                style={{ "--i": i } as CSSProperties}
                onClick={() => {
                  close();
                  sound.pop();
                  scrollToZone(z.id);
                }}
              >
                <span className="overlay-num">0{i + 1}</span>
                {z.label}
              </button>
            )
          )}
          <button
            type="button"
            className="overlay-link overlay-cart"
            style={{ "--i": zones.length } as CSSProperties}
            onClick={() => {
              close();
              openDrawer();
            }}
          >
            <span className="overlay-num">0{zones.length + 1}</span>
            {t.nav.cart} {count > 0 ? `(${count})` : ""}
          </button>
        </nav>
      ) : null}
    </header>
  );
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V7a3 3 0 0 1 6 0v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
