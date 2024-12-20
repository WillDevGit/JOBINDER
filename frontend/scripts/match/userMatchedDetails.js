import { getUserData } from "../../../backend/user.js";

const userMatchedDetails = document.getElementById("user-matched-details");
const closeUserMatchedDetails = document.getElementById("close-user-matched-details");
const userMatchedServicesPerformed = document.getElementById("user-matched-services-performed");
const userMatchedDetailsServiceImg = document.getElementById("user-matched-details-service-img");
const usermatchedDetailsFullName = document.getElementById("user-matched-details-fullname");
const userMatchedDetailsSpecialties = document.getElementById("user-matched-details-specialties");
const userMatchedDetailsAvaliability = document.getElementById("user-matched-details-avaliability");
const userMatchedDetailsServices = document.getElementById("user-matched-details-services");
const userMatchedDetailsCellphone = document.getElementById("user-matched-details-cellphone");
const userMatchedDetailsState = document.getElementById("user-matched-details-state");
const userMatchedDetailsCity = document.getElementById("user-matched-details-city");

let userMatchedData = null;

// Close user matched details and reset stars color
closeUserMatchedDetails.addEventListener("click", () => {
  userMatchedDetails.style.display = "none";
  const userRating = userMatchedData.rating;

  for (let i = 1; i <= userRating; i++) {
    const star = document.getElementById(`star-${i}`);
    star.style.color = "#fff";
  }
});

export const showUserMatchedDetails = async (userMatchedId) => {
  if (userMatchedId === -1) return;

  userMatchedData = getUserData(userMatchedId);
  const userRating = userMatchedData.rating;
  for (let i = 1; i <= userRating; i++) {
    const star = document.getElementById(`star-${i}`);
    star.style.color = "gold";
  }

  if (!userMatchedData) return;

  userMatchedDetails.style.display = "flex";

  userMatchedDetailsServiceImg.src = userMatchedData.serviceProfile.serviceImg;
  usermatchedDetailsFullName.textContent = userMatchedData.fullName;
  userMatchedServicesPerformed.textContent = userMatchedData.serviceProfile.servicesPerformed;
  userMatchedDetailsSpecialties.textContent = userMatchedData.serviceProfile.specialties;
  userMatchedDetailsAvaliability.textContent = userMatchedData.serviceProfile.avaliability;
  userMatchedDetailsServices.textContent = userMatchedData.serviceProfile.services;
  userMatchedDetailsCellphone.textContent = userMatchedData.cellphone;
  userMatchedDetailsState.textContent = userMatchedData.serviceProfile.location.state;
  userMatchedDetailsCity.textContent = userMatchedData.serviceProfile.location.city;
};
