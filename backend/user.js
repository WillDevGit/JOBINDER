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
const getUsersMatchedId = (id) => {
  if (!id) id = -1; // If user is not logged
  const usersMatchedIdObj =
    JSON.parse(localStorage.getItem("usersMatchedId")) || {};
  return usersMatchedIdObj[id] || [];
};

// Update the users matched id
const insertUserInUsersMatchedId = (userLoggedId, newId) => {
  const usersMatchedIdObj =
    JSON.parse(localStorage.getItem("usersMatchedId")) || {};
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
  const usersMatchedIdObj =
    JSON.parse(localStorage.getItem("usersMatchedId")) || {};
  if (!userLoggedId) userLoggedId = -1; // If user is not logged

  // Delete the user in the users matched id of the user logged
  const usersMatchedIdArray = getUsersMatchedId(userLoggedId);
  const newUsersMatchedIdArray = usersMatchedIdArray.filter(
    (userId) => userId !== id
  );
  usersMatchedIdObj[userLoggedId] = newUsersMatchedIdArray;

  // Delete the user in the users matched id of the other user
  const usersMatchedIdArray2 = getUsersMatchedId(id);
  const newUsersMatchedIdArray2 = usersMatchedIdArray2.filter(
    (userId) => userId !== userLoggedId
  );
  usersMatchedIdObj[id] = newUsersMatchedIdArray2;

  localStorage.setItem("usersMatchedId", JSON.stringify(usersMatchedIdObj));
};

// Get the chat messages
const getChatMessages = (userLoggedId, userMatched) => {
  const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
  if (!userLoggedId) userLoggedId = -1; // If user is not logged
  const ids = [userLoggedId, userMatched].sort();
  const chatKey = `chat-${ids[0]}-${ids[1]}`;
  return chatMessages[chatKey] || [];
};

// Add a chat message
const addChatMessage = (userLoggedId, userMatched, message) => {
  const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
  if (!userLoggedId) userLoggedId = -1; // If user is not logged
  const ids = [userLoggedId, userMatched].sort();
  const chatKey = `chat-${ids[0]}-${ids[1]}`;
  const chat = getChatMessages(userLoggedId, userMatched);
  chat.push({
    sender: userLoggedId,
    message,
    timestamp: Date.now(),
  });
  chatMessages[chatKey] = chat;
  localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
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

// Check if the user name is valid
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

// Update the user name
const updateUserName = (id, newName) => {
  const validNewUserName = validUserName(newName);
  const userExists = getUser(id);

  if (validNewUserName && userExists) {
    const newNameCaptalized = newName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    userExists.fullName = newNameCaptalized;
    updateUser(id, userExists);
    return newNameCaptalized;
  }

  return null;
};

// Check if the user avaliability is valid
const validUserAvaliability = (avaliability) => {
  if (avaliability === "") {
    alert('O campo "Disponibilidade" é obrigatório.');
    return false;
  } else if (avaliability.length <= 10) {
    alert("Descrição da disponibilidade muito curta");
    return false;
  } else if (avaliability.length > 200) {
    alert("Descrição da disponibilidade muito longa");
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
  validUserAvaliability,
  updateUserAvaliability,
  validUserServices,
  updateUserServices,
  updateServiceImg,
  insertUserInUsersMatchedId,
  deleteUserInUsersMatchedId,
  getChatMessages,
  addChatMessage,
};
