import { getUser, userLogged, updateUser, getUserData } from "../../backend/user.js";

const user = userLogged();
const usuarioDados = getUserData(userLogged()); 
const editarImg = document.getElementById("imagem"); 
const editarnome = document.getElementById("nomeCard"); 
const editarDesc = document.getElementById("descricao"); 

editarImg.style.backgroundImage = `url(${usuarioDados.serviceProfile.serviceImg})`;
editarnome.innerHTML = usuarioDados.fullName; 
editarDesc.innerHTML = usuarioDados.serviceProfile.services; 



console.log(usuarioDados)