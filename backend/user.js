// Get the users
const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || {};
};

// Get the users data
const getUsersData = () => {
  const users = getUsers();
  const usersData = [];
  for (const user in users) {
    const { fullName, cellphone, serviceProfile } = users[user];
    usersData.push({ fullName, cellphone, serviceProfile });
  }
  return usersData;
};

// Get the user logged
const userLogged = () => {
  return JSON.parse(localStorage.getItem("userLogged"));
};

// Set the user logged
const setUserLogged = (id) => {
  localStorage.setItem("userLogged", JSON.stringify(id));
};

// Get the users matched id
const getUsersMatchedId = (userLoggedId) => {
  const usersMatchedIdStrStorage = `usersMatchedId-${userLoggedId}`;
  return JSON.parse(localStorage.getItem(usersMatchedIdStrStorage)) || [];
};

// Update the users matched id
const insertUserInUsersMatchedId = (userLoggedId, newId) => {
  // Update the users matched id of the user logged
  const usersMatchedIdStrStorage = `usersMatchedId-${userLoggedId}`;
  const usersMatchedId = getUsersMatchedId(userLoggedId);
  usersMatchedId.push(newId);
  localStorage.setItem(
    usersMatchedIdStrStorage,
    JSON.stringify(usersMatchedId)
  );

  // Update the users matched id of the other user
  const usersMatchedIdStrStorage2 = `usersMatchedId-${newId}`;
  const usersMatchedId2 = getUsersMatchedId(newId);
  usersMatchedId2.push(userLoggedId);
  localStorage.setItem(
    usersMatchedIdStrStorage2,
    JSON.stringify(usersMatchedId2)
  );
};

// Delete the user in the users matched id
const deleteUserInUsersMatchedId = (userLoggedId, id) => {
  // Delete the user in the users matched id of the user logged
  const usersMatchedIdStrStorage = `usersMatchedId-${userLoggedId}`;
  const usersMatchedId = getUsersMatchedId(userLoggedId);
  const newUsersMatchedId = usersMatchedId.filter((userId) => userId !== id);
  localStorage.setItem(
    usersMatchedIdStrStorage,
    JSON.stringify(newUsersMatchedId)
  );

  // Delete the user in the users matched id of the other user
  const usersMatchedIdStrStorage2 = `usersMatchedId-${id}`;
  const usersMatchedId2 = getUsersMatchedId(id);
  const newUsersMatchedId2 = usersMatchedId2.filter(
    (userId) => userId !== userLoggedId
  );
  localStorage.setItem(
    usersMatchedIdStrStorage2,
    JSON.stringify(newUsersMatchedId2)
  );
};

const getChatMessages = (userMatched) => {
  const ids = [userLogged(), userMatched].sort();
  const chatKey = `chat-${ids[0]}-${ids[1]}`;
  return JSON.parse(localStorage.getItem(chatKey)) || [];
};

const addChatMessage = (userMatched, message) => {
  const ids = [userLogged(), userMatched].sort();
  const chatKey = `chat-${ids[0]}-${ids[1]}`;
  const chat = getChatMessages(userMatched);
  chat.push({
    sender: userLogged(),
    message,
    timestamp: Date.now(),
  });
  localStorage.setItem(chatKey, JSON.stringify(chat));
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
    const { fullName, cellphone, serviceProfile } = user;
    return { fullName, cellphone, serviceProfile };
  } else return null;
};

// Update the user
const updateUser = (id, user) => {
  const users = getUsers();
  users[id] = user;
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
const updateUserName = (id, newName) => {
  const validNewUserName = validUserName(newName);
  const userExists = getUser(id);

  if (validNewUserName && userExists) {
    userExists.fullName = newName;
    updateUser(id, userExists);
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
const updateUserServices = (id, newServices) => {
  const validNewUserServices = validUserServices(newServices);
  const userExists = getUser(id);

  if (validNewUserServices && userExists) {
    userExists.serviceProfile.services = newServices;
    updateUser(id, userExists);
  }
};

// Update the service image
const updateServiceImg = (id, file) => {
  const userExists = getUser(id);

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
    updateUser(id, userExists);
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
