(async function(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const res = await fetch('noticias/noticias.json', {cache:'no-store'});
  const arr = await res.json();
  const n = arr.find(x=>x.slug===slug);
  const el = document.getElementById('articulo');
  if(!n){ el.innerHTML = '<p>Noticia no encontrada.</p>'; return; }
  el.innerHTML = `
    <h1>${n.titulo}</h1>
    <img class="hero" src="img/${n.imagen}" alt="${n.titulo}">
    <div class="byline">${n.fecha} • ${n.autor||'Redacción UT'} • ${n.categoria||''}</div>
    <div class="prosa">${n.contenido}</div>
    <blockquote>${n.cita||'“Toda coincidencia con la realidad es pura fantasía controlada.”'}</blockquote>
    <a class="back" href="index.html">← Volver a portada</a>
  `;
})();