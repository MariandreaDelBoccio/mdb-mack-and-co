import { Link, useSearchParams } from "react-router-dom";
import type { Category } from "../data";
import { products } from "../data";
import { useI18n } from "../i18n";
import { ProductCard } from "../components/ProductCard";

const cats: Array<"all" | Category> = ["all", "accessories", "treats", "toys"];

function isCategory(v: string | null): v is Category {
  return v === "accessories" || v === "treats" || v === "toys";
}

export function Shop() {
  const { t } = useI18n();
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat");
  const unknown = Boolean(cat && cat !== "all" && !isCategory(cat));
  const active: "all" | Category = isCategory(cat) ? cat : "all";

  const list = unknown
    ? []
    : active === "all"
      ? products
      : products.filter((p) => p.category === active);

  const setCat = (next: "all" | Category) => {
    if (next === "all") setParams({});
    else setParams({ cat: next });
  };

  return (
    <section className="section shop-page">
      <div className="section-head">
        <p className="kicker">{t.shop.kicker}</p>
        <h1>{t.shop.title}</h1>
        <p className="lead">{t.shop.lead}</p>
      </div>

      <div className="filters" role="tablist">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            className={active === c ? "is-on" : ""}
            onClick={() => setCat(c)}
          >
            {c === "all" ? t.shop.all : t.shop[c]}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          <h2>{t.shop.emptyTitle}</h2>
          <p>{t.shop.emptyText}</p>
          <button type="button" className="btn btn-caramel" onClick={() => setCat("all")}>
            {t.shop.emptyCta}
          </button>
        </div>
      ) : (
        <div className="product-grid zine">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <p className="shop-foot">
        <Link to="/subscribe">{t.home.subCta} →</Link>
      </p>
    </section>
  );
}
