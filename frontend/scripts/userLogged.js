import { userLogged } from "../../backend/user.js";

// Get the elements from the DOM
const exit = document.getElementById("exit");
const login = document.getElementById("login");
const register = document.getElementById("register");
const createServiceProfile = document.getElementById("create-service-profile");

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
});
