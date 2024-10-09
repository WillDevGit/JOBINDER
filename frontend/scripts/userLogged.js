import { userLogged } from "../../backend/user.js";

const exit = document.getElementById("exit");
const login = document.getElementById("login");

const user = userLogged();

exit.style.display = user ? "block" : "none";
login.style.display = user ? "none" : "block";

exit.addEventListener("click", () => {
  localStorage.removeItem("userLogged");
  exit.style.display = "none";
  login.style.display = "block";
});
