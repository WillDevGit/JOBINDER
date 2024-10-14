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
    const { fullName, cellphone, category, serviceProfile } = users[user];
    usersData.push({ fullName, cellphone, category, serviceProfile });
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
    const { fullName, cellphone, category, serviceProfile } = user;
    return { fullName, cellphone, category, serviceProfile };
  } else return null;
};

// Update the user
const updateUser = (cellphone, user) => {
  users[cellphone] = user;
  localStorage.setItem("users", JSON.stringify(users));
};

// Update the userName
const updateUserName = (cellphone, newName) => {
  // Verifica se o usuário já existe
  if (users[cellphone]) {
    // Atualiza apenas o atributo fullName
    users[cellphone].fullName = newName;
    
    // Atualiza o localStorage com os novos dados do usuário
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    console.log("Usuário não encontrado");
  }
};

// Update the services
const updateUserServices = (cellphone, newServices) => {
  // Verifica se o usuário já existe
  if (users[cellphone]) {
    // Atualiza apenas o atributo fullName
    users[cellphone].serviceProfile.services = newServices;
    
    // Atualiza o localStorage com os novos dados do usuário
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    console.log("Usuário não encontrado");
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
  updateUserName,
  updateUserServices, 
};
