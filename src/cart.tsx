import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sound } from "./audio";
import {
  getPlan,
  getProduct,
  planPrice,
  type Frequency,
} from "./data";

const STORAGE = "mack-cart";

export type ProductLine = {
  kind: "product";
  id: string;
  productId: string;
  qty: number;
  size?: string;
};

export type SubLine = {
  kind: "subscription";
  id: string;
  planId: string;
  frequency: Frequency;
  qty: number;
};

export type CustomCollarLine = {
  kind: "custom-collar";
  id: string;
  dogName: string;
  phone: string;
  icon: string;
  leatherId: string;
  leatherName: string;
  leatherColor: string;
  tagShape: string;
  hardware: string;
  size: string;
  price: number;
  qty: number;
};

export type CustomBoxLine = {
  kind: "custom-box";
  id: string;
  dogName: string;
  dogSize: string;
  personality: string;
  treatChoice: string;
  frequency: Frequency;
  price: number;
  qty: number;
};

export type CartLine = ProductLine | SubLine | CustomCollarLine | CustomBoxLine;

type CartValue = {
  lines: CartLine[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addProduct: (productId: string, size?: string) => void;
  addSubscription: (planId: string, frequency: Frequency) => void;
  addCustomCollar: (item: Omit<CustomCollarLine, "kind" | "id" | "qty">) => void;
  addCustomBox: (item: Omit<CustomBoxLine, "kind" | "id" | "qty">) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  freeTreatThreshold: number;
  hasFreeTreat: boolean;
  amountNeededForFreeTreat: number;
};

const CartContext = createContext<CartValue | null>(null);

function productKey(productId: string, size?: string) {
  return `product:${productId}:${size ?? "std"}`;
}

function subKey(planId: string, frequency: Frequency) {
  return `sub:${planId}:${frequency}`;
}

function customCollarKey(item: Omit<CustomCollarLine, "kind" | "id" | "qty">) {
  return `collar:${item.dogName.trim().toUpperCase()}:${item.leatherId}:${item.tagShape}:${item.hardware}:${item.size}`;
}

function customBoxKey(item: Omit<CustomBoxLine, "kind" | "id" | "qty">) {
  return `box:${item.dogName.trim().toUpperCase()}:${item.frequency}`;
}

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => {
      if (l.kind === "product" && typeof l.productId === "string") return true;
      if (l.kind === "subscription" && typeof l.planId === "string") return true;
      if (l.kind === "custom-collar" && typeof l.dogName === "string") return true;
      if (l.kind === "custom-box" && typeof l.dogName === "string") return true;
      return false;
    });
  } catch {
    return [];
  }
}

export function lineTotal(line: CartLine): number {
  if (line.kind === "product") {
    const p = getProduct(line.productId);
    return p ? p.price * line.qty : 0;
  }
  if (line.kind === "subscription") {
    const plan = getPlan(line.planId);
    return plan ? planPrice(plan, line.frequency) * line.qty : 0;
  }
  if (line.kind === "custom-collar" || line.kind === "custom-box") {
    return line.price * line.qty;
  }
  return 0;
}

const FREE_TREAT_THRESHOLD = 60; // 60€ triggers free Biscuit Tin

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(lines));
  }, [lines]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
    sound.pop();
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    sound.pop();
  };
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
    sound.pop();
  };

  const value = useMemo<CartValue>(() => {
    const addProduct = (productId: string, size?: string) => {
      const id = productKey(productId, size);
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found && found.kind === "product") {
          return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
        }
        const next: ProductLine = { kind: "product", id, productId, qty: 1, size };
        return [...prev, next];
      });
      sound.add();
      setIsDrawerOpen(true);
    };

    const addSubscription = (planId: string, frequency: Frequency) => {
      const id = subKey(planId, frequency);
      setLines((prev) => {
        const withoutSubs = prev.filter((l) => l.kind !== "subscription");
        const existing = prev.find((l) => l.id === id);
        const qty = existing && existing.kind === "subscription" ? existing.qty : 1;
        const next: SubLine = { kind: "subscription", id, planId, frequency, qty };
        return [...withoutSubs, next];
      });
      sound.add();
      setIsDrawerOpen(true);
    };

    const addCustomCollar = (item: Omit<CustomCollarLine, "kind" | "id" | "qty">) => {
      const id = customCollarKey(item);
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found && found.kind === "custom-collar") {
          return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
        }
        const next: CustomCollarLine = { kind: "custom-collar", id, qty: 1, ...item };
        return [...prev, next];
      });
      sound.clink();
      sound.add();
      setIsDrawerOpen(true);
    };

    const addCustomBox = (item: Omit<CustomBoxLine, "kind" | "id" | "qty">) => {
      const id = customBoxKey(item);
      setLines((prev) => {
        const withoutCustomBoxes = prev.filter((l) => l.kind !== "custom-box");
        const next: CustomBoxLine = { kind: "custom-box", id, qty: 1, ...item };
        return [...withoutCustomBoxes, next];
      });
      sound.celebrate();
      setIsDrawerOpen(true);
    };

    const setQty = (id: string, qty: number) => {
      setLines((prev) =>
        prev
          .map((l) => (l.id === id ? { ...l, qty } : l))
          .filter((l) => l.qty > 0),
      );
      sound.pop();
    };

    const remove = (id: string) => {
      setLines((prev) => prev.filter((l) => l.id !== id));
      sound.pop();
    };

    const clear = () => {
      setLines([]);
    };

    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + lineTotal(l), 0);
    const hasFreeTreat = subtotal >= FREE_TREAT_THRESHOLD;
    const amountNeededForFreeTreat = Math.max(0, FREE_TREAT_THRESHOLD - subtotal);

    return {
      lines,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addProduct,
      addSubscription,
      addCustomCollar,
      addCustomBox,
      setQty,
      remove,
      clear,
      count,
      subtotal,
      freeTreatThreshold: FREE_TREAT_THRESHOLD,
      hasFreeTreat,
      amountNeededForFreeTreat,
    };
  }, [lines, isDrawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
