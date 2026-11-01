import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

type ShopState = {
  favorites: string[];
  cart: CartItem[];
  revealedPrices: string[];
  searchOpen: boolean;
  toggleFavorite: (slug: string) => void;
  addToCart: (slug: string, quantity?: number, variant?: string) => void;
  removeFromCart: (slug: string, variant?: string) => void;
  setQty: (slug: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  revealPrice: (slug: string) => void;
  setSearchOpen: (open: boolean) => void;
};

function sameLine(a: CartItem, slug: string, variant?: string) {
  return a.slug === slug && (a.variant ?? "") === (variant ?? "");
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      favorites: [],
      cart: [],
      revealedPrices: [],
      searchOpen: false,

      toggleFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.includes(slug)
            ? state.favorites.filter((s) => s !== slug)
            : [...state.favorites, slug],
        })),

      addToCart: (slug, quantity = 1, variant) =>
        set((state) => {
          const existing = state.cart.find((item) => sameLine(item, slug, variant));
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                sameLine(item, slug, variant)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return {
            cart: [...state.cart, { slug, quantity, variant }],
          };
        }),

      removeFromCart: (slug, variant) =>
        set((state) => ({
          cart: state.cart.filter((item) => !sameLine(item, slug, variant)),
        })),

      setQty: (slug, quantity, variant) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => !sameLine(item, slug, variant))
              : state.cart.map((item) =>
                  sameLine(item, slug, variant) ? { ...item, quantity } : item,
                ),
        })),

      clearCart: () => set({ cart: [] }),

      revealPrice: (slug) =>
        set((state) =>
          state.revealedPrices.includes(slug)
            ? state
            : { revealedPrices: [...state.revealedPrices, slug] },
        ),

      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    {
      name: "moveis-okapi-shop",
      partialize: (state) => ({
        favorites: state.favorites,
        cart: state.cart,
        revealedPrices: state.revealedPrices,
      }),
    },
  ),
);
