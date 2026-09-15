# Alto Trago - Menú digital

Menú web para barra de tragos móvil. Hecho con **Angular 21** + **Tailwind CSS**.

La idea es que sea lo más fácil posible de mantener: **casi todo se edita desde `public/assets/menu.json` y la carpeta `public/assets/tragos/`**.

---

## Cómo levantar el proyecto local

```bash
npm install
npm start
```

Abrir en el navegador: `http://localhost:4200/`

---

## Cómo cambiar el logo

1. Reemplazá la imagen en: `public/assets/tragos/logo.jpg`
2. Si querés usar otro nombre, editá `public/assets/menu.json` y cambiá:
   ```json
   "logo": "assets/tragos/tu-logo.jpg"
   ```

---

## Cómo agregar o editar un trago/licuado

1. Abrí `public/assets/menu.json`.
2. Dentro del array `items`, agregá un objeto como este:

```json
{
  "id": 20,
  "name": "Nombre del trago",
  "description": "Descripción corta",
  "price": 7500,
  "category": "Tragos",
  "new": false
}
```

**Reglas:**
- `id`: tiene que ser único (no se puede repetir).
- `category`: puede ser `"Tragos"`, `"Licuados"` o `"Especiales"`.
- `new`: si lo ponés `true`, aparece en el botón **Nuevos**.
- `image`: si querés que tenga foto, agregá el campo. Si no, se ve el fondo con 🍸.

---

## Cómo agregar una foto a un trago

1. Guardá la foto en: `public/assets/tragos/`
2. Nombrala simple, **sin espacios ni tildes**. Ejemplos:
   - `fernet.jpg`
   - `vodka-sprite.jpg`
   - `licuado-frutilla.jpg`
3. En `public/assets/menu.json`, buscá el trago y agregale:
   ```json
   "image": "assets/tragos/fernet.jpg"
   ```
4. Guardá y recargá la página (`F5`).

> **Importante:** el nombre del archivo en `image` tiene que ser **exactamente igual** al que pusiste en la carpeta, incluyendo mayúsculas.

---

## Cómo marcar algo como "Nuevo"

En `public/assets/menu.json`, agregale `"new": true` al trago:

```json
{
  "id": 10,
  "name": "Campari",
  "description": "...",
  "price": 8000,
  "category": "Tragos",
  "new": true
}
```

---

## Cómo cambiar los botones de filtro

Los 3 botones actuales son: **Tragos**, **Licuados**, **Nuevos**.

Si querés agregar uno más (por ejemplo "Especiales"), editá:

`src/app/menu/menu.component.ts`

```ts
filtros: Filtro[] = ['Tragos', 'Licuados', 'Especiales', 'Nuevos'];
```

Y en `menu.model.ts` asegurate de que el tipo permita esa categoría:

```ts
category: 'Tragos' | 'Licuados' | 'Especiales';
```

---

## Cómo cambiar colores o estilos

La paleta está en `src/styles.css`. Ahí se definen los colores:

- `blush-400`: rosa principal `#e8879a`
- `gold-500`: dorado `#d4a03c`
- `bronze-500`: dorado viejo `#c9a227`
- `coral-400`: coral `#f0917f`

El diseño de las tarjetas y botones está todo en `src/app/menu/menu.component.html`.

---

## Cómo hacer un build para subir a internet

```bash
npm run build
```

Los archivos listos para subir quedan en: `dist/menu-barra/browser/`

---

## Estructura del proyecto (resumida)

```
src/app/
  app.ts              ← componente raíz
  app.routes.ts       ← ruta principal que carga el menú
  app.config.ts       ← config básica de Angular
  menu/
    menu.component.ts    ← UN SOLO componente con todo
    menu.component.html  ← el HTML del menú
    menu.service.ts      ← lee el menu.json
    menu.model.ts        ← define la forma del menú

public/
  assets/
    menu.json         ← acá editás los tragos y el logo
    tragos/           ← acá van las fotos
      logo.jpg
      gancia-spritz.jpg
      VodkaConSprite.jpg
```

---

## Si algo no se ve

- Si una foto no aparece, revisá que el nombre en `image` sea exactamente igual al archivo.
- Si el menú no carga, abrí la consola del navegador (`F12`) y fijate si `menu.json` tiene un error de sintaxis (coma de más, llave faltante, etc.).
