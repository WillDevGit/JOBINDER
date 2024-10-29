import { userLoggedId } from "../../backend/createUserSession.js";
import { getUserData } from "../../backend/user.js";

// Get the elements from the DOM
const exit = document.getElementById("exit");
const login = document.getElementById("login");
const register = document.getElementById("register");
const createServiceProfile = document.getElementById("create-service-profile");
const enterProfilePro = document.getElementById("enter-profile-pro");

// Show the elements according to the user logged
exit.style.display = userLoggedId ? "block" : "none";
login.style.display = userLoggedId ? "none" : "block";
register.style.display = userLoggedId ? "none" : "block";
createServiceProfile.style.display = userLoggedId ? "block" : "none";

// Add the click event to the exit button
exit.addEventListener("click", () => {
  localStorage.removeItem("userLogged");
  exit.style.display = "none";
  login.style.display = "block";
  register.style.display = "block";
  createServiceProfile.style.display = "none";
  enterProfilePro.style.display = "none";

});

const dadosUsuarios = getUserData(userLoggedId); 

if (dadosUsuarios && dadosUsuarios.serviceProfile) {
  // Se o perfil foi criado, esconde o link de criar e mostra o de entrar
  createServiceProfile.style.display = "none";
  enterProfilePro.style.display = "block";
  enterProfilePro.href = "./editProfile.html"; 
}