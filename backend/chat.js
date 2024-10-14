

const createChat = (namePerfil, imagem) => {
    let box = document.createElement("div"); 

    box.classList.add("chatBox"); 

    let icon = document.createElement("div"); 
    icon.style.backgroundImage= `url(${imagem})`;
    icon.classList.add("icon-perfil"); 

    let nome = document.createElement("div"); 
    nome.innerHTML = namePerfil; 
    nome.classList.add("nome-perfil"); 

    let chatSpace = document.getElementById("chat-space"); 
    
    box.appendChild(icon); 
    box.appendChild(nome); 
    chatSpace.appendChild(box); 

}



export {
    createChat
}



