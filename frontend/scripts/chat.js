import { userLoggedId } from "../../backend/createUserSession.js";
import {
  getUserData,
  getUsersMatchedId,
  deleteUserInUsersMatchedId,
  getChatMessages,
  addChatMessage,
} from "../../backend/user.js";

// Match DOM Elements
const newMatchesCounter = document.getElementById("new-matches-counter");

// Chat DOM Elements
const chatContainer = document.getElementById("chat-container");
const privateChat = document.getElementById("private-chat");
const chatMessagesContainer = document.getElementById(
  "chat-messages-container"
);
const exitPrivateChat = document.getElementById("close-private-chat");
const userMatchedServiceImg = document.getElementById(
  "user-matched-service-img"
);
const userMatchedFullname = document.getElementById("user-matched-fullname");
const textAreaChat = document.getElementById("textarea-chat");
const sendMessageForm = document.getElementById("send-message-form");

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
let usersMatchedId = getUsersMatchedId(userLoggedId);

// Control variables
let userMatchedToBeDeleted = null;
let chatUserMatchedId = null;

const createChatDOM = (userMatchedId, userMatchedData) => {
  const box = document.createElement("div");
  box.classList.add("chat-box");
  box.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      chatContainer.style.display = "none";
      privateChat.style.display = "flex";
      createPrivateChat(userMatchedId);

      // Scroll to the last message
      const allMessageDivs = document.querySelectorAll(".message");
      const lastMessageDiv = allMessageDivs[allMessageDivs.length - 1];
      if (allMessageDivs.length > 0) lastMessageDiv.scrollIntoView();
    }
  });

  const img = document.createElement("img");
  img.classList.add("profile-img");

  if (!userMatchedData || !userMatchedData.serviceProfile)
    img.src = "../images/no-service.jpg.webp";
  else img.src = userMatchedData.serviceProfile.serviceImg;

  const nameMessageDiv = document.createElement("div");
  nameMessageDiv.classList.add("name-last-message");

  const profileNameSpan = document.createElement("span");
  profileNameSpan.classList.add("profile-name");
  profileNameSpan.textContent = !userMatchedData
    ? "(Usuário não cadastrado)"
    : userMatchedData.fullName;

  const lastMessageSpan = document.createElement("span");
  lastMessageSpan.classList.add("last-message");
  const messages = getChatMessages(userLoggedId, userMatchedId);
  if (messages.length === 0) lastMessageSpan.textContent = "";
  else {
    const lastMessage = messages[messages.length - 1].message;
    lastMessageSpan.textContent =
      lastMessage.length > 20 ? lastMessage.slice(0, 20) + "..." : lastMessage;
  }

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteUserMatchedAside.style.display = "flex";
    deleteUserMatchedFullname.textContent =
      userMatchedData === null
        ? "(Usuário não cadastrado)?"
        : userMatchedData && userMatchedData.fullName + "?";
    userMatchedToBeDeleted = userMatchedId;
  });

  const newUserMatchedSpan = document.createElement("span");
  newUserMatchedSpan.classList.add("new-user-matched"); 

  box.appendChild(img);
  box.appendChild(nameMessageDiv);
  nameMessageDiv.appendChild(profileNameSpan);
  nameMessageDiv.appendChild(lastMessageSpan);
  box.appendChild(deleteButton);
  box.appendChild(newUserMatchedSpan);
  chatContainer.appendChild(box);
};

const cleanChatBoxes = () => {
  while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
};

const updateChat = () => {
  usersMatchedId = getUsersMatchedId(userLoggedId);
  cleanChatBoxes();
  usersMatchedId.forEach((userMatchedId) => {
    const userMatchedData = getUserData(userMatchedId);
    createChatDOM(userMatchedId, userMatchedData);
  });
};

const deleteUserMatched = (userMatchedId) => {
  deleteUserInUsersMatchedId(userLoggedId, userMatchedId);
  userMatchedToBeDeleted = null;
  updateChat();
  deleteUserMatchedAside.style.display = "none";
};

const cleanChatMessages = () => {
  while (chatMessagesContainer.firstChild) {
    chatMessagesContainer.removeChild(chatMessagesContainer.firstChild);
  }
};

const createPrivateChat = (userMatchedId) => {
  chatUserMatchedId = userMatchedId;

  const userMatchedData = getUserData(chatUserMatchedId);

  if (!userMatchedData) {
    userMatchedFullname.textContent = "(Usuário não cadastrado)";
    userMatchedServiceImg.src = "../images/no-service.jpg.webp";
  } else {
    userMatchedFullname.textContent =
      userMatchedData.fullName || userMatchedFullname.textContent;
    userMatchedServiceImg.src = userMatchedData.serviceProfile
      ? userMatchedData.serviceProfile.serviceImg
      : "../images/no-service.jpg.webp";
  }

  const chatMessages = getChatMessages(userLoggedId, userMatchedId);
  chatMessages.forEach((chatMessage) => {
    const message = document.createElement("div");

    if (chatMessage.sender === userLoggedId) {
      message.classList.add("sender-message");
    } else {
      message.classList.add("receiver-message");
    }

    message.classList.add("message");

    message.textContent = chatMessage.message;
    chatMessagesContainer.appendChild(message);
  });
};

cancelDeleteButton.addEventListener("click", () => {
  deleteUserMatchedAside.style.display = "none";
  userMatchedToBeDeleted = null;
});

confirmDeleteButton.addEventListener("click", () =>
  deleteUserMatched(userMatchedToBeDeleted)
);

exitPrivateChat.addEventListener("click", () => {
  chatUserMatchedId = null;
  privateChat.style.display = "none";
  chatContainer.style.display = "flex";
  while (chatMessagesContainer.firstChild) {
    chatMessagesContainer.removeChild(chatMessagesContainer.firstChild);
  }
  updateChat();
});

const maxLines = 6;
const lineHeight = 1.2 * 16;
const maxHeight = lineHeight * maxLines;
textAreaChat.addEventListener("input", () => {
  textAreaChat.style.height = "auto";
  const newHeight = Math.min(textAreaChat.scrollHeight, maxHeight);
  textAreaChat.style.height = `${newHeight}px`;
});

textAreaChat.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    if (textAreaChat.value.trim() === "") return;
    event.preventDefault();
    sendMessageForm.requestSubmit();
  }
});

sendMessageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = textAreaChat.value;

  if (message.trim() === "") return;

  textAreaChat.value = "";
  textAreaChat.style.height = "auto";
  textAreaChat.style.height = textAreaChat.scrollHeight + "px";

  addChatMessage(userLoggedId, chatUserMatchedId, message);
  cleanChatMessages();
  createPrivateChat(chatUserMatchedId);

  // Scroll to the last message
  const allMessageDivs = document.querySelectorAll(".message");
  const lastMessageDiv = allMessageDivs[allMessageDivs.length - 1];
  lastMessageDiv.scrollIntoView();
});

// Update the chat every second
setInterval(() => {
  if (chatUserMatchedId) {
    cleanChatMessages();
    createPrivateChat(chatUserMatchedId);
  }
  updateChat();
}, 1000);

updateChat();

export { updateChat };
