const form = document.getElementById("register");
const inputFullName = document.getElementById("input-fullname");
const inputCellphone = document.getElementById("input-cellphone");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-confirm-password");

const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {};

const createUser = (user) => {
  const cellphone = Object.keys(user)[0];
  console.log(cellphone, "cellphonee");
  users[cellphone] = user[cellphone];
  localStorage.setItem("users", JSON.stringify(users));
};

const getUserData = (cellphone) => {
  const user = users[cellphone];
  if (user) {
    const { fullName, cellphone, category } = user;
    return { fullName, cellphone, category };
  } else return null;
};

const userBeingCreated = (cellphone) => {
    localStorage.setItem("userBeingCreated", cellphone);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = inputFullName.value;
  const cellphone = inputCellphone.value;
  const password = inputPassword.value;
  const confirmPassword = inputConfirmPassword.value;

  if (fullName === "") {
    alert('O campo "Nome Completo" é obrigatório.');
    return;
  }

  if (cellphone === "") {
    alert('O campo "Celular" é obrigatório.');
    return;
  }

  if (password === "") {
    alert('O campo "Senha" é obrigatório.');
    return;
  }

  if (confirmPassword === "") {
    alert('O campo "Confirmar Senha" é obrigatório.');
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  const cellphoneExists = getUserData(cellphone);

  if (cellphoneExists) {
    alert("Celular já cadastrado.");
    return;
  }

  // Hash the password
  const hashedPassword = CryptoJS.SHA256(password).toString();

  const prestador = {
    [cellphone]: {
      fullName,
      cellphone,
      password: hashedPassword,
      category: null,
    },
  };

  userBeingCreated(cellphone);
  createUser(prestador);

  window.location.href = "areaProfissional.html";
});
