const catalogo = document.getElementById("catalogo");

const categorias = [
  "Advocacia",
  "Cabelo",
  "Construção",
  "Educação",
  "Eventos",
  "Informática",
  "Limpeza",
  "Mecânica",
  "Saúde",
];

categorias.forEach((categoria) => {
    const a = document.createElement("a");
    a.href = `areaProfissional.html?categoria=${categoria}`;
    a.classList.add("categoria");

    const background = document.createElement("div");
    background.classList.add("background-categoria");
    background.style.backgroundImage = `url(./images/categorias/${categoria}.png)`;

    const spanCategoria = document.createElement("span");
    spanCategoria.textContent = categoria;

    a.appendChild(background);
    a.appendChild(spanCategoria);
    catalogo.appendChild(a);
});
