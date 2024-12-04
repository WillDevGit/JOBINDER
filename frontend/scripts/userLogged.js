import { userLoggedId } from "../../backend/createUserSession.js";
import { getUserData } from "../../backend/user.js";

// Get the elements from the Home DOM
const login = document.getElementById("login");
const register = document.getElementById("register");
const createServiceProfile = document.getElementById("create-service-profile");
const serviceProfile = document.getElementById("service-profile");
const userLoggedContainer = document.getElementById("user-logged-container");
const userLoggedImg = document.getElementById("user-logged-img");
const userLoggedName = document.getElementById("user-logged-name");
const exit = document.getElementById("exit");

const userData = getUserData(userLoggedId);
const isUserLogged = userLoggedId !== -1;

// Show the elements according to the user logged
login.style.display = isUserLogged ? "none" : "block";
register.style.display = isUserLogged ? "none" : "block";
exit.style.display = isUserLogged ? "block" : "none";
userLoggedContainer.style.display = isUserLogged ? "flex" : "none";
createServiceProfile.style.display = isUserLogged ? "block" : "none";

// If the user has a service profile, show the enter profile button
const userHasServiceProfile = () => {
  if (userData && userData.serviceProfile && Object.keys(userData.serviceProfile).length > 1) {
    createServiceProfile.style.display = "none";
    serviceProfile.style.display = "block";
    userLoggedContainer.style.display = "flex";
    userLoggedImg.src = userData.serviceProfile.serviceImg;
    userLoggedName.textContent = userData.fullName.split(" ")[0];
  }
  else if(userData) {
    userLoggedImg.src = "../images/no-service.jpg.webp";
    userLoggedName.textContent = userData.fullName.split(" ")[0];
  }
};

// Add the click event to the exit button
exit.addEventListener("click", () => {
  sessionStorage.removeItem("userLogged");
  localStorage.removeItem("userLogged");

  login.style.display = "block";
  register.style.display = "block";

  createServiceProfile.style.display = "none";
  serviceProfile.style.display = "none";
  userLoggedContainer.style.display = "none";
  exit.style.display = "none";
});

userHasServiceProfile();
