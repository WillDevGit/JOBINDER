import {
  userLogged,
  getUserData,
  updateUserName,
  updateUserServices,
  updateServiceImg,
  validUserName,
  validUserServices,
} from "../../backend/user.js";

const userLoggedCell = userLogged();
const usuarioDados = getUserData(userLogged());

const opcoesDiv = document.getElementById("options");
const editFullNameButton = document.getElementById("edit-name");
const editSpecialtieButton = document.getElementById("edit-specialtie");
const editServicesButton = document.getElementById("edit-description");
const editImageButton = document.getElementById("edit-image");

const home = document.getElementById("home");
const botaoVoltar = document.getElementById("voltar");

const editName = document.getElementById("edit-name-container");
const inputName = document.getElementById("input-name");
const submitName = document.getElementById("submit-name");

const editServices = document.getElementById("edit-description-container");
const textareaServices = document.getElementById("textarea-description");
const submitServices = document.getElementById("submit-description");

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
  const newName = inputName.value;
  const validNewName = validUserName(newName);

  if (!validNewName) return;

  const newNameCaptalized = newName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  updateUserName(userLoggedCell, newNameCaptalized);
  fullname.textContent = newNameCaptalized;
  inputName.value = "";
});

// Submit the new services
submitServices.addEventListener("click", () => {
  const newServices = textareaServices.value;
  const validNewServices = validUserServices(newServices);

  if (!validNewServices) return;

  updateUserServices(userLoggedCell, newServices);
  services.textContent = newServices;
  textareaServices.value = "";
});

// Submit the new image
submitImage.addEventListener("click", () => {
  const serviceImgFile = inputImage.files[0];
  updateServiceImg(userLoggedCell, serviceImgFile);
  imagem.src = URL.createObjectURL(serviceImgFile);
});
