export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SnabRX - Быстрая доставка",
  description:
    "Поставщик по заказам, посылок, карго и грузов из России, Китая и других стран",
  navItems: [
    {
      label: "О нас",
      href: "/",
    },
    {
      label: "Сделать заказ",
      href: "/order-form",
    },
  ],
  navMenuItems: [
    {
      label: "О нас",
      href: "/",
    },
    {
      label: "Сделать заказ",
      href: "/order-form",
    },
  ],
  links: {
    telegram: "https://t.me/greenprodd",
    whatsapp: "https://wa.me/79106904736",
  },
};
