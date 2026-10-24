import { Link } from "react-router-dom";
import { img, photos } from "../data";
import { useI18n } from "../i18n";

export function NotFound() {
  const { t } = useI18n();
  return (
    <section className="empty-state page-pad not-found">
      <img src={img(photos.pug, 800)} alt="" />
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.text}</p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-caramel">
          {t.notFound.cta}
        </Link>
        <Link to="/shop" className="btn btn-ghost-ink">
          {t.notFound.shop}
        </Link>
      </div>
    </section>
  );
}
