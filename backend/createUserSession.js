// Get the user logged
const getUserLogged = () => {
  const userLoggedId = JSON.parse(sessionStorage.getItem("userLogged"));
  return userLoggedId ? userLoggedId : -1;
};

// Set the user logged
export const setUserLogged = (id) => {
  sessionStorage.setItem("userLogged", JSON.stringify(id));
};

// Export the user logged id constant
export const userLoggedId = getUserLogged();
