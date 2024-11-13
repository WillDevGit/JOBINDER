import { setUserLogged, keepUserLogged } from "../../backend/createUserSession.js";
import { getUser } from "../../backend/user.js";
import { hash } from "./cryptoJS.js";

// Get the form elements
const inputCellphone = document.getElementById("input-cellphone");
const inputPassword = document.getElementById("input-password");
const keepLoggedInCheckbox = document.getElementById("keep-logged-in");
const loginButton = document.getElementById("login");

// Add the submit event to the form
loginButton.addEventListener("submit", async (event) => {
  event.preventDefault();

  const cellphone = inputCellphone.value;
  const password = inputPassword.value;

  if (cellphone === "") {
    toastr.error('O campo "Celular" é obrigatório.');
    return;
  }

  if (password === "") {
    toastr.error('O campo "Senha" é obrigatório.');
    return;
  }

  // Verify if the user exists
  const userExists = getUser(cellphone);

  // Hash the entered password
  const hashedPassword = await hash(password);

  // Check if the user exists and the password is correct
  if (!userExists || userExists.password !== hashedPassword) {
    toastr.error("Nome de usuário ou senha incorretos");
    return;
  }

  if (keepLoggedInCheckbox.checked)
    keepUserLogged(cellphone); // Keep the user logged in the local storage
  else setUserLogged(cellphone); // Set the user logged in the session

  toastr.success("Login efetuado com sucesso!");

  // Redirect to the home page after 2 seconds
  setTimeout(() => {
    window.location.href = "./home.html";
  }, 2000);
});
