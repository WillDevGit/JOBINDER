import { userLoggedId } from "../../../backend/createUserSession.js";
import { chatUserMatchedId } from "./chat.js";
import { getUserData, updateServicesPerformed } from "../../../backend/user.js";
import { updateRate, userRated } from "../../../backend/rate.js";

const endChat = document.getElementById("end-chat");
const matchedFullName = document.getElementById("end-chat-matched-fullname");
const endChatAside = document.getElementById("end-chat-aside");
const cancelEndChat = document.getElementById("cancel-end-chat");
const confirmEndChat = document.getElementById("confirm-end-chat");

const rateUserMatched = document.getElementById("rate-user-matched");
const rateUserMatchedFullName = document.getElementById("rate-user-matched-fullname");
const cancelRateUserMatched = document.getElementById("cancel-rate-user-matched");
const confirmRateUserMatched = document.getElementById("confirm-rate-user-matched");

let userMatched = null;
let rate = null;
let confirmNewRate = false;

endChat.addEventListener("click", () => {
  if (chatUserMatchedId === -1) return;

  userMatched = getUserData(chatUserMatchedId);

  matchedFullName.textContent =
    chatUserMatchedId !== -1 ? userMatched.fullName + "?" : "Visitante (São Paulo)?";

  endChatAside.style.display = "flex";
});

cancelEndChat.addEventListener("click", () => {
  endChatAside.style.display = "none";
  userMatched = null;
});

confirmEndChat.addEventListener("click", () => {
  endChatAside.style.display = "none";
  rateUserMatched.style.display = "flex";
  rateUserMatchedFullName.textContent =
    chatUserMatchedId !== -1 ? userMatched.fullName + "?" : "Visitante (São Paulo)?";

  for (let i = 1; i <= 5; i++) {
    const star = document.getElementById(`rate-user-matched-star-${i}`);
    star.addEventListener("click", () => {
      rate = star.id.split("-")[4];
      for (let j = 1; j <= 5; j++) {
        const star = document.getElementById(`rate-user-matched-star-${j}`);
        if (j <= i) {
          star.classList.add("gold-star");
        } else {
          star.classList.remove("gold-star");
        }
      }
    });
  }
});

cancelRateUserMatched.addEventListener("click", () => {
  rateUserMatched.style.display = "none";
  endChatAside.style.display = "flex";
});

confirmRateUserMatched.addEventListener("click", () => {
  if (!rate) {
    toastr.error("Selecione uma avaliação.");
    return;
  }

  const userMatchedRated = userRated(userLoggedId, chatUserMatchedId);

  if (userMatchedRated && !confirmNewRate) {
    toastr.warning("Você já avaliou. Se quiser alterar a avaliação, confirme novamente.");
    confirmNewRate = true;
    return;
  }

  for (let i = 1; i <= 5; i++) {
    const star = document.getElementById(`rate-user-matched-star-${i}`);
    star.classList.remove("gold-star");
  }

  rateUserMatched.style.display = "none";
  endChatAside.style.display = "none";

  if (!userMatchedRated) updateServicesPerformed(chatUserMatchedId);

  updateRate(userLoggedId, chatUserMatchedId, rate);

  confirmNewRate = false;
});
