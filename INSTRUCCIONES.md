# 🍸 Alto Trago - Menú Digital

Menú web para tu barra de tragos móvil. Ahora es **un solo componente**: todo se controla desde `public/assets/menu.json` y la carpeta de fotos.

> 📖 También tenés el `README.md` con la misma info en formato más largo.

---

## Lo único que necesitás saber

| Quiero... | Hago esto |
|---|---|
| Ver el menú | `npm start` → http://localhost:4200 |
| Cambiar precios / tragos | Edito `public/assets/menu.json` → recargo con F5 |
| Subir fotos de tragos | Copio las imágenes a `public/assets/tragos/` |
| Cambiar el logo | Reemplazo `public/assets/tragos/logo.jpg` |

---

## Estructura simple

```
public/
└── assets/
    ├── menu.json          ← ⭐ TRAGOS, PRECIOS, NOMBRE DEL BAR (editás acá)
    └── tragos/            ← fotos de los tragos + logo.jpg

src/app/
├── app.ts                 → arranque mínimo
├── app.routes.ts          → carga el menú al entrar
├── app.config.ts          → Router + HttpClient
└── menu/
    ├── menu.component.ts  ← ⭐ UN SOLO componente con todo
    ├── menu.component.html
    ├── menu.service.ts    ← lee el menu.json
    └── menu.model.ts      ← define la forma del menú
```

---

## Agregar un trago nuevo

1. (Opcional) Subí la foto a `public/assets/tragos/`, ej. `fernet.jpg`.
2. Agregá el bloque dentro de `"items"` en `public/assets/menu.json`:

```json
{
  "id": 20,
  "name": "Fernet Branca",
  "description": "El clásico de la casa, bien frío",
  "price": 8000,
  "category": "Tragos",
  "image": "assets/tragos/fernet.jpg",
  "new": false
}
```

**Reglas del JSON:**
- `id`: tiene que ser único.
- `category`: `"Tragos"`, `"Licuados"` o `"Especiales"`.
- `new`: si lo ponés `true`, aparece en el botón **Nuevos**.
- `image`: opcional. Si no va, se ve el fondo con 🍸.
- No pongas coma después del último objeto de una lista.

---

## Los 3 botones

Arriba de la carta hay 3 botones: **Tragos**, **Licuados**, **Nuevos**.

- **Tragos / Licuados**: filtran por `category`.
- **Nuevos**: muestra todo lo que tenga `"new": true`.

Si querés agregar otro botón (por ejemplo "Especiales"), editá:

`src/app/menu/menu.component.ts`:
```ts
filtros: Filtro[] = ['Tragos', 'Licuados', 'Especiales', 'Nuevos'];
```

---

## Config general del bar

```json
"config": {
  "barName": "Alto Trago",
  "logo": "assets/tragos/logo.jpg",
  "currency": "$",
  "footer": "¡Gracias por tu visita!"
}
```

---

## Subir a internet

```bash
npm run build
```

Subí la carpeta `dist/menu-barra/browser` a Netlify/Vercel.

---

## Si algo se ve mal

1. Cerrá todas las pestañas de VS Code y recargá la ventana (`Ctrl+Shift+P` → "Developer: Reload Window").
2. Corré `npm run build`. Si termina sin errores, el código está bien.
3. Revisá que el JSON sea válido en https://jsonlint.com.
