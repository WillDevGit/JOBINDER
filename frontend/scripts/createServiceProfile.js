import { userLoggedId } from "../../backend/createUserSession.js";
import { getUser, updateUser, validUserServices } from "../../backend/user.js";
import { getStates, getCities, getStateName } from "../../backend/location.js";

const createStatesOptions = async (selectState) => {
  const states = await getStates();
  states.sort((a, b) => (a.nome > b.nome ? 1 : -1));
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.sigla;
    option.textContent = state.nome;
    selectState.appendChild(option);
  });
};

const createCitiesOptions = async (selectCity, state) => {
  if (!state) return;

  const cities = await getCities(state);

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
};

document.addEventListener("DOMContentLoaded", async () => {
  // Get the form elements
  const formServiceProfile = document.getElementById("form-service-profile");
  const specialties = document.getElementById("specialties");
  const inputServices = document.getElementById("input-services");
  const inputAvaliability = document.getElementById("input-avaliability");
  const selectState = document.getElementById("select-state");
  const selectCity = document.getElementById("select-city");
  const inputServiceImg = document.getElementById("input-service-img");

  // Get the user data
  const user = getUser(userLoggedId);

  // Fill the form fields with the user data
  specialties.textContent = user.serviceProfile.specialties;

  if (user.serviceProfile.services) inputServices.value = user.serviceProfile.services;

  if (user.serviceProfile.avaliability) inputAvaliability.value = user.serviceProfile.avaliability;

  await createStatesOptions(selectState); // Create the states options

  // Add the change event to the selectState
  selectState.addEventListener("change", async () => {
    await createCitiesOptions(selectCity, selectState.value);
  });

  // Add the submit event to the form
  formServiceProfile.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the form data
    const services = inputServices.value;
    const avaliability = inputAvaliability.value;
    const serviceImgFile = inputServiceImg.files[0];

    if (!validUserServices(services)) return;

    if (avaliability === "") {
      toastr.error('O campo "Disponibilidade" é obrigatório.');
      return;
    }

    if (selectState.value === "") {
      toastr.error('O campo "Estado" é obrigatório.');
      return;
    }

    if (selectCity.value === "") {
      toastr.error('O campo "Cidade" é obrigatório.');
      return;
    }

    if (!serviceImgFile) {
      toastr.error('O campo "Imagem do Serviço" é obrigatório.');
      return;
    }

    const stateName = await getStateName(selectState.value);

    // Parse the image to Base64
    const reader = new FileReader();
    reader.onload = function (event) {
      const serviceImgBase64 = event.target.result;

      // Update the user object
      user.serviceProfile.services = services;
      user.serviceProfile.avaliability = avaliability;
      user.serviceProfile.location = {};
      user.serviceProfile.location.state = stateName;
      user.serviceProfile.location.city = selectCity.value;
      user.serviceProfile.serviceImg = serviceImgBase64;

      // Update the user in the localStorage
      updateUser(userLoggedId, user);

      toastr.success("Perfil de serviço criado com sucesso!");

      // Redirect to the Home page after 2 seconds
      setTimeout(() => {
        window.location.href = "./home.html";
      }, 2000);
    };

    // Read the image as Data URL
    reader.readAsDataURL(serviceImgFile);
  });
});
