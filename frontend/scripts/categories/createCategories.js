import { userLoggedId } from "../../../backend/createUserSession.js";
import { getUser, updateUser } from "../../../backend/user.js";
import { categories } from "../../../backend/categories.js";

// Get the elements from the DOM
const list = document.getElementById("list");
const categoriasElements = document.getElementsByClassName("categoria");
const confirmCategory = document.getElementById("confirm-category");

const user = getUser(userLoggedId);

// Select the category
let categoriaSelecionada = null;

let onlyEditSpecialtie = false;

// Create the categories
categories.forEach((categoria) => {
  let categoriaDev = categoria === "Desenvolvedor de Software" ? "Desenvolvedor" : null;

  const a = document.createElement("a");
  a.classList.add("categoria");

  const title = document.createElement("h2");
  title.textContent = categoriaDev ? categoriaDev : categoria;

  const background = document.createElement("div");
  background.classList.add("background-categoria");
  background.style.backgroundImage = `url(../images/categories/${categoriaDev ? categoriaDev : categoria}.png)`;

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
    toastr.error("Selecione uma categoria.");
    return;
  }

  // Save the service profile data in the user object
  if (!user.serviceProfile || Object.keys(user.serviceProfile).length <= 1) {
    user.serviceProfile = {};
    onlyEditSpecialtie = false;
  } else {
    onlyEditSpecialtie = true;
  }

  user.serviceProfile.specialties = categoriaSelecionada;
  updateUser(userLoggedId, user);

  toastr.success("Categoria selecionada com sucesso!");

  // Redirect to the Create Service Profile page after 2 seconds
  setTimeout(() => {
    if (onlyEditSpecialtie) window.location.href = "./editProfile.html";
    else window.location.href = "./createServiceProfile.html";
  }, 2000);
});
