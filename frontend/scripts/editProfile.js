import { userLoggedId } from "../../backend/createUserSession.js"; 
import {
  getUserData,
  updateUserName,
  updateUserAvaliability,
  updateUserServices,
  updateServiceImg,
} from "../../backend/user.js";

const usuarioDados = getUserData(userLoggedId);

const opcoesDiv = document.getElementById("options");
const editFullNameButton = document.getElementById("edit-name");
const editSpecialtieButton = document.getElementById("edit-specialtie");
const editAvaliabilityButton = document.getElementById("edit-avaliability");
const editServicesButton = document.getElementById("edit-services");
const editImageButton = document.getElementById("edit-image");

const home = document.getElementById("home");
const botaoVoltar = document.getElementById("voltar");

const editName = document.getElementById("edit-name-container");
const inputName = document.getElementById("input-name");
const submitName = document.getElementById("submit-name");

const editAvaliability = document.getElementById("edit-avaliability-container");
const inputAvaliability = document.getElementById("input-avaliability");
const submitAvaliability = document.getElementById("submit-avaliability");

const editServices = document.getElementById("edit-services-container");
const textareaServices = document.getElementById("textarea-services");
const submitServices = document.getElementById("submit-services");

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

// Change to the name editing interface
editFullNameButton.addEventListener("click", () => {
  home.style.display = "none";
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editName.style.display = "flex";
});

editSpecialtieButton.addEventListener("click", () => {
  window.location.href = "categories.html";
});

editAvaliabilityButton.addEventListener("click", () => {
  home.style.display = "none";
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editAvaliability.style.display = "flex";
});

// Change to the services editing interface
editServicesButton.addEventListener("click", () => {
  home.style.display = "none";
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editServices.style.display = "flex";
});

// Change to the image editing interface
editImageButton.addEventListener("click", () => {
  home.style.display = "none";
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editImage.style.display = "flex";
});

// Return to the options interface
botaoVoltar.addEventListener("click", () => {
  location.reload();
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
  const newAvaliability = updateUserAvaliability(
    userLoggedId,
    newAvaliabilityInput
  );

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

// Submit the new service image
submitImage.addEventListener("click", () => {
  const serviceImgFile = inputImage.files[0];
  updateServiceImg(userLoggedId, serviceImgFile);
  imagem.src = URL.createObjectURL(serviceImgFile);
});
