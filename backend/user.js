const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : {};

const createUser = (user) => {
  const cellphone = Object.keys(user)[0];
  console.log(cellphone, "cellphonee");
  users[cellphone] = user[cellphone];
  localStorage.setItem("users", JSON.stringify(users));
};

const getUser = (cellphone) => {
  return users[cellphone];
};

const getUserData = (cellphone) => {
  const user = users[cellphone];
  if (user) {
    const { fullName, cellphone, category } = user;
    return { fullName, cellphone, category };
  } else return null;
};

const getUserBeingCreated = () => {
  const userBeingCreated = localStorage.getItem("userBeingCreated");
  localStorage.removeItem("userBeingCreated");
  return userBeingCreated;
};

const addCategory = (cellphone, category) => {
  users[cellphone].category = category;
  localStorage.setItem("users", JSON.stringify(users));
};

const userLogged = () => {
  return JSON.parse(localStorage.getItem("userLogged"));
};

const setUserLogged = (userData) => {
  localStorage.setItem("userLogged", JSON.stringify(userData));
};

export {
  createUser,
  getUser,
  getUserData,
  getUserBeingCreated,
  addCategory,
  userLogged,
  setUserLogged,
};
