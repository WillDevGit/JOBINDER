// Get the users
const getUsers = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  return users || {};
};

// Create the users
const createUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Update the users
const updateUsers = (users) => {
  const usersInStorage = getUsers();
  const newUsers = { ...usersInStorage, ...users };
  createUsers(newUsers);
};

// Get the users data
const getUsersData = () => {
  const users = getUsers();
  const usersData = [];
  for (const user in users) {
    const { fullName, cellphone, rating, serviceProfile } = users[user];
    usersData.push({ fullName, cellphone, rating, serviceProfile });
  }
  return usersData;
};

// Get the users matched id
const getUsersMatchedId = (id) => {
  if (!id) id = -1; // If user is not logged
  const usersMatchedIdObj = JSON.parse(localStorage.getItem("usersMatchedId")) || {};
  return usersMatchedIdObj[id] || [];
};

// Update the users matched id
const insertUserInUsersMatchedId = (userLoggedId, newId) => {
  const usersMatchedIdObj = JSON.parse(localStorage.getItem("usersMatchedId")) || {};
  if (!userLoggedId) userLoggedId = -1; // If user is not logged

  // Update the users matched id of the user logged
  const usersMatchedIdArray = getUsersMatchedId(userLoggedId);
  usersMatchedIdArray.push(newId);
  usersMatchedIdObj[userLoggedId] = usersMatchedIdArray;

  // Update the users matched id of the other user
  const usersMatchedIdArray2 = getUsersMatchedId(newId);
  usersMatchedIdArray2.push(userLoggedId);
  usersMatchedIdObj[newId] = usersMatchedIdArray2;

  localStorage.setItem("usersMatchedId", JSON.stringify(usersMatchedIdObj));
};

// Delete the user in the users matched id
const deleteUserInUsersMatchedId = (userLoggedId, id) => {
  const usersMatchedIdObj = JSON.parse(localStorage.getItem("usersMatchedId")) || {};
  if (!userLoggedId) userLoggedId = -1; // If user is not logged

  // Delete the user in the users matched id of the user logged
  const usersMatchedIdArray = getUsersMatchedId(userLoggedId);
  const newUsersMatchedIdArray = usersMatchedIdArray.filter((userId) => userId !== id);
  usersMatchedIdObj[userLoggedId] = newUsersMatchedIdArray;

  // Delete the user in the users matched id of the other user
  const usersMatchedIdArray2 = getUsersMatchedId(id);
  const newUsersMatchedIdArray2 = usersMatchedIdArray2.filter((userId) => userId !== userLoggedId);
  usersMatchedIdObj[id] = newUsersMatchedIdArray2;

  localStorage.setItem("usersMatchedId", JSON.stringify(usersMatchedIdObj));
};

// Create a new user
const createUser = (user) => {
  const users = getUsers();
  const id = Object.keys(user)[0];
  users[id] = user[id];
  localStorage.setItem("users", JSON.stringify(users));
};

// Get the user by id
const getUser = (id) => {
  const users = getUsers();
  return users[id];
};

// Get the user data by id
const getUserData = (id) => {
  const users = getUsers();
  const user = users[id];
  if (user) {
    const { fullName, cellphone, rating, serviceProfile } = user;
    return { fullName, cellphone, rating, serviceProfile };
  } else return null;
};

// Update the user
const updateUser = (id, user) => {
  const users = getUsers();
  users[id] = user;
  localStorage.setItem("users", JSON.stringify(users));
};

// Check if the user name is valid
const validUserName = (name) => {
  if (name === "") {
    toastr.error('O campo "Nome Completo" é obrigatório.');
    return false;
  } else if (name.split(" ").length < 2) {
    toastr.error("Por favor, insira seu nome e sobrenome.");
    return false;
  } else if (name.length <= 3) {
    toastr.error("Nome muito curto. Por favor, insira seu nome completo.");
    return false;
  } else if (name.length > 30) {
    toastr.error("Nome muito longo.");
    return false;
  } else if (!name.match(/^[a-zA-Z\s]*$/)) {
    toastr.error("Nome inválido.");
    return false;
  }
  return true;
};

// Update the user name
const updateUserName = (id, newName) => {
  const validNewUserName = validUserName(newName);
  const userExists = getUser(id);

  if (validNewUserName && userExists) {
    const newNameCapitalized = newName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    userExists.fullName = newNameCapitalized;
    updateUser(id, userExists);
    return newNameCapitalized;
  }

  return null;
};

// Check if the user avaliability is valid
const validUserAvaliability = (avaliability) => {
  if (avaliability === "") {
    toastr.error('O campo "Disponibilidade" é obrigatório.');
    return false;
  } else if (avaliability.length <= 10) {
    toastr.error("Descrição da disponibilidade muito curta.");
    return false;
  } else if (avaliability.length > 100) {
    toastr.error("Descrição da disponibilidade muito longa.");
    return false;
  }
  return true;
};

// Update the user avaliability
const updateUserAvaliability = (id, newAvaliability) => {
  const validNewUserAvaliability = validUserAvaliability(newAvaliability);
  const userExists = getUser(id);

  if (validNewUserAvaliability && userExists) {
    userExists.serviceProfile.avaliability = newAvaliability;
    updateUser(id, userExists);
    return newAvaliability;
  }

  return null;
};

// Check if the user services is valid
const validUserServices = (services) => {
  if (services === "") {
    toastr.error('O campo "Serviços" é obrigatório.');
    return false;
  } else if (services.length <= 10) {
    toastr.error("Descrição dos serviços muito curta.");
    return false;
  } else if (services.length > 200) {
    toastr.error("Descrição dos serviços muito longa.");
    return false;
  }
  return true;
};

// Update the user services
const updateUserServices = (id, newServices) => {
  const validNewUserServices = validUserServices(newServices);
  const userExists = getUser(id);

  if (validNewUserServices && userExists) {
    userExists.serviceProfile.services = newServices;
    updateUser(id, userExists);
    return newServices;
  }

  return null;
};

const validUserPassword = (password) => {
  if (password === "") {
    toastr.error('O campo "Senha" é obrigatório.');
    return false;
  } else if (password.length < 5) {
    toastr.error("A senha deve ter no mínimo 5 caracteres.");
    return false;
  } else if (password.length > 15) {
    toastr.error("A senha deve ter no máximo 15 caracteres.");
    return false;
  }
  return true;
};

const updateLocation = (id, state, city) => {
  const userExists = getUser(id);

  if (!userExists) {
    toastr.error("Usuário não encontrado.");
    return;
  }

  userExists.serviceProfile.location.state = state;
  userExists.serviceProfile.location.city = city;

  updateUser(id, userExists);
};

// Update the service image
const updateServiceImg = (id, file) => {
  const userExists = getUser(id);

  if (!userExists) {
    toastr.error("Usuário não encontrado.");
    return;
  }

  if (!file) {
    toastr.error("O campo 'Imagem do Serviço' é obrigatório.");
    return;
  }

  // Check if the file is an image
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validImageTypes.includes(file.type)) {
    toastr.error("Por favor, envie uma imagem no formato JPEG, PNG ou GIF.");
    return;
  }

  // Parse the file to base64
  const reader = new FileReader();
  reader.onload = function (event) {
    const serviceImgBase64 = event.target.result;

    // Update the user service image
    userExists.serviceProfile.serviceImg = serviceImgBase64;

    // Update the user
    updateUser(id, userExists);
  };

  // Read the file
  reader.readAsDataURL(file);
};

export {
  getUsers,
  updateUsers,
  getUsersMatchedId,
  createUser,
  getUsersData,
  getUser,
  getUserData,
  updateUser,
  validUserName,
  updateUserName,
  validUserAvaliability,
  updateUserAvaliability,
  validUserServices,
  updateUserServices,
  validUserPassword,
  updateLocation,
  updateServiceImg,
  insertUserInUsersMatchedId,
  deleteUserInUsersMatchedId,
};
