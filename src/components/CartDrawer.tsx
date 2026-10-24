import { useEffect } from "react";
import { lineTotal, useCart } from "../cart";
import { useI18n, copy } from "../i18n";
import { sound } from "../audio";
import { getProduct, getPlan, products, money } from "../data";

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    freeTreatThreshold,
    hasFreeTreat,
    amountNeededForFreeTreat,
    isDrawerOpen,
    closeDrawer,
    setQty,
    remove,
    addProduct,
  } = useCart();

  const { lang, t } = useI18n();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Progress percentage (0 - 100)
  const freeTreatProgress = Math.min(100, Math.round((subtotal / freeTreatThreshold) * 100));

  // Quick upsells: products not in cart
  const upsellCandidate =
    products.find(
      (p) => !lines.some((line) => line.kind === "product" && line.productId === p.id)
    ) || products[0];

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5;
  const grandTotal = subtotal + shipping;

  return (
    <div className={`drawer-overlay ${isDrawerOpen ? "is-open" : ""}`} onClick={closeDrawer}>
      <aside
        className={`drawer-panel ${isDrawerOpen ? "is-open" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t.drawer.title}
      >
        {/* Drawer Header */}
        <header className="drawer-header">
          <div className="drawer-title-wrap">
            <span className="drawer-title">{t.drawer.title}</span>
            <span className="drawer-count">({count})</span>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={() => {
              closeDrawer();
              sound.pop();
            }}
            aria-label={t.nav.close}
          >
            ✕
          </button>
        </header>

        {/* Free Treat Meter */}
        <div className="drawer-meter">
          <div className="meter-label-row">
            {hasFreeTreat ? (
              <span className="meter-text unlocked">
                {t.drawer.freeTreatUnlocked}
              </span>
            ) : (
              <span className="meter-text">
                {t.drawer.freeTreatAway.replace("{amount}", `€${amountNeededForFreeTreat}`)}
              </span>
            )}
            <span className="meter-target">€{freeTreatThreshold}</span>
          </div>
          <div className="meter-track">
            <div
              className={`meter-bar ${hasFreeTreat ? "is-full" : ""}`}
              style={{ width: `${freeTreatProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Body / Items List */}
        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="drawer-empty">
              <span className="drawer-empty-icon">🐾</span>
              <p className="drawer-empty-title">{t.cart.emptyTitle}</p>
              <p className="drawer-empty-lead">{t.cart.emptyText}</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  closeDrawer();
                  const atelier = document.getElementById("atelier");
                  if (atelier) {
                    atelier.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/shop";
                  }
                }}
              >
                {t.cart.emptyCta}
              </button>
            </div>
          ) : (
            <div className="drawer-items">
              {lines.map((line) => {
                if (line.kind === "custom-collar") {
                  return (
                    <div key={line.id} className="drawer-item collar-item">
                      <div
                        className="collar-item-swatch"
                        style={{ backgroundColor: line.leatherColor }}
                        title={line.leatherName}
                      >
                        <span className="collar-swatch-icon">{line.icon}</span>
                      </div>
                      <div className="item-details">
                        <div className="item-title-row">
                          <h4 className="item-title">{t.drawer.customCollarTag}</h4>
                          <span className="item-price">{money(lineTotal(line), lang)}</span>
                        </div>
                        <p className="item-tag-engraving">
                          <strong>{line.dogName}</strong> · {line.phone || "No digits"}
                        </p>
                        <p className="item-specs">
                          {line.leatherName} · {line.tagShape} · {line.hardware} · T.{line.size}
                        </p>
                        <div className="item-controls">
                          <div className="qty-picker">
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty - 1)}
                            >
                              −
                            </button>
                            <span>{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="item-remove"
                            onClick={() => remove(line.id)}
                          >
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (line.kind === "custom-box") {
                  return (
                    <div key={line.id} className="drawer-item box-item">
                      <div className="box-item-badge">
                        <span>📦</span>
                      </div>
                      <div className="item-details">
                        <div className="item-title-row">
                          <h4 className="item-title">
                            {line.dogName}&apos;s {t.drawer.customBoxTag}
                          </h4>
                          <span className="item-price">{money(lineTotal(line), lang)}</span>
                        </div>
                        <p className="item-specs">
                          {line.dogSize} · {line.personality}
                        </p>
                        <p className="item-specs">
                          {line.treatChoice} · {t.cart.frequency[line.frequency]}
                        </p>
                        <div className="item-controls">
                          <div className="qty-picker">
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty - 1)}
                            >
                              −
                            </button>
                            <span>{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="item-remove"
                            onClick={() => remove(line.id)}
                          >
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (line.kind === "subscription") {
                  const plan = getPlan(line.planId);
                  if (!plan) return null;
                  return (
                    <div key={line.id} className="drawer-item sub-item">
                      <img src={plan.image} alt="" className="item-thumb" />
                      <div className="item-details">
                        <div className="item-title-row">
                          <h4 className="item-title">{copy(plan.name, lang)}</h4>
                          <span className="item-price">{money(lineTotal(line), lang)}</span>
                        </div>
                        <p className="item-specs">{t.cart.frequency[line.frequency]}</p>
                        <div className="item-controls">
                          <button
                            type="button"
                            className="item-remove"
                            onClick={() => remove(line.id)}
                          >
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Standard product
                const product = getProduct(line.productId);
                if (!product) return null;
                return (
                  <div key={line.id} className="drawer-item standard-item">
                    <img src={product.image} alt={copy(product.name, lang)} className="item-thumb" />
                    <div className="item-details">
                      <div className="item-title-row">
                        <h4 className="item-title">{copy(product.name, lang)}</h4>
                        <span className="item-price">{money(lineTotal(line), lang)}</span>
                      </div>
                      {line.size && <p className="item-specs">{line.size}</p>}
                      <div className="item-controls">
                        <div className="qty-picker">
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty - 1)}
                          >
                            −
                          </button>
                          <span>{line.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="item-remove"
                          onClick={() => remove(line.id)}
                        >
                          {t.cart.remove}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Complimentary treat item banner if unlocked */}
              {hasFreeTreat && (
                <div className="free-gift-row">
                  <span className="free-gift-icon">🎁</span>
                  <div className="free-gift-info">
                    <strong>Sunday Biscuit Tin (Complimentary)</strong>
                    <span>Artisan apple & oat rewards in an embossed keepsake tin.</span>
                  </div>
                  <div className="free-gift-price">
                    <span className="original">€22</span>
                    <span className="free">FREE</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Upsell Card */}
          {lines.length > 0 && upsellCandidate && (
            <div className="drawer-upsell">
              <span className="upsell-heading">{t.drawer.upsellTitle}</span>
              <div className="upsell-card">
                <img
                  src={upsellCandidate.image}
                  alt={copy(upsellCandidate.name, lang)}
                  className="upsell-thumb"
                />
                <div className="upsell-details">
                  <span className="upsell-name">
                    {copy(upsellCandidate.name, lang)}
                  </span>
                  <span className="upsell-price">{money(upsellCandidate.price, lang)}</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-xs"
                  onClick={() => addProduct(upsellCandidate.id)}
                >
                  {t.drawer.quickAdd}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout */}
        {lines.length > 0 && (
          <footer className="drawer-footer">
            <div className="drawer-summary">
              <div className="summary-row">
                <span>{t.cart.subtotal}</span>
                <span>{money(subtotal, lang)}</span>
              </div>
              <div className="summary-row">
                <span>{t.cart.shipping}</span>
                <span>{shipping === 0 ? t.cart.shippingNote : money(shipping, lang)}</span>
              </div>
              {hasFreeTreat && (
                <div className="summary-row free-reward">
                  <span>Sunday Biscuit Tin</span>
                  <span className="tag-free">FREE</span>
                </div>
              )}
              <div className="summary-row grand-total">
                <strong>{t.cart.total}</strong>
                <strong>{money(grandTotal, lang)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-caramel btn-block drawer-checkout-btn"
              onClick={() => {
                sound.celebrate();
                alert(
                  lang === "es"
                    ? "✨ ¡Gracias por tu compra en MACK & CO.! Redirigiendo a pasarela segura..."
                    : "✨ Thank you for ordering from MACK & CO.! Redirecting to secure checkout..."
                );
              }}
            >
              {t.drawer.viewCart} — {money(grandTotal, lang)}
            </button>
            <p className="drawer-guarantee">{t.atelier.heirloomNote}</p>
          </footer>
        )}
      </aside>
    </div>
  );
}
