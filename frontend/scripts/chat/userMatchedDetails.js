import { getUserData } from "../../../backend/user.js";

const userMatchedDetails = document.getElementById("user-matched-details");
const closeUserMatchedDetails = document.getElementById("close-user-matched-details");
const userMatchedDetailsServiceImg = document.getElementById("user-matched-details-service-img");
const usermatchedDetailsFullName = document.getElementById("user-matched-details-fullname");
const userMatchedDetailsSpecialties = document.getElementById("user-matched-details-specialties");
const userMatchedDetailsAvaliability = document.getElementById("user-matched-details-avaliability");
const userMatchedDetailsServices = document.getElementById("user-matched-details-services");
const userMatchedDetailsCellphone = document.getElementById("user-matched-details-cellphone");
const userMatchedDetailsState = document.getElementById("user-matched-details-state");
const userMatchedDetailsCity = document.getElementById("user-matched-details-city");

closeUserMatchedDetails.addEventListener("click", () => {
  userMatchedDetails.style.display = "none";
});

export const showUserMatchedDetails = async (userMatchedId) => {
  const userMatchedData = getUserData(userMatchedId);

  if (!userMatchedData) return;

  userMatchedDetails.style.display = "flex";

  userMatchedDetailsServiceImg.src = userMatchedData.serviceProfile.serviceImg;
  usermatchedDetailsFullName.textContent = userMatchedData.fullName;
  userMatchedDetailsSpecialties.textContent = userMatchedData.serviceProfile.specialties;
  userMatchedDetailsAvaliability.textContent = userMatchedData.serviceProfile.avaliability;
  userMatchedDetailsServices.textContent = userMatchedData.serviceProfile.services;
  userMatchedDetailsCellphone.textContent = userMatchedData.cellphone;
  userMatchedDetailsState.textContent = userMatchedData.serviceProfile.location.state;
  userMatchedDetailsCity.textContent = userMatchedData.serviceProfile.location.city;
};
