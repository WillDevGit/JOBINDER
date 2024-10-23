// Get the form and the inputs
const form = document.getElementById("register");
const inputFullName = document.getElementById("input-fullname");
const inputCellphone = document.getElementById("input-cellphone");
const inputPassword = document.getElementById("input-password");
const inputConfirmPassword = document.getElementById("input-confirm-password");

// Get the users from localStorage
const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {};

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form values
  const fullName = inputFullName.value;
  const cellphone = inputCellphone.value;
  const password = inputPassword.value;
  const confirmPassword = inputConfirmPassword.value;
  const id = cellphone;
  
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

  // Verify if the user exists
  const cellphoneExists = getUserData(id);

  if (cellphoneExists) {
    alert("Celular já cadastrado.");
    return;
  }

  // Hash the password
  const hashedPassword = CryptoJS.SHA256(password).toString();

  // Create the user object
  const user = {
    [id]: {
      fullName,
      cellphone,
      password: hashedPassword,
    },
  };

  // Create the user
  createUser(user);

  window.location.href = "./login.html";
});
