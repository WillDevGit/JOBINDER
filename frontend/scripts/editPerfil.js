import { getUser, userLogged, updateUser, getUserData } from "../../backend/user.js";

// Pegar id dos elementos
const user = userLogged();
const usuarioDados = getUserData(userLogged()); 
const imagem = document.getElementById("imagem"); 
const nome = document.getElementById("nomeCard"); 
const descricao = document.getElementById("descricao"); 
const nomeButtonEdit = document.getElementById("editNome"); 
const descButtonEdit = document.getElementById("editDesc"); 
const opcoesDiv = document.getElementById("opcoes"); 

// Adiciona dados do perfil do usuario no card 
imagem.style.backgroundImage = `url(${usuarioDados.serviceProfile.serviceImg})`;
nome.innerHTML = usuarioDados.fullName; 
descricao.innerHTML = usuarioDados.serviceProfile.services; 

// 
nomeButtonEdit.addEventListener("click" , () => {
    const editarNome = document.getElementById("interfaceNome"); 
    opcoesDiv.style.display = "none";
    editarNome.style.display = "block"; 

}); 

descButtonEdit.addEventListener("click" , () => {
    const editarDesc = document.getElementById("interfaceDesc"); 
    opcoesDiv.style.display = "none";
    editarDesc.style.display = "block"; 
}); 



