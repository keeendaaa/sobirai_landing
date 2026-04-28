import type { NavigationItem } from "./NavBar";

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Продукт", to: "#product" },
  { name: "Подписки", to: "#subscriptions" },
  { name: "Кейсы", to: "#cases" },
] as const;
