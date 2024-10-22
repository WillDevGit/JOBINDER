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

const createChat = (id, userMatchedData) => {
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
    deleteUserMatchedAside.style.display = "flex";
    deleteUserMatchedFullname.textContent = userMatchedData.fullName + "?";
    userMatchedToBeDeleted = id;
  });

  box.appendChild(img);
  box.appendChild(profileNameSpan);
  box.appendChild(deleteButton);
  chatContainer.appendChild(box);
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
    createChat(id, userMatchedData);
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
  createChat(id, userMatchedData);
});

export { createChat, updateChat };
