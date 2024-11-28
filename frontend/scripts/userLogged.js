import { userLoggedId } from "../../backend/createUserSession.js";
import { getUserData } from "../../backend/user.js";

// Get the elements from the DOM
const exit = document.getElementById("exit");
const login = document.getElementById("login");
const register = document.getElementById("register");
const createServiceProfile = document.getElementById("create-service-profile");
const enterProfilePro = document.getElementById("enter-profile-pro");

const isUserLogged = userLoggedId !== -1;

// Show the elements according to the user logged
exit.style.display = isUserLogged ? "block" : "none";
login.style.display = isUserLogged ? "none" : "block";
register.style.display = isUserLogged ? "none" : "block";
createServiceProfile.style.display = isUserLogged ? "block" : "none";

// Add the click event to the exit button
exit.addEventListener("click", () => {
  sessionStorage.removeItem("userLogged");
  localStorage.removeItem("userLogged");

  exit.style.display = "none";
  login.style.display = "block";
  register.style.display = "block";
  createServiceProfile.style.display = "none";
  enterProfilePro.style.display = "none";
});

const userData = getUserData(userLoggedId);

// If the user has a service profile, show the enter profile button
if (userData && userData.serviceProfile && Object.keys(userData.serviceProfile).length > 1) {
  createServiceProfile.style.display = "none";
  enterProfilePro.style.display = "block";
  enterProfilePro.href = "./editProfile.html";
}
