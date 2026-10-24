import { useState, useRef } from "react";
import { sound } from "../audio";
import { useCart } from "../cart";
import { useI18n } from "../i18n";

type TagShape = "circle" | "bone" | "hexagon" | "arch";
type LeatherId = "caramel" | "sage" | "espresso" | "terracotta";
type HardwareFinish = "brass" | "silver" | "rosegold";
type CollarSize = "S" | "M" | "L";

const LEATHERS: Record<LeatherId, { hex: string; edge: string; stitch: string }> = {
  caramel: { hex: "#C48A5A", edge: "#8E5C32", stitch: "#F7E6D7" },
  sage: { hex: "#5C6F52", edge: "#3B4A34", stitch: "#D8E2D2" },
  espresso: { hex: "#231C18", edge: "#140F0D", stitch: "#8E837B" },
  terracotta: { hex: "#B65E45", edge: "#7C3B27", stitch: "#FCE0D8" },
};

const HARDWARE: Record<HardwareFinish, {
  highlight: string;
  mid: string;
  shadow: string;
  etched: string;
}> = {
  brass: {
    highlight: "#FFF2C8",
    mid: "#D8A748",
    shadow: "#7C5212",
    etched: "#4E3206",
  },
  silver: {
    highlight: "#FFFFFF",
    mid: "#C5CCD3",
    shadow: "#6B757E",
    etched: "#3A4249",
  },
  rosegold: {
    highlight: "#FFE8E2",
    mid: "#D99385",
    shadow: "#874538",
    etched: "#59271E",
  },
};

const MOTIFS = ["✦", "🐾", "🦴", "♡", "👑"];

export function CollarStudio() {
  const { t } = useI18n();
  const { addCustomCollar } = useCart();

  const [dogName, setDogName] = useState("MACK");
  const [phone, setPhone] = useState("+34 612 890 123");
  const [icon, setIcon] = useState("✦");
  const [shape, setShape] = useState<TagShape>("circle");
  const [leather, setLeather] = useState<LeatherId>("caramel");
  const [hardware, setHardware] = useState<HardwareFinish>("brass");
  const [size, setSize] = useState<CollarSize>("M");
  const [added, setAdded] = useState(false);

  // 3D tilt tracking for metallic reflection
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 35, glareY: 30 });
  const previewRef = useRef<HTMLDivElement>(null);

  const progress = (() => {
    let s = 1;
    if (dogName.trim().length >= 2) s = 2;
    if (dogName.trim().length >= 2 && leather) s = 3;
    if (added) s = 4;
    return s;
  })();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -18;
    const ry = (x - 0.5) * 22;
    setTilt({
      rx,
      ry,
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 35, glareY: 30 });
  };

  const handleAdd = () => {
    addCustomCollar({
      dogName: dogName.trim() || "MACK",
      phone: phone.trim(),
      icon,
      leatherId: leather,
      leatherName: t.atelier.leathers[leather],
      leatherColor: LEATHERS[leather].hex,
      tagShape: t.atelier.shapes[shape],
      hardware: t.atelier.hardwares[hardware],
      size,
      price: 54,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hw = HARDWARE[hardware];
  const lth = LEATHERS[leather];

  return (
    <section className="atelier-section" id="atelier">
      <div className="atelier-inner">
        <header className="atelier-head">
          <span className="atelier-pill">{t.atelier.badge}</span>
          <p className="kicker">{t.atelier.kicker}</p>
          <h2>{t.atelier.title}</h2>
          <p className="atelier-lead">{t.atelier.lead}</p>
          <div className="atelier-progress" aria-label="Customization progress">
            <div className="atelier-progress-bar" style={{ width: `${((progress - 1) / 3) * 100}%` }} />
            {["Name", "Leather", "Finish", "Done"].map((label, i) => (
              <span
                key={label}
                className={`atelier-step${progress > i + 1 ? " is-done" : ""}${progress === i + 1 ? " is-current" : ""}`}
              >
                {i + 1 < 4 ? `0${i + 1}` : "✦"} {label}
              </span>
            ))}
          </div>
        </header>

        <div className="atelier-grid">
          {/* 3D Interactive Visualizer */}
          <div
            className="atelier-preview"
            ref={previewRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <div className="preview-lighting" style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
            }} />

            <div
              className="collar-stage"
              style={{
                transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              {/* Realistic Leather Collar Band */}
              <div
                className="collar-band"
                style={{
                  backgroundColor: lth.hex,
                  borderColor: lth.edge,
                  boxShadow: `inset 0 2px 4px rgba(255,255,255,0.22), inset 0 -3px 6px rgba(0,0,0,0.35), 0 24px 44px rgba(26,23,20,0.22)`,
                }}
              >
                <div
                  className="collar-stitching"
                  style={{ borderColor: lth.stitch }}
                />
                <div
                  className="collar-hardware-ring"
                  style={{
                    background: `linear-gradient(135deg, ${hw.highlight}, ${hw.mid} 60%, ${hw.shadow})`,
                  }}
                />
              </div>

              {/* Hanging Brass Ring Connection */}
              <div
                className="collar-connector"
                style={{
                  background: `linear-gradient(180deg, ${hw.highlight}, ${hw.mid} 50%, ${hw.shadow})`,
                }}
              />

              {/* The Engraved Brass Medal */}
              <div
                className={`brass-medal shape-${shape}`}
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, ${hw.highlight} 0%, ${hw.mid} 48%, ${hw.shadow} 100%)`,
                  boxShadow: `0 18px 36px rgba(0,0,0,0.28), inset 0 2px 4px ${hw.highlight}, inset 0 -3px 6px ${hw.shadow}`,
                }}
              >
                <div
                  className="medal-rim"
                  style={{ borderColor: hw.shadow }}
                >
                  <div className="medal-icon">{icon}</div>
                  <div
                    className="medal-name"
                    style={{
                      color: hw.etched,
                      textShadow: `1px 1px 0px ${hw.highlight}, -0.5px -0.5px 0px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {dogName.trim() || "MACK"}
                  </div>
                  {phone ? (
                    <div
                      className="medal-phone"
                      style={{
                        color: hw.etched,
                        textShadow: `0.5px 0.5px 0px ${hw.highlight}`,
                      }}
                    >
                      {phone}
                    </div>
                  ) : null}
                  <span className="medal-city">BCN · HANDMADE</span>
                </div>
              </div>
            </div>

            <p className="atelier-hint">{t.atelier.hint}</p>
          </div>

          {/* Interactive Customization Studio Form */}
          <div className="atelier-controls">
            {/* Input: Dog Name */}
            <div className="control-group">
              <label htmlFor="dogNameInput">
                <span className="control-label">{t.atelier.dogNameLabel}</span>
                <span className="control-sublabel">{dogName.length}/12</span>
              </label>
              <input
                id="dogNameInput"
                type="text"
                maxLength={12}
                value={dogName}
                placeholder={t.atelier.dogNamePlaceholder}
                onChange={(e) => {
                  setDogName(e.target.value.toUpperCase());
                  sound.clink();
                }}
                className="atelier-input text-upper"
              />
            </div>

            {/* Input: Phone */}
            <div className="control-group">
              <label htmlFor="phoneInput">
                <span className="control-label">{t.atelier.phoneLabel}</span>
              </label>
              <input
                id="phoneInput"
                type="text"
                maxLength={18}
                value={phone}
                placeholder={t.atelier.phonePlaceholder}
                onChange={(e) => setPhone(e.target.value)}
                className="atelier-input"
              />
            </div>

            {/* Motifs */}
            <div className="control-group">
              <span className="control-label">{t.atelier.iconLabel}</span>
              <div className="icon-selector">
                {MOTIFS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`icon-chip ${icon === m ? "is-selected" : ""}`}
                    onClick={() => {
                      setIcon(m);
                      sound.clink();
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Medal Shape */}
            <div className="control-group">
              <span className="control-label">{t.atelier.tagShapeLabel}</span>
              <div className="button-matrix">
                {(["circle", "bone", "hexagon", "arch"] as TagShape[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`matrix-btn ${shape === s ? "is-selected" : ""}`}
                    onClick={() => {
                      setShape(s);
                      sound.clink();
                    }}
                  >
                    <span className={`shape-glyph glyph-${s}`} />
                    {t.atelier.shapes[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Leather Shade */}
            <div className="control-group">
              <span className="control-label">
                {t.atelier.leatherLabel}: <strong>{t.atelier.leathers[leather]}</strong>
              </span>
              <div className="swatch-row">
                {(["caramel", "sage", "espresso", "terracotta"] as LeatherId[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    className={`leather-swatch ${leather === l ? "is-selected" : ""}`}
                    style={{ backgroundColor: LEATHERS[l].hex }}
                    onClick={() => {
                      setLeather(l);
                      sound.pop();
                    }}
                    title={t.atelier.leathers[l]}
                  >
                    <span className="swatch-indicator" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Finish */}
            <div className="control-group">
              <span className="control-label">
                {t.atelier.hardwareLabel}: <strong>{t.atelier.hardwares[hardware]}</strong>
              </span>
              <div className="finish-row">
                {(["brass", "silver", "rosegold"] as HardwareFinish[]).map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`finish-btn ${hardware === h ? "is-selected" : ""}`}
                    onClick={() => {
                      setHardware(h);
                      sound.clink();
                    }}
                  >
                    <span
                      className="finish-dot"
                      style={{
                        background: `linear-gradient(135deg, ${HARDWARE[h].highlight}, ${HARDWARE[h].mid})`,
                      }}
                    />
                    {t.atelier.hardwares[h]}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="control-group">
              <span className="control-label">{t.atelier.sizeLabel}</span>
              <div className="size-selector">
                {(["S", "M", "L"] as CollarSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-btn ${size === s ? "is-selected" : ""}`}
                    onClick={() => {
                      setSize(s);
                      sound.pop();
                    }}
                  >
                    <strong>{s}</strong>
                    <small>{s === "S" ? "24–32cm" : s === "M" ? "32–42cm" : "42–54cm"}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Basket Action */}
            <div className="atelier-actions">
              <button
                type="button"
                className={`btn btn-caramel btn-block atelier-add-btn ${added ? "is-added" : ""}`}
                onClick={handleAdd}
              >
                {added ? t.atelier.addedBtn : t.atelier.addBtn}
              </button>
              {added ? (
                <div className="earn-badge" role="status">
                  <span className="earn-badge-mark">✦</span>
                  <span>Look complete — collar ready for {dogName.trim() || "MACK"}</span>
                </div>
              ) : null}
              <p className="atelier-footnote">{t.atelier.heirloomNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
