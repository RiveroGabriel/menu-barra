# 🍸 Alto Trago — Menú Digital

Menú web para tu barra de tragos móvil: logo arriba, carta con foto por trago, precio dorado. Vos manejás todo desde **un JSON y dos carpetas** — nunca tocás código.

---

## 1. Uso diario (lo único que necesitás)

| Quiero... | Hago esto |
|---|---|
| Ver el menú | `npm start` → http://localhost:4200 |
| Cambiar precios / tragos | Edito `public/menu.json` → recargo con F5 |
| Subir fotos de tragos | Copio las imágenes a `public/assets/tragos/` |
| Cambiar mi logo | Reemplazo `public/logo/altoTragoLogo.png` |

---

## 2. Estructura del proyecto (qué es cada cosa)

```
public/
├── menu.json                  ← ⭐ TRAGOS, PRECIOS, NOMBRE DEL BAR (editás acá)
├── logo/
│   └── altoTragoLogo.png      ← tu logo
└── assets/tragos/             ← fotos de los tragos + hero.jpg

src/app/
├── app.ts / app.html          → arranque mínimo, solo <router-outlet>
├── app.routes.ts              → ruta '' → MenuPage
├── app.config.ts              → Router + HttpClient
├── models/menu.model.ts       → interfaces (Drink, MenuConfig, MenuData)
├── services/menu.service.ts   ← ⭐ acá se cambia JSON por API real
├── pages/menu-page/           → página completa: loading/error/carta/footer
└── components/
    ├── header/                → tu logo centrado
    ├── hero/                  → foto grande (aparece sola cuando subas hero.jpg)
    └── menu-card/             → tarjeta individual (foto 4:3, badge, precio)
```

---

## 3. Cargar un trago nuevo

1. Foto (opcional ya que sin foto se ve un fondo elegante): subila a `public/assets/tragos/`, ej. `campari.jpg`
2. Agregá el bloque en `"drinks"` dentro de `public/menu.json`:

```json
{
  "name": "Campari Naranja",
  "description": "Campari, jugo de naranja y hielo",
  "price": 6500,
  "category": "Clásicos",
  "image": "/assets/tragos/campari.jpg"
}
```

Recargá la página y aparece solo.

### Campos de cada trago

| Campo | Obligatorio | Qué es |
|---|---|---|
| `name` | ✅ | Nombre del trago |
| `description` | ✅ | Ingredientes / detalle corto |
| `price` | ✅ | Número sin símbolo (`5500`, no `$5500`) |
| `category` | ❌ | Badge de color (ver tabla) |
| `image` | ❌ | Ruta de la foto |

### ⚠️ Reglas del JSON

- Separá tragos con coma `,`, pero **no pongas coma después del último**.
- Todo texto entre comillas dobles `"así"`.
- Si algo falla, la web muestra "No se pudo cargar el menú" en vez de romperse. Validá en https://jsonlint.com

### 🏷️ Colores de badges según categoría

| Escribí la categoría igual a: | Badge |
|---|---|
| `Clásicos` | Ámbar claro |
| `De Autor` | Dorado |
| `Nacionales` | Rojo/rosa (fernet, gancia...) |
| `Cervezas` | Amarillo |
| `Vinos` | Fucsia |
| `Sin Alcohol` | Verde |

Otra categoría → badge gris. Para darle color a una nueva: editá `BADGE_COLORS` en `src/app/components/menu-card/menu-card.ts`.

---

## 4. Config general del bar

En `public/menu.json`, sección `config`:

```json
"config": {
  "barName": "Alto Trago",
  "tagline": "Barra de tragos móvil",
  "currency": "$",
  "logoPath": "logo/altoTragoLogo.png",
  "heroImage": "/assets/tragos/hero.jpg",
  "footerMessage": "¡Gracias por tu visita!"
}
```

---

## 5. Fotos

- Carpeta: `public/assets/tragos/`
- **Foto grande** (hero): se llama `hero.jpg` — mientras no exista, esa sección queda oculta sola.
- **Tarjetas**: horizontal, se ven en proporción 4:3, mínimo 800x600 px.
- Comprimí las fotos para que carguen rápido con QR: https://squoosh.app (<300 KB). El logo también conviene comprimirlo (el actual pesa ~2 MB).

---

## 6. Colores y tipografías

Todo sale de `src/styles.css`, sección `@theme`:

```css
--color-gold-200 ... --color-gold-600;   /* dorado: brillos, precios, marcos */
--font-display: 'Bebas Neue'             /* precios y títulos de sección */
--font-serif: 'Playfair Display'         /* nombres de tragos */
--font-sans: 'Inter'                     /* textos generales */
```

Sacá los códigos de color de tu logo en https://imagecolorpicker.com

---

## 7. Pasar de JSON a API real (cuando tengas backend)

Tocás **un solo archivo**: `src/app/services/menu.service.ts`

```ts
getMenu(): Observable<MenuData> {
  // return this.http.get<MenuData>('menu.json');
  return this.http.get<MenuData>('https://tu-api.com/api/tragos');
}
```

La API debe devolver el mismo formato que `menu.json`. La página, tarjetas y diseño no cambian nada.

---

## 8. Publicarlo online

```bash
npm run build
```

Genera `dist/menu-barra/browser`. Subilo gratis arrastrando la carpeta a **netlify.com/drop** (o Vercel/Firebase). Con la URL generás un QR gratis para tus mesas.

> Cuando cambies precios más adelante: editás `menu.json` → `npm run build` → subís `dist` otra vez.

---

## 9. Si VS Code muestra cosas en rojo

1. Cerrá todas las pestañas abiertas y volvé a abrir el proyecto (evita guardar versiones viejas encima de las nuevas).
2. `Ctrl+Shift+P` → **"Developer: Reload Window"**.
3. Actualizá la extensión **Angular Language Service** (`Ctrl+Shift+X`).
4. La prueba definitiva: `npm run build`. Si termina sin errores, el código está bien aunque el editor marque algo.
