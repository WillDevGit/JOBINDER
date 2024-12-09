import { userLoggedId } from "../../../backend/createUserSession.js";
import { chatUserMatchedId } from "./chat.js";
import { getUserData } from "../../../backend/user.js";
import { addHire } from "../../../backend/hire.js";

const hireChat = document.getElementById("hire-chat");
const endChat = document.getElementById("end-chat");

const hireChatAside = document.getElementById("hire-chat-aside");
const matchedFullName = document.getElementById("hire-chat-matched-fullname");
const cancelHireChat = document.getElementById("cancel-hire-chat");
const confirmHireChat = document.getElementById("confirm-hire-chat");

let userMatched = null;

hireChat.addEventListener("click", () => {
  if (chatUserMatchedId === -1) return;
  
  userMatched = getUserData(chatUserMatchedId);

  matchedFullName.textContent =
    chatUserMatchedId !== -1 ? userMatched.fullName + "?" : "Visitante (São Paulo)?";

  hireChatAside.style.display = "flex";
});

confirmHireChat.addEventListener("click", () => {
  addHire(chatUserMatchedId, userLoggedId);

  endChat.style.display = "block";
  hireChat.style.display = "none";
  hireChatAside.style.display = "none";
});

cancelHireChat.addEventListener("click", () => {
  hireChatAside.style.display = "none";
  userMatched = null;
});
