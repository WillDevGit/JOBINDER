// Get the user logged
const getUserLogged = () => {
  // If keep logged in
  let userLoggedId = JSON.parse(localStorage.getItem("userLogged"));
  if (userLoggedId) return userLoggedId;

  // If not keep logged in
  userLoggedId = JSON.parse(sessionStorage.getItem("userLogged"));
  return userLoggedId ? userLoggedId : -1;
};

// Set the user logged in the session
export const setUserLogged = (id) => {
  sessionStorage.setItem("userLogged", JSON.stringify(id));
};

// Keep the user logged in the navigation
export const keepUserLogged = (id) => {
  localStorage.setItem("userLogged", JSON.stringify(id));
};

// Export the user logged id constant
export const userLoggedId = getUserLogged();
