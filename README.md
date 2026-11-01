# Móveis Okapi

Website de demonstração para a empresa **Móveis Okapi** (São João do Campo, Coimbra), reconstruído a partir do preview Lovable com máxima fidelidade visual e funcional.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- React Router DOM
- Framer Motion
- Zustand (carrinho, favoritos, preços revelados)

## Desenvolvimento

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Rotas principais

- `/` — Homepage com hero parallax
- `/loja` — Catálogo com pesquisa, filtros e ordenação
- `/categoria/:slug` — Categorias
- `/produto/:slug` — Ficha de produto (galeria, variantes, WhatsApp)
- `/colecoes` — 5 coleções editoriais
- `/inspiracao` e `/inspiracao/:slug` — Guias e artigos
- `/favoritos`, `/carrinho`, `/orcamento`
- `/sobre`, `/contactos`, `/privacidade`
- `*` — 404 editorial (“Este espaço ainda está por mobilar.”)

## Notas

- Preços e stock são fictícios (demonstração).
- O botão “Ver preço” revela o valor localmente e abre WhatsApp contextual.
- Favoritos e carrinho persistem em `localStorage`.
