import {
  userLogged,
  getUserData,
  updateUserName,
  updateUserServices,
  validUserName,
  validUserServices,
} from "../../backend/user.js";

const user = userLogged();
const usuarioDados = getUserData(userLogged());

const opcoesDiv = document.getElementById("options");
const editFullNameButton = document.getElementById("edit-name");
const editServicesButton = document.getElementById("edit-description");

const botaoVoltar = document.getElementById("voltar");

const editName = document.getElementById("edit-name-container");
const inputName = document.getElementById("input-name");
const submitName = document.getElementById("submit-name");

const editServices = document.getElementById("edit-description-container");
const textareaServices = document.getElementById("textarea-description");
const submitServices = document.getElementById("submit-description");

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

// Change to the name editing interface
editFullNameButton.addEventListener("click", () => {
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editName.style.display = "flex";
});

// Change to the services editing interface
editServicesButton.addEventListener("click", () => {
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editServices.style.display = "flex";
});

// Return to the options interface
botaoVoltar.addEventListener("click", () => {
  location.reload();
});

// Submit the new name
submitName.addEventListener("click", () => {
  const newName = inputName.value;
  const validNewName = validUserName(newName);

  if (!validNewName) return;

  updateUserName(user, newName);
  fullname.textContent = newName;
  inputName.value = "";
});

// Submit the new services
submitServices.addEventListener("click", () => {
  const newServices = textareaServices.value;
  const validNewServices = validUserServices(newServices);

  if (!validNewServices) return;

  updateUserServices(user, newServices);
  services.textContent = newServices;
  textareaServices.value = "";
});