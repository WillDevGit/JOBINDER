import { searchCategory } from "./fuseJS.js";
import { createCards } from "../../backend/swapCards.js";
import { getStates, getCities, distanceBetweenCities } from "./location.js";

const searchBox = document.getElementById("search-box");
const searchDropDrown = document.getElementById("search-dropdown");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchMap = document.getElementById("search-map");

const selectStateCityAside = document.getElementById("select-state-city-aside");
const selectState = document.getElementById("select-state");
const selectCity = document.getElementById("select-city");
const stateCityConfirm = document.getElementById("state-city-confirm");
const stateCityCancel = document.getElementById("state-city-cancel");

let specialtieSearched = null;
let citySearched = null;

const createResultsList = (results) => {
  const ul = document.createElement("ul");

  results.forEach((result) => {
    const specialtie = result.item;
    const li = document.createElement("li");
    li.textContent = specialtie;
    li.addEventListener("click", () => {
      specialtieSearched = specialtie;
      searchInput.value = specialtieSearched;
      searchDropDrown.style.display = "none";
      searchBox.style.borderRadius = "1rem";
      createCards(specialtieSearched, citySearched);
    });
    ul.appendChild(li);
  });

  return ul;
};

const createStatesOptions = async () => {
  const states = await getStates();

  states.sort((a, b) => (a.nome > b.nome ? 1 : -1));

  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.sigla;
    option.textContent = state.nome;
    selectState.appendChild(option);
  });
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

searchMap.addEventListener("click", () => {
  selectStateCityAside.style.display = "flex";
});
// Get the cities of the selected state
selectState.addEventListener("change", async () => {
  const cities = await getCities(selectState.value);

  selectCity.innerHTML = "";

  const nullOption = document.createElement("option");
  nullOption.value = "";
  nullOption.textContent = "Selecione uma cidade";
  nullOption.disabled = true;
  nullOption.selected = true;
  selectCity.appendChild(nullOption);

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.nome;
    option.textContent = city.nome;
    selectCity.appendChild(option);
  });
});

stateCityCancel.addEventListener("click", () => {
  selectStateCityAside.style.display = "none";
});

stateCityConfirm.addEventListener("click", async () => {
  if (selectState.value === "") {
    toastr.error("Selecione um estado");
    return;
  }

  if (selectCity.value === "") {
    toastr.error("Selecione uma cidade");
    return;
  }

  citySearched = selectCity.value;
  createCards(specialtieSearched, citySearched);

  selectStateCityAside.style.display = "none";
});

await createStatesOptions();
