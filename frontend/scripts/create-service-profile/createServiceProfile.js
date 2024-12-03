import { userLoggedId } from "../../../backend/createUserSession.js";
import { getUser, updateUser, validUserServices } from "../../../backend/user.js";
import { getStateName } from "../../../backend/location.js";
import { createStateOptions, createCityOptions } from "../locationComponents.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Get the form elements
  const formServiceProfile = document.getElementById("form-service-profile");
  const specialties = document.getElementById("specialties");
  const inputServices = document.getElementById("input-services");
  const inputAvaliability = document.getElementById("input-avaliability");
  const selectState = document.getElementById("select-state");
  const selectCity = document.getElementById("select-city");
  const inputServiceImg = document.getElementById("input-service-img");

  // Get the user data
  const user = getUser(userLoggedId);

  // Fill the form fields with the user data
  specialties.textContent = user.serviceProfile.specialties;

  if (user.serviceProfile.services) inputServices.value = user.serviceProfile.services;

  if (user.serviceProfile.avaliability) inputAvaliability.value = user.serviceProfile.avaliability;

  await createStateOptions(selectState); // Create the states options

  // Add the change event to the selectState
  selectState.addEventListener("change", async () => {
    await createCityOptions(selectState.value, selectCity);
  });

  // Add the submit event to the form
  formServiceProfile.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get the form data
    const services = inputServices.value;
    const avaliability = inputAvaliability.value;
    const serviceImgFile = inputServiceImg.files[0];

    if (!validUserServices(services)) return;

    if (avaliability === "") {
      toastr.error('O campo "Disponibilidade" é obrigatório.');
      return;
    }

    if (selectState.value === "") {
      toastr.error('O campo "Estado" é obrigatório.');
      return;
    }

    if (selectCity.value === "") {
      toastr.error('O campo "Cidade" é obrigatório.');
      return;
    }

    if (!serviceImgFile) {
      toastr.error('O campo "Imagem do Serviço" é obrigatório.');
      return;
    }

    const stateName = await getStateName(selectState.value);

    // Parse the image to Base64
    const reader = new FileReader();
    reader.onload = function (event) {
      const serviceImgBase64 = event.target.result;

      // Update the user object
      user.serviceProfile.serviceImg = serviceImgBase64;
      user.serviceProfile.servicesPerformed = 0;
      user.serviceProfile.avaliability = avaliability;
      user.serviceProfile.services = services;
      user.serviceProfile.location = {};
      user.serviceProfile.location.state = stateName;
      user.serviceProfile.location.city = selectCity.value;

      // Update the user in the localStorage
      updateUser(userLoggedId, user);

      toastr.success("Perfil de serviço criado com sucesso!");

      // Redirect to the Home page after 2 seconds
      setTimeout(() => {
        window.location.href = "./home.html";
      }, 2000);
    };

    // Read the image as Data URL
    reader.readAsDataURL(serviceImgFile);
  });
});
