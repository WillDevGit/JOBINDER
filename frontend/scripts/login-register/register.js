import { hash } from "../cryptoJS.js";
import { validUserName, validUserPassword } from "../../../backend/user.js";

// Get the form and the inputs
const form = document.getElementById("register");
const inputFullName = document.getElementById("input-fullname");
const inputCellphone = document.getElementById("input-cellphone");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-confirm-password");

// Get the users from localStorage
const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : {};

// Create the user
const createUser = (user) => {
  const id = Object.keys(user)[0];
  users[id] = user[id];
  localStorage.setItem("users", JSON.stringify(users));
};

// Get the user data
const getUserData = (id) => {
  const user = users[id];
  if (user) {
    const { fullName, cellphone } = user;
    return { fullName, cellphone };
  } else return null;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the form values
  const cellphone = inputCellphone.value;
  const fullName = inputFullName.value;
  const password = inputPassword.value;
  const confirmPassword = inputConfirmPassword.value;
  const id = cellphone;

  const newNameCapitalized = fullName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  if (!newNameCapitalized) {
    toastr.error('O campo "Nome Completo" é obrigatório.');
    return;
  }

  if (!cellphone) {
    toastr.error('O campo "Celular" é obrigatório.');
    return;
  }

  if (!password) {
    toastr.error('O campo "Senha" é obrigatório.');
    return;
  }

  if (!confirmPassword) {
    toastr.error('O campo "Repita a senha" é obrigatório.');
    return;
  }

  if (password !== confirmPassword) {
    toastr.error("As senhas não coincidem.");
    return;
  }

  // if (!validUserName(newNameCapitalized)) return;
  // if (!validUserPassword(password)) return;

  // Verify if the user exists
  if (getUserData(id)) {
    toastr.error("Celular já cadastrado.");
    return;
  }

  // Hash the password
  const hashedPassword = await hash(password);

  // Create the user object
  const user = {
    [id]: {
      fullName: newNameCapitalized,
      cellphone,
      rating: 0,
      password: hashedPassword,
    },
  };

  // Create the user
  createUser(user);

  toastr.success("Cadastro efetuado com sucesso!");

  // Redirect to the login page after 2 seconds
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 2000);
});
