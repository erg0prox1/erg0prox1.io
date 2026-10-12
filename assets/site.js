// Renderiza las listas de entradas a partir de window.POSTS (assets/posts.js).
// Uso en HTML:  <ul class="entries" data-posts="simulacion" data-limit="5"></ul>
//   data-posts: "simulacion" | "nota" | "all"
//   data-limit: número máximo de entradas (opcional)
(function () {
  var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  function fecha(iso) {
    var p = iso.split("-");
    return MESES[parseInt(p[1], 10) - 1] + " " + p[0];
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  document.querySelectorAll("[data-posts]").forEach(function (el) {
    var tipo = el.getAttribute("data-posts");
    var limite = parseInt(el.getAttribute("data-limit"), 10) || Infinity;
    var items = (window.POSTS || [])
      .filter(function (p) { return tipo === "all" || p.type === tipo; })
      .sort(function (a, b) { return b.date.localeCompare(a.date); })
      .slice(0, limite);

    el.innerHTML = items.length
      ? items.map(function (p) {
          return '<li><a href="' + esc(p.url) + '">' + esc(p.title) + "</a>" +
                 '<time datetime="' + esc(p.date) + '">' + fecha(p.date) + "</time></li>";
        }).join("")
      : '<li class="empty">Pronto.</li>';
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
