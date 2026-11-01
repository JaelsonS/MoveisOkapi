import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AboutPage } from "@/pages/AboutPage";
import { CartPage } from "@/pages/CartPage";
import { CategoryPage } from "@/pages/CategoryPage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { ContactPage } from "@/pages/ContactPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { HomePage } from "@/pages/HomePage";
import { InspirationDetailPage } from "@/pages/InspirationDetailPage";
import { InspirationPage } from "@/pages/InspirationPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ProductPage } from "@/pages/ProductPage";
import { QuotePage } from "@/pages/QuotePage";
import { ShopPage } from "@/pages/ShopPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="loja" element={<ShopPage />} />
          <Route path="colecoes" element={<CollectionsPage />} />
          <Route path="inspiracao" element={<InspirationPage />} />
          <Route path="inspiracao/:slug" element={<InspirationDetailPage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="contactos" element={<ContactPage />} />
          <Route path="favoritos" element={<FavoritesPage />} />
          <Route path="carrinho" element={<CartPage />} />
          <Route path="orcamento" element={<QuotePage />} />
          <Route path="privacidade" element={<PrivacyPage />} />
          <Route path="categoria/:slug" element={<CategoryPage />} />
          <Route path="produto/:slug" element={<ProductPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
