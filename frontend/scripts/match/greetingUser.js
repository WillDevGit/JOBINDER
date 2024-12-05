import { userLoggedId } from "../../../backend/createUserSession.js";
import { getUserData } from "../../../backend/user.js";

const greetingUser = document.getElementById("greeting-user");

const user = getUserData(userLoggedId);
const userFirstName = userLoggedId !== -1 ? user.fullName.split(" ")[0] : "Visitante";

greetingUser.textContent = `Olá, ${userFirstName}!`;
