import { getUser, getUserData, setUserLogged } from "../../backend/user.js";

const login = document.getElementById("login");
const inputCellphone = document.getElementById("input-cellphone");
const inputPassword = document.getElementById("input-password");

login.addEventListener("submit", (event) => {
  event.preventDefault();

  const cellphone = inputCellphone.value;
  const password = inputPassword.value;

  if (cellphone === "") {
    alert('O campo "Celular" é obrigatório.');
    return;
  }

  if (password === "") {
    alert('O campo "Senha" é obrigatório.');
    return;
  }

  const userExists = getUser(cellphone);

  // Hash the entered password
  const hashedPassword = CryptoJS.SHA256(password).toString();

  // Check if the user exists and the password is correct
  if (!userExists || userExists.password !== hashedPassword) {
    alert("Nome de usuário ou senha incorretos");
    return;
  }

  setUserLogged(getUserData(cellphone));

  window.location.href = "./home.html";
});
