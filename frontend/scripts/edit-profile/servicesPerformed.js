import { userLoggedId } from "../../../backend/createUserSession.js";
import { getUserRates } from "../../../backend/rate.js";
import { getUserData } from "../../../backend/user.js";

const editContainer = document.getElementById("edit-container");

const chat = document.getElementById("chat");

const openServicesPerformed = document.getElementById("open-services-performed");
const servicesPerformed = document.getElementById("services-performed");
const servicesPerformedContainer = document.getElementById("services-performed-container");
const closeServicesPerformed = document.getElementById("close-services-performed");


const userLoggedRates = getUserRates(userLoggedId);

openServicesPerformed.addEventListener("click", () => {
  servicesPerformed.style.display = "flex";
  chat.style.display = "none";
  if(window.innerWidth <= 700) {
    editContainer.style.display = "none";
  }
});

closeServicesPerformed.addEventListener("click", () => {
  servicesPerformed.style.display = "none";
});

userLoggedRates.forEach((data) => {
  const { raterId } = data;

  let userName = null;
  let userImg = null;

  if (raterId === -1) {
    userName = "Visitante";
    userImg = "../images/no-service.jpg.webp";
  } else {
    const userData = getUserData(raterId);

    if (!userData.serviceProfile) userImg = "../images/no-service.jpg.webp";
    else userImg = userData.serviceProfile.serviceImg;

    const fullName = userData.fullName.split(" ");
    const firstName = fullName.length > 1 ? fullName[0].charAt(0).toUpperCase() + "." : fullName[0];
    const lastName = fullName.length > 1 ? fullName[fullName.length - 1] : "";
    userName = `${firstName} ${lastName}`;
  }

  const service = document.createElement("div");
  service.classList.add("service-performed");

  const image = document.createElement("img");
  image.classList.add("image");
  image.src = userImg;

  const name = document.createElement("span");
  name.classList.add("name");
  name.textContent = userName;

  service.appendChild(image);
  service.appendChild(name);
  servicesPerformedContainer.appendChild(service);
});
