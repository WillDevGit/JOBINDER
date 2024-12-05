import { categories } from "../../../backend/categories.js";

// Get the elements from the DOM
const list = document.getElementById("list");

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
});
