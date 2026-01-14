import type { NavigationItem } from "./NavBar";

const staticNavigationItems: NavigationItem[] = [
  { name: "Продукт", to: "#product" },
  { name: "Подписки", to: "#subscriptions" },
  { name: "Кейсы", to: "#cases" },
];

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Продукт", to: "#product" },
  { name: "Подписки", to: "#subscriptions" },
  { name: "Кейсы", to: "#cases" },
  ...staticNavigationItems,
] as const;
