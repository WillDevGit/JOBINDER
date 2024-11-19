import { userLoggedId } from "../../backend/createUserSession.js";
import {
  getUserData,
  updateUserName,
  updateUserAvaliability,
  updateUserServices,
  updateLocation,
  updateServiceImg,
} from "../../backend/user.js";
import { getStates, getCities } from "./location.js";

const usuarioDados = getUserData(userLoggedId);

const editContainer = document.getElementById("edit-container");
const options = document.getElementById("options");
const editFullNameButton = document.getElementById("edit-name");
const editSpecialtieButton = document.getElementById("edit-specialtie");
const editAvaliabilityButton = document.getElementById("edit-avaliability");
const editServicesButton = document.getElementById("edit-services");
const editStateCityButton = document.getElementById("edit-state-city");
const editImageButton = document.getElementById("edit-image");

const header = document.getElementById("header");
const botaoVoltar = document.getElementById("voltar");
const closeEditProfileButton = document.getElementById("close-edit-profile");
const openProfileButton = document.getElementById("edit-profile");

const editName = document.getElementById("edit-name-container");
const inputName = document.getElementById("input-name");
const submitName = document.getElementById("submit-name");

const editAvaliability = document.getElementById("edit-avaliability-container");
const inputAvaliability = document.getElementById("input-avaliability");
const submitAvaliability = document.getElementById("submit-avaliability");

const editServices = document.getElementById("edit-services-container");
const textareaServices = document.getElementById("textarea-services");
const submitServices = document.getElementById("submit-services");

const editStateCity = document.getElementById("edit-state-city-container");
const selectState = document.getElementById("select-state");
const selectCity = document.getElementById("select-city");
const submitStateCity = document.getElementById("submit-state-city");

const editImage = document.getElementById("edit-image-container");
const inputImage = document.getElementById("input-image");
const submitImage = document.getElementById("submit-image");

const imagem = document.getElementById("img");
const fullname = document.getElementById("fullname");
const specialtie = document.getElementById("specialtie");
const avaliability = document.getElementById("avaliability");
const services = document.getElementById("services");

// Add the user data to the profile
imagem.src = usuarioDados.serviceProfile.serviceImg;
specialtie.textContent = usuarioDados.serviceProfile.specialties;
fullname.textContent = usuarioDados.fullName;
services.textContent = usuarioDados.serviceProfile.services;
avaliability.textContent = usuarioDados.serviceProfile.avaliability;

// Controll variables
let editProfileClicked = false;

// Show the edit profile interface
openProfileButton.addEventListener("click", () => {
  editProfileClicked = true;
  closeEditProfileButton.style.display = "block";
  editContainer.style.display = "flex";
  editContainer.classList.remove("edit-container-animation-out");
  editContainer.classList.add("edit-container-animation-in");
});

// Change to the name editing interface
editFullNameButton.addEventListener("click", () => {
  header.style.display = "none";
  options.style.display = "none";
  botaoVoltar.style.display = "flex";
  editName.style.display = "flex";
});

editSpecialtieButton.addEventListener("click", () => {
  window.location.href = "categories.html";
});

editAvaliabilityButton.addEventListener("click", () => {
  header.style.display = "none";
  options.style.display = "none";
  botaoVoltar.style.display = "flex";
  editAvaliability.style.display = "flex";
});

// Change to the services editing interface
editServicesButton.addEventListener("click", () => {
  header.style.display = "none";
  options.style.display = "none";
  botaoVoltar.style.display = "flex";
  editServices.style.display = "flex";
});

// Change to the state and city editing interface
editStateCityButton.addEventListener("click", () => {
  header.style.display = "none";
  options.style.display = "none";
  botaoVoltar.style.display = "flex";
  editStateCity.style.display = "flex";
});

// Change to the image editing interface
editImageButton.addEventListener("click", () => {
  header.style.display = "none";
  options.style.display = "none";
  botaoVoltar.style.display = "flex";
  editImage.style.display = "flex";
});

// Return to the options interface
botaoVoltar.addEventListener("click", () => {
  botaoVoltar.style.display = "none";
  editName.style.display = "none";
  editAvaliability.style.display = "none";
  editServices.style.display = "none";
  editStateCity.style.display = "none";
  editImage.style.display = "none";
  header.style.display = "block";
  options.style.display = "block";
});

// Close the edit profile interface
closeEditProfileButton.addEventListener("click", () => {
  editProfileClicked = false;
  editContainer.classList.remove("edit-container-animation-in");
  editContainer.classList.add("edit-container-animation-out");
});

// Submit the new name
submitName.addEventListener("click", () => {
  const newNameInput = inputName.value;
  const newName = updateUserName(userLoggedId, newNameInput);

  if (!newName) return;

  fullname.textContent = newName;
  inputName.value = "";
});

// Submit the new user avaliability
submitAvaliability.addEventListener("click", () => {
  const newAvaliabilityInput = inputAvaliability.value;
  const newAvaliability = updateUserAvaliability(userLoggedId, newAvaliabilityInput);

  if (!newAvaliability) return;

  avaliability.textContent = newAvaliability;
  inputAvaliability.value = "";
});

// Submit the new user services
submitServices.addEventListener("click", () => {
  const newServicesInput = textareaServices.value;
  const newServices = updateUserServices(userLoggedId, newServicesInput);

  if (!newServices) return;

  services.textContent = newServices;
  textareaServices.value = "";
});

submitStateCity.addEventListener("click", () => {
  const newCity = selectCity.value;
  const newState = selectState.value;

  if (!newCity || !newState) {
    toastr.error("Selecione um estado e uma cidade.");
    return;
  }

  updateLocation(userLoggedId, newState, newCity);

  toastr.success("Cidade e estado atualizados com sucesso.");
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

// Submit the new service image
submitImage.addEventListener("click", () => {
  const serviceImgFile = inputImage.files[0];
  updateServiceImg(userLoggedId, serviceImgFile);
  imagem.src = URL.createObjectURL(serviceImgFile);
});

const displayEditProfile = () => {
  if (window.innerWidth > 700) {
    editContainer.style.display = "flex";
    closeEditProfileButton.style.display = "none";
    openProfileButton.style.display = "none";
    editContainer.classList.remove("edit-container-animation-out");
  } else {
    openProfileButton.style.display = "block";
    closeEditProfileButton.style.display = "block";
    if (!editProfileClicked) {
      editContainer.classList.remove("edit-container-animation-in");
      editContainer.style.display = "none";
    } else {
      editContainer.style.display = "flex";
    }
  }
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

window.addEventListener("resize", displayEditProfile);

await createStatesOptions();
displayEditProfile();
