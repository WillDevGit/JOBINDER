// Get the users from the local storage
const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {};

// Create a new user
const createUser = (user) => {
  const cellphone = Object.keys(user)[0];
  users[cellphone] = user[cellphone];
  localStorage.setItem("users", JSON.stringify(users));
};

// Get the users data
const getUsersData = () => {
  const usersData = [];
  for (const user in users) {
    const { fullName, cellphone, serviceProfile } = users[user];
    usersData.push({ fullName, cellphone, serviceProfile });
  }
  return usersData;
};

// Get the user by cellphone
const getUser = (cellphone) => {
  return users[cellphone];
};

// Get the user data by cellphone
const getUserData = (cellphone) => {
  const user = users[cellphone];
  if (user) {
    const { fullName, cellphone, serviceProfile } = user;
    return { fullName, cellphone, serviceProfile };
  } else return null;
};

// Update the user
const updateUser = (cellphone, user) => {
  users[cellphone] = user;
  localStorage.setItem("users", JSON.stringify(users));
};

const validUserName = (name) => {
  if (name === "") {
    alert("Nome não pode ser vazio");
    return false;
  } else if (name.length <= 3) {
    alert("Nome muito curto");
    return false;
  } else if (name.length > 25) {
    alert("Nome muito longo");
    return false;
  } else if (!name.match(/^[a-zA-Z\s]*$/)) {
    alert("Nome inválido");
    return false;
  }
  return true;
};

// Update the userName
const updateUserName = (cellphone, newName) => {
  const validNewUserName = validUserName(newName);
  const userExists = getUser(cellphone);

  if (validNewUserName && userExists) {
    userExists.fullName = newName;
    updateUser(cellphone, userExists);
  }
};

const validUserServices = (services) => {
  if (services === "") {
    alert('O campo "Serviços" é obrigatório.');
    return false;
  } else if (services.length <= 10) {
    alert("Descrição dos serviços muito curta");
    return false;
  } else if (services.length > 100) {
    alert("Descrição dos serviços muito longa");
    return false;
  }
  return true;
};

// Update the services
const updateUserServices = (cellphone, newServices) => {
  const validNewUserServices = validUserServices(newServices);
  const userExists = getUser(cellphone);

  if (validNewUserServices && userExists) {
    userExists.serviceProfile.services = newServices;
    updateUser(cellphone, userExists);
  }
};

// Get the user logged
const userLogged = () => {
  return JSON.parse(localStorage.getItem("userLogged"));
};

// Set the user logged
const setUserLogged = (cellphone) => {
  localStorage.setItem("userLogged", JSON.stringify(cellphone));
};

export {
  createUser,
  getUsersData,
  getUser,
  getUserData,
  updateUser,
  userLogged,
  setUserLogged,
  validUserName,
  updateUserName,
  validUserServices,
  updateUserServices,
};
