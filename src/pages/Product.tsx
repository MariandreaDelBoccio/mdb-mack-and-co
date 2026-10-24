import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart";
import { getProduct, money, products } from "../data";
import { copy, useI18n } from "../i18n";
import { ProductCard } from "../components/ProductCard";

export function ProductPage() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;
  const { lang, t } = useI18n();
  const { addProduct, lines } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSize(product?.sizes?.[0]);
  }, [product]);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <section className="empty-state page-pad">
        <h1>{t.productMissing.title}</h1>
        <p>{t.productMissing.text}</p>
        <Link to="/shop" className="btn btn-caramel">
          {t.productMissing.cta}
        </Link>
      </section>
    );
  }

  const inCart = lines.some(
    (l) =>
      l.kind === "product" &&
      l.productId === product.id &&
      (product.sizes ? l.size === (size ?? product.sizes[0]) : true),
  );

  const onAdd = () => {
    addProduct(product.id, product.sizes ? size ?? product.sizes[0] : undefined);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <section className="pdp">
      <Link to="/shop" className="back-link">
        ← {t.product.back}
      </Link>
      <div className="pdp-grid">
        <div className="pdp-media">
          <img src={product.image} alt={copy(product.name, lang)} />
        </div>
        <div className="pdp-info">
          <p className="cat-pill">{t.shop[product.category]}</p>
          <h1>{copy(product.name, lang)}</h1>
          <p className="tagline">{copy(product.tagline, lang)}</p>
          <p className="pdp-price">{money(product.price, lang)}</p>
          <p className="pdp-desc">{copy(product.description, lang)}</p>
          {product.material ? (
            <p className="material">
              <span>{t.product.material}</span>
              {copy(product.material, lang)}
            </p>
          ) : null}
          {product.sizes ? (
            <div className="size-row">
              <p>{t.product.size}</p>
              <div className="size-pills">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={size === s ? "is-on" : ""}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <button type="button" className="btn btn-caramel btn-block" onClick={onAdd}>
            {justAdded || inCart ? t.product.added : t.product.add}
          </button>
        </div>
      </div>
      {related.length > 0 ? (
        <div className="related">
          <h2>{t.product.related}</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
