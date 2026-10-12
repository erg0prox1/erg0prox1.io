# Blog de simulaciones

Sitio estático (HTML + CSS + JS, sin build ni dependencias) para publicar simulaciones y notas.
Pensado para GitHub Pages.

## Estructura

```
.
├── index.html            # portada: presentación, listas por tipo, enlaces
├── archive.html          # todas las entradas por fecha
├── 404.html
├── .nojekyll             # GitHub Pages sirve los archivos tal cual
├── assets/
│   ├── style.css         # todo el diseño (cambia solo las variables :root)
│   ├── posts.js          # ÍNDICE de entradas: aquí se registra cada post
│   └── site.js           # pinta las listas a partir de posts.js
└── posts/
    ├── _plantilla.html   # copia esto para cada entrada nueva
    └── ejemplo-simulacion.html   # ejemplo con simulación PID interactiva
```

## Publicar una entrada nueva

1. Copia `posts/_plantilla.html` a `posts/nombre-de-tu-entrada.html` y edítala.
2. Agrega una línea en `assets/posts.js`:
   ```js
   { title: "Mi simulación", date: "2026-10-20", type: "simulacion", url: "posts/nombre-de-tu-entrada.html" }
   ```
   `type` puede ser `"simulacion"` o `"nota"`. La portada y el archivo se actualizan solos.
3. `git add . && git commit -m "Nueva entrada" && git push`

## Subir a GitHub Pages

```bash
cd simulaciones
git init -b main
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**.

- Si el repositorio se llama `TU-USUARIO.github.io`, el sitio queda en `https://TU-USUARIO.github.io/`.
- Si tiene otro nombre, queda en `https://TU-USUARIO.github.io/TU-REPO/`. Los enlaces del sitio son relativos y funcionan igual,
  salvo `404.html`, donde debes cambiar `/assets/` y `/` por `/TU-REPO/assets/` y `/TU-REPO/`.

## Probar en local

Abre `index.html` directo en el navegador, o levanta un servidor:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Antes de publicar, reemplaza

- `Martin` y el texto de presentación en `index.html`.
- Enlaces `TU-USUARIO`, `TU-PERFIL` y `tu@correo.com` en `index.html`.
- Textos de ejemplo en `posts/ejemplo-simulacion.html` (o bórralo y quita su línea de `posts.js`).

## Tipos de simulación que puedes embeber

- **JS en la misma página**: como en `ejemplo-simulacion.html`. Lo más ligero y no depende de nadie.
- **iframe** a una simulación hospedada aparte (otra página de GitHub Pages, un Space de Hugging Face, etc.): ver `<iframe class="embed">` en la plantilla.
- **Imagen o GIF** exportado de Python/Matplotlib u otra herramienta, con su pie de figura.

GitHub Pages solo sirve archivos estáticos: si una simulación necesita backend (por ejemplo Python corriendo en un servidor),
hospédala en otro lado y embébela por iframe, o expórtala a JS/WebAssembly.

## Ecuaciones

La plantilla trae un bloque comentado de KaTeX (CDN). Descoméntalo y escribe `$$ ... $$` o `\( ... \)` en el texto.
