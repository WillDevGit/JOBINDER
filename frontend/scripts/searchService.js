import { searchCategory } from "./fuseJS.js";

const searchBox = document.getElementById("search-box");
const searchDropDrown = document.getElementById("search-dropdown");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const createResultsList = (results) => {
  const ul = document.createElement("ul");

  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result.item;
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
    searchBox.style.borderRadius = "1rem 1rem 0 0";
    searchDropDrown.style.display = "block";
  }

  const list = createResultsList(results);

  searchDropDrown.appendChild(list);
});
