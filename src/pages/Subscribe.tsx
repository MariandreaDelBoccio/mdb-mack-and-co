import { useState } from "react";
import { useCart } from "../cart";
import type { Frequency } from "../data";
import { money, planPrice, plans } from "../data";
import { copy, useI18n } from "../i18n";
import { BoxBuilder } from "../components/BoxBuilder";

export function Subscribe() {
  const { lang, t } = useI18n();
  const { addSubscription, lines } = useCart();
  const [freq, setFreq] = useState<Record<string, Frequency>>(
    Object.fromEntries(plans.map((p) => [p.id, "monthly" as Frequency])),
  );
  const [flash, setFlash] = useState<string | null>(null);

  const currentSub = lines.find((l) => l.kind === "subscription");

  return (
    <div className="subscribe-wrapper">
      {/* Interactive Bespoke Box Builder */}
      <BoxBuilder />

      {/* Preset Curated Plans */}
      <section className="section subscribe-page">
        <div className="section-head">
          <p className="kicker">{t.subscribe.kicker}</p>
          <h2>{t.subscribe.title}</h2>
          <p className="lead">{t.subscribe.lead}</p>
        </div>

        <div className="plan-grid">
          {plans.map((plan) => {
            const frequency = freq[plan.id] ?? "monthly";
            const price = planPrice(plan, frequency);
            const selected =
              currentSub?.kind === "subscription" &&
              currentSub.planId === plan.id &&
              currentSub.frequency === frequency;

            return (
              <article key={plan.id} className="plan-card">
                <div className="plan-media">
                  <img src={plan.image} alt={copy(plan.name, lang)} />
                </div>
                <div className="plan-body">
                  <h3>{copy(plan.name, lang)}</h3>
                  <p className="tagline">{copy(plan.tagline, lang)}</p>
                  <p>{copy(plan.description, lang)}</p>
                  <p className="plan-includes-label">{t.subscribe.includes}</p>
                  <ul>
                    {plan.includes.map((item) => (
                      <li key={item.en}>{copy(item, lang)}</li>
                    ))}
                  </ul>
                  <div className="freq-toggle">
                    <button
                      type="button"
                      className={frequency === "monthly" ? "is-on" : ""}
                      onClick={() => setFreq((f) => ({ ...f, [plan.id]: "monthly" }))}
                    >
                      {t.subscribe.monthly}
                    </button>
                    <button
                      type="button"
                      className={frequency === "bimonthly" ? "is-on" : ""}
                      onClick={() => setFreq((f) => ({ ...f, [plan.id]: "bimonthly" }))}
                    >
                      {t.subscribe.bimonthly}
                    </button>
                  </div>
                  <p className="pdp-price">{money(price, lang)}</p>
                  <button
                    type="button"
                    className="btn btn-caramel btn-block"
                    onClick={() => {
                      addSubscription(plan.id, frequency);
                      setFlash(plan.id);
                      window.setTimeout(() => setFlash(null), 1600);
                    }}
                  >
                    {flash === plan.id || selected ? t.subscribe.added : t.subscribe.add}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pause-skip">
          <article>
            <h3>{t.subscribe.skipTitle}</h3>
            <p>{t.subscribe.skipText}</p>
            <button type="button" className="btn btn-ghost-ink" disabled>
              {t.subscribe.skipTitle}
            </button>
          </article>
          <article>
            <h3>{t.subscribe.pauseTitle}</h3>
            <p>{t.subscribe.pauseText}</p>
            <button type="button" className="btn btn-ghost-ink" disabled>
              {t.subscribe.pauseTitle}
            </button>
          </article>
        </div>
        <p className="home-note">{t.subscribe.note}</p>
      </section>
    </div>
  );
}
