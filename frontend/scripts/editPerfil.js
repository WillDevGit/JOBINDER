import {
  getUser,
  userLogged,
  getUserData,
  updateUserName,
  updateUserServices,
} from "../../backend/user.js";

const user = userLogged();
const usuarioDados = getUserData(userLogged());

const opcoesDiv = document.getElementById("options");
const editNameButton = document.getElementById("edit-name");
const editDescriptionButton = document.getElementById("edit-description");

const botaoVoltar = document.getElementById("voltar");

const editName = document.getElementById("edit-name-container");
const inputName = document.getElementById("input-name");
const submitName = document.getElementById("submit-name");

const editDescription = document.getElementById("edit-description-container");
const textareaDescription = document.getElementById("textarea-description");
const submitDescription = document.getElementById("submit-description");

const imagem = document.getElementById("img");
const nome = document.getElementById("name");
const specialtie = document.getElementById("specialtie");
const avaliability = document.getElementById("avaliability");
const descricao = document.getElementById("description");

// Adiciona dados do perfil do usuario no card
//alterar src imagem de fundo
imagem.src = usuarioDados.serviceProfile.serviceImg;
specialtie.textContent = "Especialidade: " + usuarioDados.serviceProfile.specialties;
nome.textContent = usuarioDados.fullName;
descricao.textContent = usuarioDados.serviceProfile.services;
avaliability.textContent = "Disponibilidade: " + usuarioDados.serviceProfile.avaliability;

// Mudar para interface de edição do nome
editNameButton.addEventListener("click", () => {
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editName.style.display = "flex";
});

// Mudar para interface de edição da descrição
editDescriptionButton.addEventListener("click", () => {
  opcoesDiv.style.display = "none";
  botaoVoltar.style.display = "flex";
  editDescription.style.display = "flex";
});

// Volta para o menu de opções
botaoVoltar.addEventListener("click", () => {
  location.reload();
});

submitName.addEventListener("click", () => {
  const newName = inputName.value;
  if (newName === "") return;
  updateUserName(user, newName);
  nome.textContent = newName;
  inputName.value = "";
});

submitDescription.addEventListener("click", () => {
  const newDescription = textareaDescription.value;
  if (newDescription === "") return;
  updateUserServices(user, newDescription);
  descricao.textContent = newDescription.value;
  textareaDescription.value = "";
});

console.log(getUserData(user));
