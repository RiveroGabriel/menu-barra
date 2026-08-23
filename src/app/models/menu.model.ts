export interface MenuConfig {
  barName: string;
  tagline: string;
  currency: string;
  logoPath: string;
  heroImage: string;
  footerMessage: string;
}

export interface Drink {
  name: string;
  description: string;
  price: number;
  category?: string;
  image?: string;
}

export interface MenuData {
  config: MenuConfig;
  drinks: Drink[];
}
