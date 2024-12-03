const openChatButton = document.getElementById("open-chat");
const chat = document.getElementById("chat");
const closeChatButton = document.getElementById("close-chat");

// Control variables
let openChat = false;

const displayChat = () => {
  if (window.innerWidth > 900) {
    openChatButton.style.display = "none";
    closeChatButton.style.display = "none";
    chat.style.display = "flex";
  } 
  else {
    openChatButton.style.display = "block";
    if (!openChat) {
      chat.style.display = "none";
    } else {
      closeChatButton.style.display = "block";
      chat.style.display = "flex";
    }
  }
};

openChatButton.addEventListener("click", () => {
  openChat = true;
  closeChatButton.style.display = "block";
  chat.style.display = "flex";
});

closeChatButton.addEventListener("click", () => {
  openChat = false;
  closeChatButton.style.display = "none";
  chat.style.display = "none";
});

window.addEventListener("resize", displayChat);

displayChat();
