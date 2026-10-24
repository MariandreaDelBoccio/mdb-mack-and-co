import { useState } from "react";
import { sound } from "../audio";
import { useCart } from "../cart";
import { useI18n, copy } from "../i18n";
import { products, money } from "../data";

interface Hotspot {
  id: string;
  productId: string;
  x: number; // percentage
  y: number; // percentage
  align: "left" | "right" | "top";
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "lead",
    productId: "mack-lead",
    x: 42,
    y: 36,
    align: "right",
  },
  {
    id: "coat",
    productId: "waxed-field-coat",
    x: 58,
    y: 52,
    align: "left",
  },
  {
    id: "harness",
    productId: "heritage-harness",
    x: 32,
    y: 64,
    align: "right",
  },
];

export function LookbookHotspots() {
  const { lang, t } = useI18n();
  const { addProduct } = useCart();
  const [activeSpot, setActiveSpot] = useState<string | null>("lead");

  const getProduct = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  const handleQuickAdd = (productId: string) => {
    addProduct(productId);
  };

  return (
    <section className="journal-section" id="walk-journal">
      <div className="journal-inner">
        <header className="journal-head">
          <p className="kicker">{t.walkJournal.kicker}</p>
          <h2>{t.walkJournal.title}</h2>
          <p className="journal-lead">{t.walkJournal.lead}</p>
        </header>

        <div className="hotspots-stage">
          {/* Main Editorial Image */}
          <div className="hotspots-canvas">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=85"
              alt="Golden retriever walking through morning light with Mack and Co handcrafted harness and lead"
              className="hotspots-image"
              loading="lazy"
            />
            <div className="hotspots-overlay" />

            {/* Brass Pulsing Hotspots */}
            {HOTSPOTS.map((spot, index) => {
              const product = getProduct(spot.productId);
              if (!product) return null;
              const isActive = activeSpot === spot.id;
              const prodTitle = copy(product.name, lang);
              const prodTagline = copy(product.tagline, lang);

              return (
                <div
                  key={spot.id}
                  className={`hotspot-pin-wrapper align-${spot.align} ${isActive ? "is-active" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                >
                  <button
                    type="button"
                    className="hotspot-pin"
                    onClick={() => {
                      setActiveSpot(isActive ? null : spot.id);
                      sound.clink();
                    }}
                    onMouseEnter={() => {
                      setActiveSpot(spot.id);
                      sound.pop();
                    }}
                    aria-label={`View ${prodTitle}`}
                  >
                    <span className="pin-pulse" />
                    <span className="pin-core">0{index + 1}</span>
                  </button>

                  {/* Floating Product Popover Card */}
                  <div className="hotspot-card" role="dialog" aria-hidden={!isActive}>
                    <div className="hotspot-thumb-wrap">
                      <img
                        src={product.image}
                        alt={prodTitle}
                        className="hotspot-thumb"
                      />
                    </div>
                    <div className="hotspot-info">
                      <span className="hotspot-cat">{t.shop[product.category]}</span>
                      <h4 className="hotspot-title">{prodTitle}</h4>
                      <p className="hotspot-desc">{prodTagline}</p>
                      <div className="hotspot-bottom">
                        <span className="hotspot-price">{money(product.price, lang)}</span>
                        <div className="hotspot-actions">
                          <button
                            type="button"
                            className="btn btn-outline btn-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickAdd(product.id);
                            }}
                          >
                            {t.walkJournal.quickAdd}
                          </button>
                          <a
                            className="hotspot-deep"
                            href={
                              product.id.includes("collar") || product.id === "heritage-harness"
                                ? "#atelier"
                                : `/shop`
                            }
                            onClick={(e) => e.stopPropagation()}
                          >
                            {product.id.includes("collar") || product.id === "heritage-harness"
                              ? t.nav.atelier
                              : t.nav.shop}{" "}
                            →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hotspots-strip">
            <span className="strip-caption">
              Sarrià, Barcelona · Sunday 08:30 AM
            </span>
            <div className="strip-dots">
              {HOTSPOTS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`strip-dot ${activeSpot === s.id ? "is-active" : ""}`}
                  onClick={() => {
                    setActiveSpot(s.id);
                    sound.pop();
                  }}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
