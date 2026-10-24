export type Category = "accessories" | "treats" | "toys";
export type Frequency = "monthly" | "bimonthly";
export type Copy = { en: string; es: string };

export function img(photo: string, w = 1400) {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=80`;
}

export const photos = {
  pack: "photo-1548199973-03cce0bbc87b",
  goldenStick: "photo-1587300003388-59208cc962cb",
  pug: "photo-1537151608828-ea2b11777ee8",
  goldenSit: "photo-1552053831-71594a27632d",
  cream: "photo-1583511655857-d19b40a7a54e",
  pugUp: "photo-1561037404-61cd46aa615b",
  beach: "photo-1530281700549-e82d7fc23fba",
  lab: "photo-1543466835-00a7907e9de1",
  frenchie: "photo-1583337130417-3346a1be7dee",
} as const;

export type Product = {
  id: string;
  category: Category;
  price: number;
  image: string;
  sizes?: string[];
  name: Copy;
  tagline: Copy;
  description: Copy;
  material?: Copy;
};

export const products: Product[] = [
  {
    id: "weekend-lead",
    category: "accessories",
    price: 48,
    image: img(photos.beach),
    sizes: ["S", "M", "L"],
    name: { en: "The Weekend Lead", es: "La correa Weekend" },
    tagline: { en: "Leather, brass, nowhere to be.", es: "Cuero, latón, sin prisa." },
    description: {
      en: "A buttery vegetable-tanned lead with a brass snap that sounds like Saturday. Soft in the hand, sturdy on the trail, handsome on the café chair.",
      es: "Correa de cuero vegetal con broche de latón que suena a sábado. Suave en la mano, firme en el paseo, elegante en la silla del café.",
    },
    material: { en: "Vegetable-tanned leather, solid brass", es: "Cuero vegetal, latón macizo" },
  },
  {
    id: "sunday-bowl",
    category: "accessories",
    price: 36,
    image: img(photos.goldenSit),
    sizes: ["S", "M"],
    name: { en: "Sunday Bowl", es: "Bol Sunday" },
    tagline: { en: "Heavy ceramic. Slow breakfasts.", es: "Cerámica pesada. Desayunos lentos." },
    description: {
      en: "A glazed stoneware bowl that stays put when dinner gets dramatic. Wide rim, cream glaze, the kind of object you leave on the kitchen floor on purpose.",
      es: "Bol de gres esmaltado que no se mueve cuando la cena se pone dramática. Borde ancho, esmalte crema: de esos objetos que dejas en el suelo a propósito.",
    },
    material: { en: "Speckled stoneware, food-safe glaze", es: "Gres moteado, esmalte apto para alimentos" },
  },
  {
    id: "neighborhood-bandana",
    category: "accessories",
    price: 18,
    image: img(photos.frenchie),
    sizes: ["S", "M", "L"],
    name: { en: "The Neighborhood Bandana", es: "Pañuelo del barrio" },
    tagline: { en: "Sage cotton. Local legend.", es: "Algodón sage. Leyenda local." },
    description: {
      en: "A washed cotton triangle that makes every errand look intentional. Ties at the neck, survives the park, photographs like a charm.",
      es: "Un triángulo de algodón lavado que hace que cada recado se vea con intención. Se anuda al cuello, sobrevive al parque y sale bien en fotos.",
    },
    material: { en: "Washed cotton twill", es: "Sarga de algodón lavado" },
  },
  {
    id: "trail-collar",
    category: "accessories",
    price: 42,
    image: img(photos.lab),
    sizes: ["S", "M", "L"],
    name: { en: "Trail Collar", es: "Collar Trail" },
    tagline: { en: "Caramel hide. Nameplate ready.", es: "Cuero caramelo. Listo para chapita." },
    description: {
      en: "A slim collar with a brass D-ring and enough dignity for the vet and the vineyard. Breaks in like a favourite belt.",
      es: "Collar fino con anilla en D de latón y dignidad suficiente para el vet y el viñedo. Se amolda como un cinturón favorito.",
    },
    material: { en: "Vegetable-tanned leather, brass hardware", es: "Cuero vegetal, herrajes de latón" },
  },
  {
    id: "biscuit-tin",
    category: "treats",
    price: 22,
    image: img(photos.goldenStick),
    name: { en: "Biscuit Tin", es: "Lata de galletas" },
    tagline: { en: "Oat, apple, a little drama.", es: "Avena, manzana y un poco de drama." },
    description: {
      en: "A refillable tin of oat-and-apple biscuits. Crunchy enough to feel like a ceremony. Baked in small batches, packed like a gift.",
      es: "Una lata recargable de galletas de avena y manzana. Crujientes como una ceremonia. Hornadas pequeñas, empaque de regalo.",
    },
    material: { en: "Oat flour, apple, coconut oil — 200g", es: "Harina de avena, manzana, aceite de coco — 200g" },
  },
  {
    id: "peanut-clouds",
    category: "treats",
    price: 14,
    image: img(photos.pug),
    name: { en: "Peanut Clouds", es: "Nubes de cacahuete" },
    tagline: { en: "Soft training bites.", es: "Bocados blandos de entrenamiento." },
    description: {
      en: "Airy peanut butter morsels for sit, stay, and theatrical begging. Break apart with two fingers. Gone in a blink.",
      es: "Bocados aireados de crema de cacahuete para el sit, el stay y la súplica teatral. Se parten con dos dedos. Duran un suspiro.",
    },
    material: { en: "Peanut butter, chickpea flour — 120g", es: "Crema de cacahuete, harina de garbanzo — 120g" },
  },
  {
    id: "sage-garden-chews",
    category: "treats",
    price: 16,
    image: img(photos.cream),
    name: { en: "Sage Garden Chews", es: "Masticables Sage Garden" },
    tagline: { en: "Herbal, long, quietly obsessed.", es: "Herbales, largos, obsesión silenciosa." },
    description: {
      en: "Slow chews scented with garden sage and parsley. For rainy afternoons and the twenty minutes before guests arrive.",
      es: "Masticables lentos con salvia y perejil. Para tardes de lluvia y los veinte minutos antes de que lleguen las visitas.",
    },
    material: { en: "Sweet potato, sage, parsley — 6 pieces", es: "Boniato, salvia, perejil — 6 piezas" },
  },
  {
    id: "tug-rope",
    category: "toys",
    price: 19,
    image: img(photos.pack, 1400),
    name: { en: "The Tug Rope", es: "La cuerda Tug" },
    tagline: { en: "Cotton, knots, honest fun.", es: "Algodón, nudos, diversión honesta." },
    description: {
      en: "A thick cotton rope with two fat knots and zero plastic. Built for tug, toss, and the victory lap around the sofa.",
      es: "Cuerda gruesa de algodón con dos nudos gordos y cero plástico. Hecha para tirar, lanzar y la vuelta de victoria por el sofá.",
    },
    material: { en: "Organic cotton rope", es: "Cuerda de algodón orgánico" },
  },
  {
    id: "plush-moose",
    category: "toys",
    price: 28,
    image: img(photos.pugUp),
    name: { en: "Plush Moose", es: "Alce de peluche" },
    tagline: { en: "Squeaks once. Then again.", es: "Chilla una vez. Y otra." },
    description: {
      en: "A caramel-and-cream moose with a single polite squeaker. Soft enough for naps, sturdy enough for the zoomies.",
      es: "Un alce crema y caramelo con un squeaker educado. Suave para la siesta, firme para los zoomies.",
    },
    material: { en: "Recycled plush, hidden squeaker", es: "Peluche reciclado, squeaker oculto" },
  },
  {
    id: "squeak-club",
    category: "toys",
    price: 12,
    image: img(photos.goldenStick, 1000),
    name: { en: "Squeak Club", es: "Club del squeak" },
    tagline: { en: "The tennis ball, but nicer.", es: "La pelota de tenis, pero más maja." },
    description: {
      en: "Natural rubber, sage felt, and the exact bounce that makes the park feel like a stadium. Floats. Survives puddles.",
      es: "Caucho natural, fieltro sage y el bote exacto que convierte el parque en un estadio. Flota. Sobrevive a los charcos.",
    },
    material: { en: "Natural rubber, wool felt", es: "Caucho natural, fieltro de lana" },
  },
];

export type Plan = {
  id: string;
  priceMonthly: number;
  priceBimonthly: number;
  image: string;
  name: Copy;
  tagline: Copy;
  description: Copy;
  includes: Copy[];
};

export const plans: Plan[] = [
  {
    id: "snack-box",
    priceMonthly: 29,
    priceBimonthly: 52,
    image: img(photos.goldenStick, 1200),
    name: { en: "The Snack Box", es: "La caja Snack" },
    tagline: { en: "Biscuits, chews, a little chaos.", es: "Galletas, masticables y un poco de caos." },
    description: {
      en: "A rotating tin of treats plus a surprise chew. For dogs with opinions and humans who like a ritual.",
      es: "Una lata rotativa de snacks más un masticable sorpresa. Para perros con opiniones y humanos a los que les gusta un ritual.",
    },
    includes: [
      { en: "Biscuit Tin refill", es: "Recarga de la lata de galletas" },
      { en: "One slow chew", es: "Un masticable lento" },
      { en: "A tiny note from Mack", es: "Una notita de Mack" },
    ],
  },
  {
    id: "play-box",
    priceMonthly: 39,
    priceBimonthly: 70,
    image: img(photos.pugUp, 1200),
    name: { en: "The Play Box", es: "La caja Play" },
    tagline: { en: "A toy, a treat, a victory.", es: "Un juguete, un snack, una victoria." },
    description: {
      en: "One new toy each drop, plus training bites. Built for zoomies and the twenty-minute window before dinner.",
      es: "Un juguete nuevo en cada envío, más bocados de entrenamiento. Para zoomies y los veinte minutos antes de cenar.",
    },
    includes: [
      { en: "Seasonal toy", es: "Juguete de temporada" },
      { en: "Peanut Clouds pouch", es: "Bolsa de Nubes de cacahuete" },
      { en: "Play card with a tiny game", es: "Tarjeta con un juego minúsculo" },
    ],
  },
  {
    id: "full-kit",
    priceMonthly: 49,
    priceBimonthly: 88,
    image: img(photos.pack, 1200),
    name: { en: "The Full Kit", es: "El kit completo" },
    tagline: { en: "Treats, toy, a useful extra.", es: "Snacks, juguete y un extra útil." },
    description: {
      en: "The whole house: snacks, a toy, and a small accessory that actually gets used. Our most-loved drop.",
      es: "Toda la casa: snacks, un juguete y un accesorio pequeño que de verdad se usa. Nuestro envío más querido.",
    },
    includes: [
      { en: "Treat trio", es: "Trío de snacks" },
      { en: "Toy of the month", es: "Juguete del mes" },
      { en: "Mini accessory (bandana or bowl mat)", es: "Mini accesorio (pañuelo o mantel)" },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getPlan(id: string) {
  return plans.find((p) => p.id === id);
}

export function planPrice(plan: Plan, frequency: Frequency) {
  return frequency === "monthly" ? plan.priceMonthly : plan.priceBimonthly;
}

export function money(n: number, lang: "en" | "es") {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}
