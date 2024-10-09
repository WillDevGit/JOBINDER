import { addCategory, getUserBeingCreated } from "../../backend/user.js";

const catalogo = document.getElementById("catalogo");
const categoriasElements = document.getElementsByClassName("categoria");
const confirmCategory = document.getElementById("confirm-category");

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

let categoriaSelecionada = null;

categorias.forEach((categoria) => {
  const a = document.createElement("a");
  a.classList.add("categoria");

  const title = document.createElement("h2");
  title.textContent = categoria;

  const background = document.createElement("div");
  background.classList.add("background-categoria");
  background.style.backgroundImage = `url(../images/categorias/${categoria}.png)`;

  a.appendChild(title);
  a.appendChild(background);
  catalogo.appendChild(a);

  a.addEventListener("click", () => {
    removeSelected();
    a.classList.add("categoria-selecionada");
    categoriaSelecionada = categoria;
  });
});

const removeSelected = () => {
  Array.from(categoriasElements).forEach((categoria) => {
    categoria.classList.remove("categoria-selecionada");
  });
};

confirmCategory.addEventListener("click", () => {
  if (categoriaSelecionada === null) {
    alert("Selecione uma categoria.");
    return;
  }

  const cellphone = getUserBeingCreated();
  addCategory(cellphone, categoriaSelecionada);

  window.location.href = "./login.html";
});
