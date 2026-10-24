import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

const en = {
  nav: {
    shop: "Shop",
    atelier: "Collar Studio",
    journal: "Walk Journal",
    subscribe: "Box Builder",
    cart: "Basket",
    home: "Home",
    menu: "Menu",
    close: "Close",
  },
  sound: {
    toggle: "Sound effects",
    on: "Sound: ON",
    off: "Sound: OFF",
  },
  lang: { en: "EN", es: "ES" },
  brand: {
    name: "MACK & CO.",
    tagline: "cute things for good dogs",
    kicker: "Pet goods, Barcelona",
  },
  home: {
    heroLead:
      "Leads, bowls, biscuits and toys with a little character — for dogs who already run the house.",
    shopCta: "Shop the house",
    subCta: "Build a Box",
    atelierCta: "Design a Collar",
    featured: "In the window",
    featuredLead: "Things that look as good on the hook as they do on a walk.",
    catsTitle: "What we make",
    cats: {
      accessories: { name: "Accessories", text: "Leather, ceramic, cotton — the daily kit." },
      treats: { name: "Treats", text: "Biscuit tins and quiet obsession chews." },
      toys: { name: "Toys", text: "Rope, plush, and a nicer tennis ball." },
    },
    boxTitle: "A box that shows up.",
    boxLead:
      "Snacks, a toy, sometimes a useful extra. Monthly or every two months. Skip or pause whenever the pantry is full.",
    boxCta: "Launch Box Builder",
    note: "Photographed with real good dogs. Packed like a gift.",
  },
  atelier: {
    badge: "Interactive Bespoke Studio",
    kicker: "Crafted to Order",
    title: "The Brass Tag & Collar Atelier",
    lead: "Type your dog's name and emergency phone. Watch the solid brass medal chisel and reflect light in real time before your eyes.",
    dogNameLabel: "Dog's Name",
    dogNamePlaceholder: "e.g. MACK",
    phoneLabel: "Emergency Phone / Microchip",
    phonePlaceholder: "+34 612 345 678",
    iconLabel: "Engraved Motif",
    leatherLabel: "Vegetable-Tanned Leather",
    tagShapeLabel: "Medal Silhouette",
    hardwareLabel: "Hardware Finish",
    sizeLabel: "Collar Size",
    shapes: {
      circle: "Classic Coin",
      bone: "Golden Bone",
      hexagon: "Vintage Hex",
      arch: "Atelier Arch",
    },
    leathers: {
      caramel: "Caramel Tan",
      sage: "Forest Olive",
      espresso: "Espresso Noir",
      terracotta: "Dusty Terracotta",
    },
    hardwares: {
      brass: "Antique Brass",
      silver: "Brushed Silver",
      rosegold: "Warm Rose Gold",
    },
    sizes: {
      S: "Small (24–32 cm) · Whippet, Pug, Dachshund",
      M: "Medium (32–42 cm) · Beagle, Frenchie, Border Collie",
      L: "Large (42–54 cm) · Golden, Labrador, Boxer",
    },
    addBtn: "Add Bespoke Collar to Basket — €54",
    addedBtn: "✓ Added to Basket!",
    hint: "Interactive 3D medal · Move cursor to rotate lighting",
    heirloomNote: "Hand-finished in Barcelona with vegetable-tanned Italian leather and solid marine-grade brass.",
  },
  walkJournal: {
    kicker: "Field Notes & Editorial",
    title: "The Morning Walk in Barcelona",
    lead: "Real dogs, morning light on Mediterranean cobblestones. Tap any pulsing brass pin to inspect and quick-add what they're wearing.",
    spots: [
      {
        id: "lead-spot",
        label: "The Weekend Lead in Caramel",
        price: "€48",
        detail: "Supple vegetable leather with solid brass trigger snap.",
      },
      {
        id: "collar-spot",
        label: "Bespoke Engraved Collar",
        price: "€54",
        detail: "Custom stamped with your dog's name & emergency digits.",
      },
      {
        id: "tin-spot",
        label: "Oat & Apple Biscuit Tin",
        price: "€22",
        detail: "Crunchy reward ceremony in a keepsake tin.",
      },
    ],
    quickAdd: "Quick Add to Basket",
  },
  boxBuilder: {
    kicker: "The Good Dog Box Builder",
    title: "Build Your Dog's Recurring Feast",
    lead: "Answer 3 quick questions. We'll tailor a monthly drop of oven-fresh treats, durable chews, and surprise toys.",
    step1: "1. The Dog",
    step2: "2. The Temperament",
    step3: "3. The Cravings",
    namePrompt: "What is your best friend's name?",
    namePlaceholder: "Enter dog's name...",
    sizePrompt: "Size & weight class:",
    sizes: {
      small: "Small (under 10 kg)",
      medium: "Medium (10–25 kg)",
      large: "Large (25+ kg)",
    },
    personalityPrompt: "What is their daily mission?",
    personalities: {
      couch: "The Couch Connoisseur (loves quiet naps & soft biscuits)",
      park: "The Park Zoomer (high energy, ball obsessed)",
      chewer: "The Innocent Destroyer (needs long-lasting natural chews)",
    },
    treatPrompt: "What flavor gets the tail wagging fastest?",
    treats: {
      apple: "Crisp Oat & Apple Biscuits",
      peanut: "Creamy Peanut Butter Clouds",
      salmon: "Wild Ocean Salmon Crunchies",
    },
    frequencyPrompt: "Delivery cadence:",
    freqMonthly: "Monthly Drop (€38 / box)",
    freqBimonthly: "Every 2 Months (€42 / box)",
    summaryTitle: "Bespoke Box Curated for",
    includesLabel: "Every box includes:",
    itemsIncluded: [
      "1x Freshly baked batch of treats matched to their taste",
      "2x Long-lasting botanical chews (safe & digestible)",
      "1x Artisan play toy crafted from natural rubber or rope",
      "Personalized welcome card for {name}",
    ],
    addBtn: "Add {name}'s Box to Basket",
    skipPauseNote: "Pause, skip, or cancel anytime with one click in your account.",
  },
  shop: {
    kicker: "The shop",
    title: "Everything for the walk home.",
    lead: "Accessories, treats, toys — pick a shelf or take the whole house.",
    all: "All",
    accessories: "Accessories",
    treats: "Treats",
    toys: "Toys",
    emptyTitle: "Nothing on this shelf.",
    emptyText: "Try another type — the biscuit tin is always in a mood.",
    emptyCta: "See everything",
    from: "From",
  },
  product: {
    add: "Add to basket",
    added: "In the basket",
    size: "Size",
    material: "Material",
    back: "Back to shop",
    related: "Along the same walk",
  },
  subscribe: {
    kicker: "The box",
    title: "A ritual for good dogs.",
    lead: "Choose a plan and how often it lands. You can skip a drop or pause the whole thing — this is a demo, so the buttons are honest about it.",
    monthly: "Every month",
    bimonthly: "Every 2 months",
    includes: "Inside",
    add: "Add this box",
    added: "Box in the basket",
    skipTitle: "Skip a drop",
    skipText:
      "Too many biscuits already? Skip the next box from your account. We’ll hold the recipe and send the following one.",
    pauseTitle: "Pause anytime",
    pauseText:
      "Going away, or the toy mountain is tall enough. Pause for a month or two. No guilt, no sneaky restart.",
    note: "Demo only — no real charges. The cart treats a plan as a subscription line.",
  },
  drawer: {
    title: "Your Dog's Basket",
    freeTreatKicker: "Complimentary Treat Meter",
    freeTreatAway: "Add {amount} more for a Free Biscuit Tin (€22 value) 🦴",
    freeTreatUnlocked: "🎉 Congratulations! Free Biscuit Tin added to your shipment!",
    customCollarTag: "Custom Hand-Engraved Collar",
    customBoxTag: "Tailored Subscription Box",
    upsellTitle: "Add a little treat to this walk:",
    quickAdd: "+ Add",
    viewCart: "Proceed to Checkout",
    continue: "Keep Browsing",
  },
  cart: {
    kicker: "Basket",
    title: "What’s coming home.",
    emptyTitle: "The basket is empty.",
    emptyText: "A lead, a custom collar, or a box builder — start wherever the tail wags.",
    emptyCta: "Go to the shop",
    qty: "Qty",
    size: "Size",
    remove: "Remove",
    sub: "Subscription",
    frequency: {
      monthly: "Ships every month",
      bimonthly: "Ships every 2 months",
    },
    subtotal: "Subtotal",
    shipping: "Shipping",
    shippingNote: "On us (demo)",
    total: "Total",
    checkout: "Place the order",
    name: "Name",
    email: "Email",
    address: "Address",
    city: "City",
    confirmTitle: "It’s packed. (Almost.)",
    confirmText:
      "This is a portfolio demo — no payment was taken. Your basket is cleared so you can play again.",
    confirmCta: "Back to the shop",
    oneTime: "One-time",
  },
  notFound: {
    title: "This dog left the park.",
    text: "The page isn’t here. The biscuit tin still is.",
    cta: "Go home",
    shop: "Shop instead",
  },
  productMissing: {
    title: "We don’t make that (yet).",
    text: "That product wandered off. Browse the shop — the Weekend Lead never does.",
    cta: "Back to shop",
  },
  footer: {
    blurb: "Accessories, treats, toys — and a box that shows up.",
    demo: "A demo by m.d.b.",
    rights: "Fictional brand. Cute on purpose.",
  },
};

const es: typeof en = {
  nav: {
    shop: "Tienda",
    atelier: "Atelier Collares",
    journal: "Diario de Paseo",
    subscribe: "Diseñar Caja",
    cart: "Cesta",
    home: "Inicio",
    menu: "Menú",
    close: "Cerrar",
  },
  sound: {
    toggle: "Efectos sonoros",
    on: "Sonido: SÍ",
    off: "Sonido: NO",
  },
  lang: { en: "EN", es: "ES" },
  brand: {
    name: "MACK & CO.",
    tagline: "cosas bonitas para perros buenos",
    kicker: "Cosas para perros, Barcelona",
  },
  home: {
    heroLead:
      "Correas, boles, galletas y juguetes con carácter — para perros que ya mandan en casa.",
    shopCta: "Ver la tienda",
    subCta: "Diseñar Caja",
    atelierCta: "Personalizar Collar",
    featured: "En el escaparate",
    featuredLead: "Cosas que quedan tan bien en el gancho como en el paseo.",
    catsTitle: "Qué hacemos",
    cats: {
      accessories: { name: "Accesorios", text: "Cuero, cerámica, algodón — el kit de cada día." },
      treats: { name: "Snacks", text: "Latas de galletas y masticables de obsesión tranquila." },
      toys: { name: "Juguetes", text: "Cuerda, peluche y una pelota de tenis más maja." },
    },
    boxTitle: "Una caja que llega.",
    boxLead:
      "Snacks, un juguete, a veces un extra útil. Cada mes o cada dos. Salta un envío o pausa cuando la despensa esté llena.",
    boxCta: "Abrir Diseñador de Cajas",
    note: "Fotografiado con perros de verdad. Empaquetado como un regalo.",
  },
  atelier: {
    badge: "Estudio Interactivo a Medida",
    kicker: "Artesanía Personalizada",
    title: "El Atelier de Collares y Medallas de Latón",
    lead: "Escribe el nombre de tu perro y teléfono. Mira cómo la medalla de latón macizo se graba y refleja la luz en tiempo real frente a ti.",
    dogNameLabel: "Nombre de tu perro",
    dogNamePlaceholder: "ej. MACK o BRUNO",
    phoneLabel: "Teléfono de urgencia / Microchip",
    phonePlaceholder: "+34 612 345 678",
    iconLabel: "Motivo Cincelado",
    leatherLabel: "Tono del Cuero Vegetal",
    tagShapeLabel: "Silueta de la Medalla",
    hardwareLabel: "Acabado Metálico",
    sizeLabel: "Talla de Cuello",
    shapes: {
      circle: "Moneda Clásica",
      bone: "Hueso Dorado",
      hexagon: "Hexágono Vintage",
      arch: "Arco Atelier",
    },
    leathers: {
      caramel: "Caramelo Natural",
      sage: "Oliva Bosque",
      espresso: "Espresso Noir",
      terracotta: "Terracota Suave",
    },
    hardwares: {
      brass: "Latón Envejecido",
      silver: "Plata Cepillada",
      rosegold: "Oro Rosa Cálido",
    },
    sizes: {
      S: "Pequeño (24–32 cm) · Whippet, Teckel, Carlino",
      M: "Medio (32–42 cm) · Beagle, Bulldog Francés, Border Collie",
      L: "Grande (42–54 cm) · Golden Retriever, Labrador, Bóxer",
    },
    addBtn: "Añadir Collar a Medida — 54 €",
    addedBtn: "✓ ¡Añadido a la cesta!",
    hint: "Medalla 3D interactiva · Mueve el ratón para girar la luz",
    heirloomNote: "Hecho a mano en Barcelona con cuero vegetal italiano y latón macizo resistente al agua.",
  },
  walkJournal: {
    kicker: "Cuaderno de Campo & Editorial",
    title: "El Paseo Matutino en Barcelona",
    lead: "Perros reales, luz dorada sobre adoquines mediterráneos. Toca cualquier pin pulsante de latón para inspeccionar y comprar lo que llevan puesto.",
    spots: [
      {
        id: "lead-spot",
        label: "Correa Weekend en Cuero Caramelo",
        price: "48 €",
        detail: "Cuero vegetal suave con mosquetón de latón macizo.",
      },
      {
        id: "collar-spot",
        label: "Collar Grabado a Medida",
        price: "54 €",
        detail: "Cincelado con el nombre de tu perro y teléfono.",
      },
      {
        id: "tin-spot",
        label: "Lata de Galletas de Avena y Manzana",
        price: "22 €",
        detail: "Crujientes como una ceremonia en lata coleccionable.",
      },
    ],
    quickAdd: "Añadir a la Cesta",
  },
  boxBuilder: {
    kicker: "Diseñador de Cajas a Medida",
    title: "Crea el Festín Recurrente de tu Perro",
    lead: "Responde 3 preguntas rápidas. Adaptaremos un envío mensual con galletas recién horneadas, masticables seguros y juguetes sorpresa.",
    step1: "1. El Protagonista",
    step2: "2. Su Carácter",
    step3: "3. Sus Antojos",
    namePrompt: "¿Cómo se llama tu compañero de vida?",
    namePlaceholder: "Escribe el nombre...",
    sizePrompt: "Tamaño y complexión:",
    sizes: {
      small: "Pequeño (menos de 10 kg)",
      medium: "Mediano (10–25 kg)",
      large: "Grande (más de 25 kg)",
    },
    personalityPrompt: "¿Cuál es su misión diaria en casa?",
    personalities: {
      couch: "El Catador de Sofás (ama las siestas y galletas tiernas)",
      park: "El Velocista del Parque (energía pura, loco por la pelota)",
      chewer: "El Destructor Inocente (necesita mordedores naturales resistentes)",
    },
    treatPrompt: "¿Qué sabor hace que mueva la cola sin frenos?",
    treats: {
      apple: "Galletas Crujientes de Avena y Manzana",
      peanut: "Nubes Aireadas de Crema de Cacahuete",
      salmon: "Bocaditos de Salmón del Océano",
    },
    frequencyPrompt: "Frecuencia de envío:",
    freqMonthly: "Envío Mensual (38 € / caja)",
    freqBimonthly: "Cada 2 Meses (42 € / caja)",
    summaryTitle: "Caja Personalizada para",
    includesLabel: "Cada entrega incluye:",
    itemsIncluded: [
      "1x Lote de galletas frescas adaptadas a su gusto",
      "2x Masticables botánicos duraderos (seguros y digestivos)",
      "1x Juguete artesanal de caucho natural o cuerda",
      "Carta de bienvenida personalizada para {name}",
    ],
    addBtn: "Añadir Caja de {name} a la Cesta",
    skipPauseNote: "Pausa, salta un envío o cancela cuando quieras con un solo clic en tu cuenta.",
  },
  shop: {
    kicker: "La tienda",
    title: "Todo para el camino a casa.",
    lead: "Accesorios, snacks, juguetes — elige un estante o llévate toda la casa.",
    all: "Todo",
    accessories: "Accesorios",
    treats: "Snacks",
    toys: "Juguetes",
    emptyTitle: "Nada en este estante.",
    emptyText: "Prueba otro tipo — la lata de galletas siempre está de humor.",
    emptyCta: "Verlo todo",
    from: "Desde",
  },
  product: {
    add: "Añadir a la cesta",
    added: "En la cesta",
    size: "Talla",
    material: "Material",
    back: "Volver a la tienda",
    related: "En el mismo paseo",
  },
  subscribe: {
    kicker: "La caja",
    title: "Un ritual para perros buenos.",
    lead: "Elige un plan y cada cuánto llega. Puedes saltarte un envío o pausar — es una demo, así que los botones lo dicen claro.",
    monthly: "Cada mes",
    bimonthly: "Cada 2 meses",
    includes: "Dentro",
    add: "Añadir esta caja",
    added: "Caja en la cesta",
    skipTitle: "Saltar un envío",
    skipText:
      "¿Demasiadas galletas ya? Salta la siguiente caja desde tu cuenta. Guardamos la receta y mandamos la de después.",
    pauseTitle: "Pausa cuando quieras",
    pauseText:
      "Te vas, o la montaña de juguetes ya es suficientemente alta. Pausa uno o dos meses. Sin culpa, sin reinicio tramposo.",
    note: "Solo demo — sin cobros reales. El carrito trata un plan como una línea de suscripción.",
  },
  drawer: {
    title: "La Cesta de tu Perro",
    freeTreatKicker: "Barra de Regalo de Bienvenida",
    freeTreatAway: "¡Añade {amount} más para recibir una Lata de Galletas GRATIS (valor 22 €)! 🦴",
    freeTreatUnlocked: "🎉 ¡Felicidades! Lata de Galletas de regalo añadida a tu envío.",
    customCollarTag: "Collar Grabado a Mano",
    customBoxTag: "Caja de Suscripción a Medida",
    upsellTitle: "Añade un capricho para el paseo:",
    quickAdd: "+ Añadir",
    viewCart: "Tramitar Pedido",
    continue: "Seguir Mirando",
  },
  cart: {
    kicker: "Cesta",
    title: "Lo que se viene a casa.",
    emptyTitle: "La cesta está vacía.",
    emptyText: "Una correa, un collar grabado o una caja a medida — empieza donde menee el rabo.",
    emptyCta: "Ir a la tienda",
    qty: "Ud.",
    size: "Talla",
    remove: "Quitar",
    sub: "Suscripción",
    frequency: {
      monthly: "Envío cada mes",
      bimonthly: "Envío cada 2 meses",
    },
    subtotal: "Subtotal",
    shipping: "Envío",
    shippingNote: "Por nuestra cuenta (demo)",
    total: "Total",
    checkout: "Hacer el pedido",
    name: "Nombre",
    email: "Correo",
    address: "Dirección",
    city: "Ciudad",
    confirmTitle: "Está empaquetado. (Casi.)",
    confirmText:
      "Esto es una demo de portfolio — no se ha cobrado nada. Vaciamos la cesta para que puedas volver a jugar.",
    confirmCta: "Volver a la tienda",
    oneTime: "Pago único",
  },
  notFound: {
    title: "Este perro se fue del parque.",
    text: "La página no está. La lata de galletas sí.",
    cta: "Ir a inicio",
    shop: "Mejor la tienda",
  },
  productMissing: {
    title: "Eso (aún) no lo hacemos.",
    text: "Ese producto se escapó. Mira la tienda — la correa Weekend nunca lo hace.",
    cta: "Volver a la tienda",
  },
  footer: {
    blurb: "Accesorios, snacks, juguetes — y una caja que llega.",
    demo: "A demo by m.d.b.",
    rights: "Marca ficticia. Cute a propósito.",
  },
};

const dicts = { en, es };

type I18nValue = {
  lang: Lang;
  t: typeof en;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function readLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("mack-lang");
  if (saved === "en" || saved === "es") return saved;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = (next: Lang) => {
    window.localStorage.setItem("mack-lang", next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: dicts[lang], setLang }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function copy(obj: { en: string; es: string }, lang: Lang): string {
  return obj[lang] || obj.en;
}
