// Get the users
const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {};

// Get the user logged
const userLogged = () => {
  return JSON.parse(localStorage.getItem("userLogged"));
};

// Set the user logged
const setUserLogged = (cellphone) => {
  localStorage.setItem("userLogged", JSON.stringify(cellphone));
};

// Get the users matched id
const getUsersMatchedId = (userLoggedId) => {
  const usersMatchedIdStrStorage = `usersMatchedId-${userLoggedId}`;
  return JSON.parse(localStorage.getItem(usersMatchedIdStrStorage)) || [];
};

// Update the users matched id
const insertUserInUsersMatchedId = (userLoggedId, newId) => {
  const usersMatchedIdStrStorage = `usersMatchedId-${userLoggedId}`;
  const usersMatchedId = getUsersMatchedId(userLoggedId);
  usersMatchedId.push(newId);
  localStorage.setItem(
    usersMatchedIdStrStorage,
    JSON.stringify(usersMatchedId)
  );
};

// Delete the user in the users matched id
const deleteUserInUsersMatchedId = (userLoggedId, id) => {
  const usersMatchedIdStrStorage = `usersMatchedId-${userLoggedId}`;
  const usersMatchedId = getUsersMatchedId(userLoggedId);
  const newUsersMatchedId = usersMatchedId.filter((userId) => userId !== id);
  localStorage.setItem(
    usersMatchedIdStrStorage,
    JSON.stringify(newUsersMatchedId)
  );
};

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
  } else if (services.length > 200) {
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

// Update the service image
const updateServiceImg = (cellphone, file) => {
  const userExists = getUser(cellphone);

  if (!userExists) {
    alert("Usuário não encontrado.");
    return;
  }

  if (!file) {
    alert("O campo 'Imagem do Serviço' é obrigatório.");
    return;
  }

  // Check if the file is an image
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validImageTypes.includes(file.type)) {
    alert("Por favor, envie uma imagem no formato JPEG, PNG ou GIF.");
    return;
  }

  // Parse the file to base64
  const reader = new FileReader();
  reader.onload = function (event) {
    const serviceImgBase64 = event.target.result;

    // Update the user service image
    userExists.serviceProfile.serviceImg = serviceImgBase64;

    // Update the user
    updateUser(cellphone, userExists);
  };

  // Read the file
  reader.readAsDataURL(file);
};

export {
  userLogged,
  setUserLogged,
  getUsersMatchedId,
  createUser,
  getUsersData,
  getUser,
  getUserData,
  updateUser,
  validUserName,
  updateUserName,
  validUserServices,
  updateUserServices,
  updateServiceImg,
  insertUserInUsersMatchedId,
  deleteUserInUsersMatchedId,
};
