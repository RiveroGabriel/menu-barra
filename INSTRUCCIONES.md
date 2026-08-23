# 🍸 Alto Trago — Menú Digital · Instrucciones

Menú web para tu barra de tragos móvil: fondo negro, logo dorado, foto destacada grande y una tarjeta por trago con su foto y precio.

---

## 1. Cómo correr el proyecto

```bash
npm install     # solo la primera vez
npm start       # abre en http://localhost:4200
```

Para probarlo desde el celular en la misma red WiFi: `npm start -- --host` y abrís la URL `http://TU-IP:4200` que muestra la consola.

---

## 2. ¿Qué archivo toca qué?

| Archivo / carpeta | Para qué sirve | ¿Sabés programar? |
|---|---|---|
| `public/menu.json` | **Tragos, precios, categorías, fotos, nombre del bar** | No |
| `public/assets/tragos/` | **Fotos de los tragos y del hero** | No |
| `public/logo/` | Tu logo (`logo.png`) | No |
| `src/styles.css` | Colores y tipografías del sitio | No |
| `src/app/components/` | Diseño por partes: header, hero y tarjetas | Solo si cambiás diseño |

> 👉 Para el día a día solo tocás `menu.json`, la carpeta de fotos y el logo.

---

## 3. Cargar un trago nuevo

1. **La foto**: subí la imagen a `public/assets/tragos/`, ej. `campari.jpg`
2. **El dato**: agregá el bloque en `"drinks"` dentro de `public/menu.json`:

```json
{
  "name": "Campari Naranja",
  "description": "Campari, jugo de naranja y hielo",
  "price": 6500,
  "category": "Clásicos",
  "image": "/assets/tragos/campari.jpg"
}
```

Guardá y recargá: la tarjeta aparece sola (con fondo elegante si aún no subiste la foto).

### Campos de cada trago

| Campo | Obligatorio | Qué es |
|---|---|---|
| `name` | ✅ | Nombre del trago |
| `description` | ✅ | Ingredientes / detalle corto |
| `price` | ✅ | Número sin símbolo (`5500`, no `$5500`) |
| `category` | ❌ | Badge de color en la tarjeta (ver abajo) |
| `image` | ❌ | Ruta de la foto (`/assets/tragos/nombre.jpg`) |

### ⚠️ Reglas del JSON

- Separá tragos con **coma** `,`, pero **no pongas coma después del último**.
- Todo texto entre **comillas dobles** `"así"`.
- Si algo falla, la página muestra "No se pudo cargar el menú" en vez de romperse.
- Validá tu JSON en https://jsonlint.com si tenés dudas.

### 🏷️ Categorías y colores de badges

| Categoría (escríbela igual) | Color del badge |
|---|---|
| `Clásicos` | Ámbar claro |
| `De Autor` | Dorado |
| `Nacionales` | Rojo/rosa (fernet, gancia...) |
| `Cervezas` | Amarillo cerveza |
| `Vinos` | Fucsia/vino |
| `Sin Alcohol` | Verde |

Otra categoría distinta → badge gris neutro. Para darle color a una nueva, editá el mapa `BADGE_COLORS` en `src/app/components/menu-card/menu-card.ts`.

---

## 4. Fotos de los tragos

- Carpeta: `public/assets/tragos/` (incluye un `LEEME.txt` con todos los nombres).
- **Hero** (foto grande principal): se llama `hero.jpg`. Ideal 1600x900 px o más.
- **Tarjetas**: horizontal (se muestran en 4:3), mínimo 800x600 px.
- Comprimí las fotos para que carguen rápido con QR: https://squoosh.app (<300 KB).
- El nombre del archivo tiene que coincidir con el campo `image` del trago.

Mientras falte una foto, la tarjeta muestra un fondo oscuro con 🍸 — podés cargar todo el menú primero y las fotos después.

---

## 5. Tu logo

1. Poné tu imagen en `public/logo/` con el nombre **`logo.png`**
   (también sirve `.svg` / `.webp`; otro nombre → actualizá `logoPath` en `menu.json`).
2. Recomendado: PNG cuadrado, fondo transparente, mínimo 512x512 px.
3. Se muestra circular con marco dorado. Mientras no haya logo, aparece la inicial del bar en dorado.

---

## 6. Cambiar colores y tipografía

Todo sale de `src/styles.css`, sección `@theme`:

```css
--color-gold-200 ... --color-gold-600;   /* dorado: marcos, precios, brillos */
--font-display: 'Bebas Neue', ...        /* display: precios y títulos de sección */
--font-serif: 'Playfair Display', ...    /* serif fina: nombres de tragos */
--font-sans: 'Inter', ...                /* textos generales */
```

Paletas de ejemplo (reemplazá los 6 valores dorados):

**Rojo/vino:** `#fecdd3 #fda4af #fb7185 #e11d48 #be123c #9f1239`
**Verde limón:** `#ecfccb #d9f99d #bef264 #a3e635 #84cc16 #65a30d`
**Turquesa:** `#cffafe #a5f3fc #67e8f9 #22d3ee #06b6d4 #0891b2`

Sacá los códigos exactos de tu logo en https://imagecolorpicker.com

---

## 7. Nombre, frase, moneda y pie

Sección `config` de `public/menu.json`:

```json
"config": {
  "barName": "Alto Trago",
  "tagline": "Barra de tragos móvil",
  "currency": "$",
  "logoPath": "logo/logo.png",
  "heroImage": "/assets/tragos/hero.jpg",
  "footerMessage": "¡Gracias por tu visita!"
}
```

---

## 8. Publicarlo (ponerlo online)

```bash
npm run build
```

Genera `dist/menu-barra/browser`. Subilo gratis:

- **Netlify** → arrastrás la carpeta a netlify.com/drop y tenés la URL al instante.
- **Vercel** o **Firebase Hosting** → similares.

Con esa URL generás un **QR gratis** (qr-code-generator.com) para tus mesas/eventos.

> 💡 Cambios futuros: editás `menu.json` o subís fotos → `npm run build` → volvés a subir `dist`.

---

## 9. Estructura técnica (referencia)

```
src/app/
├── app.ts / app.html          → carga menu.json y arma la página (loading → menú → error)
├── menu.ts                    → interfaces y función loadMenu()
└── components/
    ├── header/                → logo circular dorado + nombre + subtítulo celeste
    ├── hero/                  → foto grande full-width sin bordes redondeados
    └── menu-card/             → tarjeta individual (@Input drink, imagen 4:3, badge, precio)
```

Responsive mobile-first: 1 columna en celular, 2 en tablet, 3 en desktop.

---

## 10. Problemas comunes

| Problema | Causa probable |
|---|---|
| "No se pudo cargar el menú" | JSON inválido (coma de más, faltan comillas) |
| La foto no aparece | El `image` del JSON no coincide con el nombre del archivo |
| El logo no aparece | El archivo no se llama `logo.png` o no está en `public/logo/` |
| Los cambios no se ven | Recargá con F5; si publicaste, `npm run build` y subir `dist` otra vez |
| Precios raros | `price` debe ser número puro: `5500` ✅ · `"$5500"` ❌ |
