import { Link } from "react-router-dom";
import type { Product } from "../data";
import { money } from "../data";
import { copy, useI18n } from "../i18n";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useI18n();
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={copy(product.name, lang)} />
      </div>
      <div className="product-card-body">
        <p className="cat-pill">{t.shop[product.category]}</p>
        <h3>{copy(product.name, lang)}</h3>
        <p className="tagline">{copy(product.tagline, lang)}</p>
        <p className="price">{money(product.price, lang)}</p>
      </div>
    </Link>
  );
}
