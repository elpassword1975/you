(async function(){
  const res = await fetch('noticias/noticias.json', {cache:'no-store'});
  const arr = await res.json();
  // sort by date desc
  arr.sort((a,b)=> (b.fecha||'').localeCompare(a.fecha||''));

  // featured = first
  const dest = document.getElementById('destacada');
  if(arr[0]){
    const f = arr[0];
    dest.innerHTML = `
      <article class="card">
        <img src="img/${f.imagen}" alt="${f.titulo}">
        <div class="card-body">
          <span class="badge">${f.categoria||'Actualidad'}</span>
          <h2>${f.titulo}</h2>
          <p class="meta">${f.fecha} • ${f.autor||'Redacción UT'}</p>
          <p>${f.resumen}</p>
          <a class="btn" href="noticia.html?slug=${f.slug}">Leer más →</a>
        </div>
      </article>
      <article class="card" style="display:flex;flex-direction:column;justify-content:space-between">
        <div class="card-body">
          <h3>Última hora</h3>
          <p>La redacción confirma que el silencio de la ZAS tiene modo “siesta” y “pestiño”.</p>
          <p class="meta">Servicio público en pruebas — No molestar</p>
        </div>
      </article>`;
  }

  // list
  const lista = document.getElementById('lista');
  arr.forEach(n=>{
    const tile = document.createElement('article');
    tile.className = 'tile';
    tile.innerHTML = `
      <img src="img/${n.imagen}" alt="${n.titulo}">
      <div class="body">
        <span class="badge">${n.categoria||'Actualidad'}</span>
        <h3>${n.titulo}</h3>
        <p>${n.resumen}</p>
        <a class="btn" href="noticia.html?slug=${n.slug}">Leer más →</a>
      </div>`;
    lista.appendChild(tile);
  });
})();