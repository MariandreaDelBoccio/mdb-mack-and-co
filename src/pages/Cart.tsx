import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { lineTotal, useCart } from "../cart";
import { getPlan, getProduct, money } from "../data";
import { copy, useI18n } from "../i18n";

export function Cart() {
  const { lang, t } = useI18n();
  const { lines, setQty, remove, clear, subtotal, hasFreeTreat } = useCart();
  const [done, setDone] = useState(false);

  const onCheckout = (e: FormEvent) => {
    e.preventDefault();
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <section className="empty-state page-pad">
        <p className="kicker">{t.cart.kicker}</p>
        <h1>{t.cart.confirmTitle}</h1>
        <p>{t.cart.confirmText}</p>
        <Link to="/shop" className="btn btn-caramel">
          {t.cart.confirmCta}
        </Link>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="empty-state page-pad">
        <p className="kicker">{t.cart.kicker}</p>
        <h1>{t.cart.emptyTitle}</h1>
        <p>{t.cart.emptyText}</p>
        <Link to="/shop" className="btn btn-caramel">
          {t.cart.emptyCta}
        </Link>
      </section>
    );
  }

  return (
    <section className="section cart-page">
      <div className="section-head">
        <p className="kicker">{t.cart.kicker}</p>
        <h1>{t.cart.title}</h1>
      </div>

      <div className="cart-layout">
        <ul className="cart-lines">
          {lines.map((line) => {
            if (line.kind === "product") {
              const product = getProduct(line.productId);
              if (!product) return null;
              return (
                <li key={line.id} className="cart-line">
                  <img src={product.image} alt="" />
                  <div>
                    <p className="cat-pill">{t.cart.oneTime}</p>
                    <h3>{copy(product.name, lang)}</h3>
                    {line.size ? (
                      <p className="muted">
                        {t.cart.size} {line.size}
                      </p>
                    ) : null}
                    <p className="price">{money(product.price, lang)}</p>
                    <div className="qty-row">
                      <label>
                        {t.cart.qty}
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={line.qty}
                          onChange={(e) => setQty(line.id, Number(e.target.value))}
                        />
                      </label>
                      <button type="button" className="text-btn" onClick={() => remove(line.id)}>
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                  <p className="line-total">{money(lineTotal(line), lang)}</p>
                </li>
              );
            }

            if (line.kind === "subscription") {
              const plan = getPlan(line.planId);
              if (!plan) return null;
              return (
                <li key={line.id} className="cart-line">
                  <img src={plan.image} alt="" />
                  <div>
                    <p className="cat-pill sage">{t.cart.sub}</p>
                    <h3>{copy(plan.name, lang)}</h3>
                    <p className="muted">{t.cart.frequency[line.frequency]}</p>
                    <p className="price">{money(lineTotal(line) / line.qty, lang)}</p>
                    <button type="button" className="text-btn" onClick={() => remove(line.id)}>
                      {t.cart.remove}
                    </button>
                  </div>
                  <p className="line-total">{money(lineTotal(line), lang)}</p>
                </li>
              );
            }

            if (line.kind === "custom-collar") {
              return (
                <li key={line.id} className="cart-line">
                  <div
                    className="cart-custom-badge"
                    style={{ backgroundColor: line.leatherColor }}
                  >
                    <span>{line.icon}</span>
                  </div>
                  <div>
                    <p className="cat-pill">{t.atelier.badge}</p>
                    <h3>{t.drawer.customCollarTag}: {line.dogName}</h3>
                    <p className="muted">
                      {line.leatherName} · {line.tagShape} · {line.hardware} · T.{line.size} {line.phone ? `· ${line.phone}` : ""}
                    </p>
                    <p className="price">{money(line.price, lang)}</p>
                    <div className="qty-row">
                      <label>
                        {t.cart.qty}
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={line.qty}
                          onChange={(e) => setQty(line.id, Number(e.target.value))}
                        />
                      </label>
                      <button type="button" className="text-btn" onClick={() => remove(line.id)}>
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                  <p className="line-total">{money(lineTotal(line), lang)}</p>
                </li>
              );
            }

            if (line.kind === "custom-box") {
              return (
                <li key={line.id} className="cart-line">
                  <div className="cart-custom-badge box">
                    <span>📦</span>
                  </div>
                  <div>
                    <p className="cat-pill sage">{t.subscribe.kicker}</p>
                    <h3>{line.dogName}&apos;s {t.drawer.customBoxTag}</h3>
                    <p className="muted">
                      {line.dogSize} · {line.personality} · {line.treatChoice}
                    </p>
                    <p className="price">{money(line.price, lang)}</p>
                    <div className="qty-row">
                      <button type="button" className="text-btn" onClick={() => remove(line.id)}>
                        {t.cart.remove}
                      </button>
                    </div>
                  </div>
                  <p className="line-total">{money(lineTotal(line), lang)}</p>
                </li>
              );
            }

            return null;
          })}
        </ul>

        <aside className="cart-summary">
          <div className="summary-row">
            <span>{t.cart.subtotal}</span>
            <span>{money(subtotal, lang)}</span>
          </div>
          <div className="summary-row">
            <span>{t.cart.shipping}</span>
            <span>{subtotal >= 50 ? t.cart.shippingNote : money(5, lang)}</span>
          </div>
          {hasFreeTreat && (
            <div className="summary-row free-reward">
              <span>Sunday Biscuit Tin</span>
              <span className="tag-free">FREE</span>
            </div>
          )}
          <div className="summary-row total">
            <span>{t.cart.total}</span>
            <span>{money(subtotal >= 50 ? subtotal : subtotal + 5, lang)}</span>
          </div>
          <form className="checkout-form" onSubmit={onCheckout}>
            <label>
              {t.cart.name}
              <input required name="name" autoComplete="name" />
            </label>
            <label>
              {t.cart.email}
              <input required type="email" name="email" autoComplete="email" />
            </label>
            <label>
              {t.cart.address}
              <input required name="address" autoComplete="street-address" />
            </label>
            <label>
              {t.cart.city}
              <input required name="city" autoComplete="address-level2" />
            </label>
            <button type="submit" className="btn btn-caramel btn-block">
              {t.cart.checkout}
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
