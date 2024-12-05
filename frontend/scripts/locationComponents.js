import { getStates, getCities } from "../../backend/location.js";

const createStateOptions = async (selectState) => {
  const states = await getStates();

  states.sort((a, b) => (a.nome > b.nome ? 1 : -1));

  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.sigla;
    option.textContent = state.nome;
    if (state.sigla !== "SP") option.disabled = true; // Limit the states to test to SP
    selectState.appendChild(option);
  });
};

const createCityOptions = async (state, selectCity) => {
  const cities = await getCities(state);

  selectCity.innerHTML = "";

  const nullOption = document.createElement("option");
  nullOption.value = "";
  nullOption.textContent = "Selecione uma cidade";
  nullOption.disabled = true;
  nullOption.selected = true;
  selectCity.appendChild(nullOption);

  cities.forEach((city, index) => {
    const option = document.createElement("option");
    option.value = city.nome;
    option.textContent = city.nome;
    if (index > 2) option.disabled = true; // Limit the number of cities to test to 3
    selectCity.appendChild(option);
  });
};

export { createStateOptions, createCityOptions };
