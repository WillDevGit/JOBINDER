// Get the hire data from the database
const getHires = () => {
  const hires = JSON.parse(localStorage.getItem("hires"));
  return hires ? hires : {};
};

// Get the hire data from the database
const getUserHires = (hiredId) => {
  const hires = getHires();
  return hires[hiredId] ? hires[hiredId] : [];
};

// Update the hire data in the database
const updateHires = (hires) => {
  localStorage.setItem("hires", JSON.stringify(hires));
};

// Add a new hire to the database
const addHire = (hiredId, hirerId) => {
  const hires = getHires();
  if (!hires[hiredId]) {
    hires[hiredId] = [];
  }
  hires[hiredId].push(hirerId);
  updateHires(hires);
};

// Check if a user is hired
const isUserHired = (hiredId, hirerId) => {
  const hires = getHires();
  return hires[hiredId] && hires[hiredId].includes(hirerId);
};

export { getHires, getUserHires, addHire, isUserHired };
