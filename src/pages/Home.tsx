import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { img, photos } from "../data";
import { useI18n } from "../i18n";
import { CollarStudio } from "../components/CollarStudio";
import { LookbookHotspots } from "../components/LookbookHotspots";
import { BoxBuilder } from "../components/BoxBuilder";

const mosaic = [
  { src: photos.pack, to: "/shop", big: true },
  { src: photos.goldenSit, to: "/shop?cat=treats" },
  { src: photos.beach, to: "/shop?cat=accessories" },
  { src: photos.cream, to: "/shop?cat=toys" },
  { src: photos.frenchie, to: "/subscribe" },
  { src: photos.lab, to: "/shop" },
];

export function Home() {
  const { t } = useI18n();

  return (
    <>
      <section className="hero skylrk" id="hero-zone">
        <div className="hero-copy">
          <span className="hero-eyebrow kinetic-line" style={{ "--i": 0 } as CSSProperties}>
            BARCELONA ATELIER · EST. 2024
          </span>
          <h1 className="display-title">
            <span className="kinetic-line" style={{ "--i": 1 } as CSSProperties}>
              MACK
            </span>
            <span className="amp kinetic-line" style={{ "--i": 2 } as CSSProperties}>
              &amp;
            </span>
            <span className="kinetic-line" style={{ "--i": 3 } as CSSProperties}>
              CO.
            </span>
          </h1>
          <p className="hero-tag kinetic-line" style={{ "--i": 4 } as CSSProperties}>
            {t.brand.tagline}
          </p>
          <div className="hero-actions kinetic-line" style={{ "--i": 5 } as CSSProperties}>
            <a href="#atelier" className="btn btn-caramel">
              {t.atelier.badge} ✦
            </a>
            <Link to="/shop" className="btn btn-ghost">
              {t.home.shopCta}
            </Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>
              vegetable-tanned leather ✦ hand-engraved brass ✦ wholesome artisan treats ✦ bespoke subscription parcels ✦
            </span>
          ))}
        </div>
      </div>

      <CollarStudio />
      <LookbookHotspots />
      <BoxBuilder />

      <section className="mosaic-section">
        <div className="mosaic-head">
          <p className="kicker">#MACKANDCO</p>
          <h3>Seen on the Morning Walk</h3>
        </div>
        <div className="mosaic">
          {mosaic.map((tile) => (
            <Link
              key={tile.src}
              to={tile.to}
              className={`tile${tile.big ? " big" : ""}`}
            >
              <img src={img(tile.src, 1400)} alt="Mack & Co dog companions" loading="lazy" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section center-cta">
        <h2>{t.home.featuredLead}</h2>
        <div className="hero-actions">
          <Link to="/shop" className="btn btn-caramel">
            {t.home.shopCta}
          </Link>
          <Link to="/subscribe" className="btn btn-ghost">
            {t.home.subCta}
          </Link>
        </div>
        <p className="home-note">{t.home.note}</p>
      </section>
    </>
  );
}
