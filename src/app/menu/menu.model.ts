// ESTE ARCHIVO describe cómo tiene que venir el menu.json
// No hace falta tocarlo salvo que quieras agregar campos nuevos a cada trago.

export interface MenuConfig {
  barName: string;   // Nombre del bar (aparece en el título y footer)
  logo: string;      // Ruta a la foto del logo, ej: "assets/tragos/logo.jpg"
  currency: string;  // Símbolo de moneda, ej: "$"
  footer: string;    // Texto del pie de página
}

export interface MenuItem {
  id: number;
  name: string;            // Nombre del trago/licuado
  description: string;     // Descripción corta
  price: number;           // Precio (solo número)
  category: 'Tragos' | 'Licuados' | 'Especiales'; // Categoría
  image?: string;          // Ruta a la foto (opcional). Si no hay, se ve el fondo con 🍸
  new?: boolean;           // Si es true, aparece en el botón "Nuevos"
}

export interface MenuData {
  config: MenuConfig;
  items: MenuItem[];
}
