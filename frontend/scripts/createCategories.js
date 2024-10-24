import { getUser, userLogged, updateUser } from "../../backend/user.js";

// Get the elements from the DOM
const list = document.getElementById("list");
const categoriasElements = document.getElementsByClassName("categoria");
const confirmCategory = document.getElementById("confirm-category");

const userLoggedId = userLogged();
const user = getUser(userLoggedId);

// Categories list
const categories = [
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

// Select the category
let categoriaSelecionada = null;

let onlyEditSpecialtie = false;

// Create the categories
categories.forEach((categoria) => {
  const a = document.createElement("a");
  a.classList.add("categoria");

  const title = document.createElement("h2");
  title.textContent = categoria;

  const background = document.createElement("div");
  background.classList.add("background-categoria");
  background.style.backgroundImage = `url(../images/categories/${categoria}.png)`;

  a.appendChild(title);
  a.appendChild(background);
  list.appendChild(a);

  a.addEventListener("click", () => {
    removeSelected();
    a.classList.add("categoria-selecionada");
    categoriaSelecionada = categoria;
  });
});

// Remove the selected category
const removeSelected = () => {
  Array.from(categoriasElements).forEach((categoria) => {
    categoria.classList.remove("categoria-selecionada");
  });
};

// Confirm the category
confirmCategory.addEventListener("click", () => {
  if (categoriaSelecionada === null) {
    alert("Selecione uma categoria.");
    return;
  }

  // Save the service profile data in the user object
  if (!user.serviceProfile) {
    user.serviceProfile = {};
    onlyEditSpecialtie = false;
  } else {
    onlyEditSpecialtie = true;
  }

  user.serviceProfile.specialties = categoriaSelecionada;
  updateUser(userLoggedId, user);

  // Redirect to the Create Service Profile page
  if (onlyEditSpecialtie) window.location.href = "./editProfile.html";
  else window.location.href = "./createServiceProfile.html";
});
