import {
  userLogged,
  getUserData,
  getUsersMatchedId,
  deleteUserInUsersMatchedId,
} from "../../backend/user.js";

// Delete user matched DOM Elements
const deleteUserMatchedAside = document.getElementById(
  "delete-user-matched-aside"
);
const deleteUserMatchedFullname = document.getElementById(
  "delete-user-matched-fullname"
);
const cancelDeleteButton = document.getElementById("cancel-delete");
const confirmDeleteButton = document.getElementById("confirm-delete");

// Data
const userLoggedId = userLogged();
let usersMatchedId = getUsersMatchedId(userLoggedId);

// Control variables
let userMatchedToBeDeleted = null;



const createChatDOM = (id, userMatchedData) => {
  const chatContainer = document.getElementById("chat-container");

  const box = document.createElement("div");
  box.classList.add("chat-box");

  const img = document.createElement("img");
  img.src = userMatchedData.serviceProfile.serviceImg;
  img.classList.add("profile-img");

  const profileNameSpan = document.createElement("span");
  profileNameSpan.textContent = userMatchedData.fullName;
  profileNameSpan.classList.add("profile-name");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    event.stopPropagation(); 
    deleteUserMatchedAside.style.display = "flex";
    deleteUserMatchedFullname.textContent = userMatchedData.fullName + "?";
    userMatchedToBeDeleted = id;
  });
  
  box.appendChild(img);
  box.appendChild(profileNameSpan);
  box.appendChild(deleteButton);
  chatContainer.appendChild(box);
  handleChatClick();
  
};

const cleanChat = () => {
  const chatContainer = document.getElementById("chat-container");
  while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
};

const updateChat = () => {
  cleanChat();
  usersMatchedId = getUsersMatchedId(userLoggedId);
  usersMatchedId.forEach((id) => {
    const userMatchedData = getUserData(id);
    createChatDOM(id, userMatchedData);
  });
};

const deleteUserMatched = (id) => {
  deleteUserInUsersMatchedId(userLoggedId, id);
  userMatchedToBeDeleted = null;
  updateChat();
  deleteUserMatchedAside.style.display = "none";
};

cancelDeleteButton.addEventListener("click", () => {
  deleteUserMatchedAside.style.display = "none";
});

confirmDeleteButton.addEventListener("click", () =>
  deleteUserMatched(userMatchedToBeDeleted)
);

usersMatchedId.forEach((id) => {
  const userMatchedData = getUserData(id);
  createChatDOM(id, userMatchedData);
});

const createChat = () => {
  localStorage
}




// Adiciona um evento de clique para cada elemento na coleção
function handleChatClick() {
  // Converte a lista de elementos com a classe "chat-box" em um array
  
  const chatList = Array.from(document.getElementsByClassName("chat-box"));
  
  // Para cada elemento do array (cada chatBox), adiciona o evento de clique
  chatList.forEach(chatBox => {
      chatBox.addEventListener("click", () => {
          const chat = document.getElementsByClassName("chat");
          const privateChat = document.getElementsByClassName("private-chat");

          // Esconde o chat público e mostra o chat privado
          if (chat.length > 0 && privateChat.length > 0) {
              chat[0].style.display = "none";
              privateChat[0].style.display = "flex";
          }
      });
  });
}

// Chama a função para aplicar o comportamento nos elementos de chat

const botaoVoltar = document.getElementById("btn-back");

botaoVoltar.addEventListener("click", () => {
  const chat = document.getElementsByClassName("chat"); 
  const privateChat = document.getElementsByClassName("private-chat"); 
  chat[0].style.display = "flex"; 
  privateChat[0].style.display = "none"; 
});

export { updateChat };
