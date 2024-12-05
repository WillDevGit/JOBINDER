import { setUserLogged, keepUserLogged } from "../../../../backend/createUserSession.js";
import { getUser } from "../../../../backend/user.js";
import { hash } from "../../cryptoJS.js";

// Get the form elements
const loginContainer = document.getElementById("login-container");
const inputCellphone = document.getElementById("input-cellphone");
const inputPassword = document.getElementById("input-password");
const keepLoggedInCheckbox = document.getElementById("keep-logged-in");
const loginButton = document.getElementById("login");
const goToForgotPassword = document.getElementById("go-to-forgot-password");

const forgotPasswordContainer = document.getElementById("forgot-password-container");

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
    toastr.error("Nome de usuário ou senha incorretos.");
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

goToForgotPassword.addEventListener("click", () => {
  loginContainer.style.display = "none";
  forgotPasswordContainer.style.display = "flex";
});
