import { useState } from "react";
import { sound } from "../audio";
import { useCart } from "../cart";
import { useI18n } from "../i18n";
import type { Frequency } from "../data";

type SizeKey = "small" | "medium" | "large";
type PersonalityKey = "couch" | "park" | "chewer";
type TreatKey = "apple" | "peanut" | "salmon";

export function BoxBuilder() {
  const { t } = useI18n();
  const { addCustomBox } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [dogName, setDogName] = useState("MACK");
  const [size, setSize] = useState<SizeKey>("medium");
  const [personality, setPersonality] = useState<PersonalityKey>("park");
  const [treat, setTreat] = useState<TreatKey>("peanut");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [added, setAdded] = useState(false);

  const price = frequency === "monthly" ? 38 : 42;

  const handleNext = () => {
    sound.pop();
    if (step < 3) setStep((s) => (s + 1) as 2 | 3);
  };

  const handlePrev = () => {
    sound.pop();
    if (step > 1) setStep((s) => (s - 1) as 1 | 2);
  };

  const handleFinish = () => {
    const finalName = dogName.trim() || "MACK";
    addCustomBox({
      dogName: finalName,
      dogSize: t.boxBuilder.sizes[size],
      personality: t.boxBuilder.personalities[personality],
      treatChoice: t.boxBuilder.treats[treat],
      frequency,
      price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentDog = dogName.trim() || "MACK";

  return (
    <section className="builder-section" id="box-builder">
      <div className="builder-inner">
        <header className="builder-head">
          <span className="builder-badge">MACK & CO. CLUB</span>
          <p className="kicker">{t.boxBuilder.kicker}</p>
          <h2>{t.boxBuilder.title}</h2>
          <p className="builder-lead">{t.boxBuilder.lead}</p>
        </header>

        {/* Progress Tracker */}
        <div className="builder-progress">
          <div className="progress-line" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              className={`progress-step ${step === s ? "is-current" : step > s ? "is-done" : ""}`}
              onClick={() => {
                setStep(s as 1 | 2 | 3);
                sound.pop();
              }}
            >
              <span className="step-num">{s}</span>
              <span className="step-label">
                {s === 1
                  ? t.boxBuilder.step1
                  : s === 2
                  ? t.boxBuilder.step2
                  : t.boxBuilder.step3}
              </span>
            </button>
          ))}
        </div>

        <div className="builder-grid">
          {/* Active Step Panel */}
          <div className="builder-card step-card">
            {step === 1 && (
              <div className="step-pane">
                <h3 className="pane-title">{t.boxBuilder.step1}</h3>
                <p className="pane-lead">{t.boxBuilder.lead}</p>

                <div className="form-field">
                  <label htmlFor="builderDogName" className="field-label">
                    {t.boxBuilder.namePrompt}
                  </label>
                  <input
                    id="builderDogName"
                    type="text"
                    maxLength={14}
                    value={dogName}
                    placeholder={t.boxBuilder.namePlaceholder}
                    onChange={(e) => setDogName(e.target.value.toUpperCase())}
                    className="atelier-input text-upper"
                  />
                </div>

                <div className="field-group">
                  <span className="field-label">{t.boxBuilder.sizePrompt}</span>
                  <div className="size-cards">
                    {(["small", "medium", "large"] as SizeKey[]).map((sk) => (
                      <button
                        key={sk}
                        type="button"
                        className={`size-card ${size === sk ? "is-selected" : ""}`}
                        onClick={() => {
                          setSize(sk);
                          sound.clink();
                        }}
                      >
                        <span className="size-card-title">{t.boxBuilder.sizes[sk]}</span>
                        <span className="size-card-weight">
                          {sk === "small" ? "< 10kg" : sk === "medium" ? "10–25kg" : "25kg+"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-pane">
                <h3 className="pane-title">{t.boxBuilder.step2}</h3>
                <p className="pane-lead">{t.boxBuilder.personalityPrompt}</p>

                <div className="temperament-list">
                  {(["couch", "park", "chewer"] as PersonalityKey[]).map((pk) => (
                    <button
                      key={pk}
                      type="button"
                      className={`temperament-card ${personality === pk ? "is-selected" : ""}`}
                      onClick={() => {
                        setPersonality(pk);
                        sound.clink();
                      }}
                    >
                      <div className="temperament-icon">
                        {pk === "couch" ? "🛋️" : pk === "park" ? "⚡" : "🦴"}
                      </div>
                      <div className="temperament-body">
                        <h4>{t.boxBuilder.personalities[pk]}</h4>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-pane">
                <h3 className="pane-title">{t.boxBuilder.step3}</h3>
                <p className="pane-lead">{t.boxBuilder.treatPrompt}</p>

                <div className="treats-grid">
                  {(["apple", "peanut", "salmon"] as TreatKey[]).map((tk) => (
                    <button
                      key={tk}
                      type="button"
                      className={`treat-card ${treat === tk ? "is-selected" : ""}`}
                      onClick={() => {
                        setTreat(tk);
                        sound.clink();
                      }}
                    >
                      <div className="treat-icon">
                        {tk === "apple" ? "🍏" : tk === "peanut" ? "🥜" : "🐟"}
                      </div>
                      <h4>{t.boxBuilder.treats[tk]}</h4>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="step-nav">
              {step > 1 ? (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handlePrev}
                >
                  ← {t.product.back}
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  type="button"
                  className="btn btn-caramel"
                  onClick={handleNext}
                >
                  {t.drawer.continue} →
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-caramel"
                  onClick={handleFinish}
                >
                  {added ? t.atelier.addedBtn : t.boxBuilder.addBtn.replace("{name}", currentDog)}
                </button>
              )}
            </div>
          </div>

          {/* Live Dynamic Box Preview */}
          <aside className="builder-preview-card">
            <div className="parcel-mockup">
              <div className="parcel-tag">
                <span className="parcel-stamp">MACK & CO. · BCN</span>
                <h4 className="parcel-dogname">
                  {currentDog}&apos;S BOX
                </h4>
                <p className="parcel-sub">
                  {t.boxBuilder.sizes[size]}
                </p>
              </div>

              <div className="parcel-contents">
                <span className="contents-label">{t.boxBuilder.includesLabel}</span>
                <ul className="contents-list">
                  {t.boxBuilder.itemsIncluded.map((item, idx) => (
                    <li key={idx}>
                      <span className="icon">✓</span>
                      <span>{item.replace("{name}", currentDog)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frequency Selector */}
              <div className="frequency-toggle">
                <button
                  type="button"
                  className={`freq-btn ${frequency === "monthly" ? "is-selected" : ""}`}
                  onClick={() => {
                    setFrequency("monthly");
                    sound.pop();
                  }}
                >
                  <strong>{t.subscribe.monthly}</strong>
                  <span>{t.boxBuilder.freqMonthly}</span>
                </button>
                <button
                  type="button"
                  className={`freq-btn ${frequency === "bimonthly" ? "is-selected" : ""}`}
                  onClick={() => {
                    setFrequency("bimonthly");
                    sound.pop();
                  }}
                >
                  <strong>{t.subscribe.bimonthly}</strong>
                  <span>{t.boxBuilder.freqBimonthly}</span>
                </button>
              </div>

              <div className="parcel-footer">
                <div className="price-row">
                  <span className="total-label">{t.cart.total}</span>
                  <span className="total-val">€{price}</span>
                </div>
                <button
                  type="button"
                  className={`btn btn-caramel btn-block ${added ? "is-added" : ""}`}
                  onClick={handleFinish}
                >
                  {added ? t.atelier.addedBtn : t.boxBuilder.addBtn.replace("{name}", currentDog)}
                </button>
                {added ? (
                  <div className="earn-badge" role="status">
                    <span className="earn-badge-mark">✦</span>
                    <span>Box badge unlocked for {currentDog}</span>
                  </div>
                ) : null}
                <p className="parcel-disclaimer">
                  {t.boxBuilder.skipPauseNote}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
