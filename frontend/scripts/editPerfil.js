import { getUser, userLogged, getUserData, updateUserName, updateUserServices } from "../../backend/user.js";

// Pegar id dos elementos
const user = userLogged();
const usuarioDados = getUserData(userLogged()); 
const imagem = document.getElementById("imagem"); 
const nome = document.getElementById("nomeCard"); 
const descricao = document.getElementById("descricao"); 
const nomeButtonEdit = document.getElementById("editNome"); 
const descButtonEdit = document.getElementById("editDesc"); 
const opcoesDiv = document.getElementById("opcoes"); 
const botaoVoltar = document.getElementById("voltar"); 
const novoNome = document.getElementById("input-name"); 
const novaDescricao = document.getElementById("input-descricao"); 
const submitNome = document.getElementById("submit-nome");
const submitDesc = document.getElementById("submit-desc");


// Adiciona dados do perfil do usuario no card 
imagem.style.backgroundImage = `url(${usuarioDados.serviceProfile.serviceImg})`;
nome.innerHTML = usuarioDados.fullName; 
descricao.innerHTML = usuarioDados.serviceProfile.services; 

// Mudar para interface de edição do nome
nomeButtonEdit.addEventListener("click" , () => {
    const editarNome = document.getElementById("interfaceNome"); 
    const caixaVoltar = document.getElementById("botaoVoltar")
    opcoesDiv.style.display = "none";
    caixaVoltar.style.display= "block"
    editarNome.style.display = "block"; 

}); 

// Mudar para interface de edição da descrição
descButtonEdit.addEventListener("click" , () => {
    const editarDesc = document.getElementById("interfaceDesc"); 
    const caixaVoltar = document.getElementById("botaoVoltar");
    opcoesDiv.style.display = "none";
    caixaVoltar.style.display= "block"
    editarDesc.style.display = "block"; 
}); 

// Volta para o menu de opções
botaoVoltar.addEventListener("click", () => {
    location.reload();
}); 

submitNome.addEventListener("click", ()=> {
    updateUserName(user, novoNome.value);
    nome.innerHTML = novoNome.value;
}); 

submitDesc.addEventListener("click", ()=>{
    updateUserServices(user, novaDescricao.value);
    descricao.innerHTML = novaDescricao.value;
}); 


console.log( getUserData(user));


