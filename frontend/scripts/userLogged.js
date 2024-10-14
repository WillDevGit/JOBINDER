import { userLogged, getUserData } from "../../backend/user.js";

// Get the elements from the DOM
const exit = document.getElementById("exit");
const login = document.getElementById("login");
const register = document.getElementById("register");
const createServiceProfile = document.getElementById("create-service-profile");
const enterProfilePro = document.getElementById("enter-profile-pro");


// Get the user logged 
const user = userLogged();

// Show the elements according to the user logged
exit.style.display = user ? "block" : "none";
login.style.display = user ? "none" : "block";
register.style.display = user ? "none" : "block";
createServiceProfile.style.display = user ? "block" : "none";

// Add the click event to the exit button
exit.addEventListener("click", () => {
  localStorage.removeItem("userLogged");
  exit.style.display = "none";
  login.style.display = "block";
  register.style.display = "block";
  createServiceProfile.style.display = "none";
  enterProfilePro.style.display = "none";

});

const dadosUsuarios = getUserData(user); 

if (dadosUsuarios.serviceProfile) {
  // Se o perfil foi criado, esconde o link de criar e mostra o de entrar
  createServiceProfile.style.display = "none";
  enterProfilePro.style.display = "block";
  enterProfilePro.href = "#"; // Atualiza o href se necessário
}