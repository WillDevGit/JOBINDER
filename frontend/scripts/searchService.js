import { searchCategory } from "./fuseJS.js";
import { createCards } from "../../backend/swapCards.js";

const searchBox = document.getElementById("search-box");
const searchDropDrown = document.getElementById("search-dropdown");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const createResultsList = (results) => {
  const ul = document.createElement("ul");

  results.forEach((result) => {
    const specialtie = result.item;
    const li = document.createElement("li");
    li.textContent = specialtie;
    li.addEventListener("click", () => {
      searchInput.value = specialtie;
      searchDropDrown.style.display = "none";
      searchBox.style.borderRadius = "1rem";
      createCards(specialtie);
    });
    ul.appendChild(li);
  });

  return ul;
};

searchInput.addEventListener("input", async () => {
  // Clear the dropdown
  searchDropDrown.innerHTML = "";

  const results = await searchCategory(searchInput.value);

  if (searchInput.value === "" || results.length === 0) {
    searchDropDrown.style.display = "none";
    searchBox.style.borderRadius = "1rem";
  } else {
    results.splice(7); // Limit the number of results to 7
    searchBox.style.borderRadius = "1rem 1rem 0 0";
    searchDropDrown.style.display = "block";
  }

  const list = createResultsList(results);

  searchDropDrown.appendChild(list);
});
