import {
  userLogged,
  getUserData,
  getUsersMatchedId,
  deleteUserInUsersMatchedId,
  getChatMessages,
  addChatMessage,
} from "../../backend/user.js";

// Chat DOM Elements
const chatContainer = document.getElementById("chat-container");
const privateChat = document.getElementById("private-chat");
const chatMessagesContainer = document.getElementById(
  "chat-messages-container"
);
const exitPrivateChat = document.getElementById("exit-private-chat");
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
const userLoggedId = userLogged();
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
    }
  });

  const img = document.createElement("img");
  if (
    !userMatchedData.serviceProfile ||
    !userMatchedData.serviceProfile.serviceImg
  ) {
    img.src = "../images/no-service.jpg.webp";
  } else {
    img.src = userMatchedData.serviceProfile.serviceImg;
  }
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
    userMatchedToBeDeleted = userMatchedId;
  });

  box.appendChild(img);
  box.appendChild(profileNameSpan);
  box.appendChild(deleteButton);
  chatContainer.appendChild(box);
};

const cleanChatBoxes = () => {
  while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
};

const updateChat = () => {
  cleanChatBoxes();
  usersMatchedId = getUsersMatchedId(userLoggedId);
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
  textAreaChat.value = "";
  textAreaChat.style.height = "auto";
  textAreaChat.style.height = textAreaChat.scrollHeight + "px";
  addChatMessage(userLoggedId, chatUserMatchedId, message);
  cleanChatMessages();
  createPrivateChat(chatUserMatchedId);
});

usersMatchedId.forEach((userMatchedId) => {
  const userMatchedData = getUserData(userMatchedId);
  createChatDOM(userMatchedId, userMatchedData);
});

export { updateChat };
