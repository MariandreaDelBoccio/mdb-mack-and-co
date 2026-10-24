import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart";
import { Layout } from "./components/Layout";
import { I18nProvider } from "./i18n";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProductPage } from "./pages/Product";
import { Shop } from "./pages/Shop";
import { Subscribe } from "./pages/Subscribe";

export function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </I18nProvider>
  );
}
