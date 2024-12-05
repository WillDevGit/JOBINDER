import { updateUserPassword } from "../../../../backend/user.js";

const loginContainer = document.getElementById("login-container");

const forgotPasswordContainer = document.getElementById("forgot-password-container");
const inputCellPhone = document.getElementById("input-cellphone-forgot-password");
const inputNewPassword = document.getElementById("input-new-password");
const inputConfirmPassword = document.getElementById("input-confirm-new-password");
const submitForgotPassword = document.getElementById("submit-forgot-password");

const goToLogin = document.getElementById("go-to-login");

const hash = (string) => {
  const hashedString = CryptoJS.SHA256(string).toString();
  return hashedString;
};

submitForgotPassword.addEventListener("click", (event) => {
  event.preventDefault();

  const cellphone = inputCellPhone.value;
  const newPassword = inputNewPassword.value;
  const confirmPassword = inputConfirmPassword.value;

  if (!cellphone) {
    toastr.error('O campo "Celular" é obrigatório.');
    return;
  }

  if (!newPassword) {
    toastr.error('O campo "Nova Senha" é obrigatório.');
    return;
  }

  if (!confirmPassword) {
    toastr.error('O campo "Confirmar Senha" é obrigatório.');
    return;
  }

  if (newPassword !== confirmPassword) {
    toastr.error("As senhas não conferem.");
    return;
  }

  const hashedPassword = hash(newPassword);

  if (updateUserPassword(cellphone, hashedPassword)) {
    toastr.success("Senha alterada com sucesso!");
    setTimeout(() => {
      forgotPasswordContainer.style.display = "none";
      loginContainer.style.display = "flex";
    }, 2000);
  }
});

goToLogin.addEventListener("click", () => {
  forgotPasswordContainer.style.display = "none";
  loginContainer.style.display = "flex";
});
