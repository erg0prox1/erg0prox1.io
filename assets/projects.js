// ==========================================================
// Proyectos open source. Para agregar uno nuevo:
//   1. Pon tus imágenes en assets/img/proyectos/ (jpg, png o webp).
//   2. Agrega un bloque nuevo a la lista de abajo.
//
// title:  nombre del proyecto
// desc:   una o dos frases
// repo:   enlace al repositorio
// images: lista de imágenes (una o varias). Ruta desde la raíz del sitio.
//         Cada una puede ser "ruta.png" o { src: "ruta.png", alt: "descripción" }
// tags:   (opcional) etiquetas cortas, ej. ["Python", "FastAPI"]
// ==========================================================
window.PROJECTS = [
  {
    title: "PlantTwin",
    desc: "Simulador PID térmico personal. Sirve para ver qué pasa con la respuesta de una planta cuando cambian los parámetros del controlador.",
    repo: "https://github.com/erg0prox1/PlantTwin",
    images: [
      { src: "assets/img/proyectos/planttwin-1.png", alt: "Captura de PlantTwin" }
    ],
    tags: ["Python", "FastAPI", "React"]
  }
  // , {
  //   title: "Otro proyecto",
  //   desc: "Qué hace y para qué sirve.",
  //   repo: "https://github.com/erg0prox1/otro",
  //   images: ["assets/img/proyectos/otro-1.png", "assets/img/proyectos/otro-2.png"],
  //   tags: ["C++"]
  // }
];

// ---------- Render (no hace falta tocar esto) ----------
(function () {
  const seguro = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // Solo permite enlaces http(s)
  const urlOk = u => /^https?:\/\//i.test(u) ? u : "#";

  const contenedores = document.querySelectorAll("[data-projects]");
  if (!contenedores.length) return;

  const proyectos = window.PROJECTS || [];

  const galeria = p => {
    const imgs = (p.images || []).map(i => typeof i === "string" ? { src: i, alt: "" } : i);
    if (!imgs.length) return "";
    return `<div class="proj-gallery" role="group" aria-label="Imágenes de ${seguro(p.title)}">` +
      imgs.map(i =>
        `<a href="${seguro(i.src)}" target="_blank" rel="noopener">` +
        `<img src="${seguro(i.src)}" alt="${seguro(i.alt || p.title)}" loading="lazy"></a>`
      ).join("") + `</div>`;
  };

  const tarjeta = p => `
    <article class="proj">
      ${galeria(p)}
      <div class="proj-body">
        <h3 class="proj-title">${seguro(p.title)}</h3>
        <p class="proj-desc">${seguro(p.desc)}</p>
        <div class="proj-meta">
          ${(p.tags || []).map(t => `<span class="tag">${seguro(t)}</span>`).join("")}
          <a class="proj-repo" href="${seguro(urlOk(p.repo))}" target="_blank" rel="noopener">Ver repo →</a>
        </div>
      </div>
    </article>`;

  contenedores.forEach(el => {
    el.innerHTML = proyectos.length
      ? proyectos.map(tarjeta).join("")
      : '<p class="empty">Pronto.</p>';
  });
})();
