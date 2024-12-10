import { getUser, updateUserRating } from "./user.js";

// Get the rates from the database
const getRates = () => {
  const rates = localStorage.getItem("rates");
  return rates ? JSON.parse(rates) : {};
};

// Get the rates of a user
const getUserRates = (id) => {
  const rates = getRates();
  return rates[id] || [];
};

// Update the rate of a user by another user in the database
const updateRate = (ratesId, ratedId, rate) => {
  rate = Number(rate);
  const user = getUser(ratedId);
  const rates = getRates();

  if (!user) return;

  if (!rates[ratedId]) {
    rates[ratedId] = [];
  }

  const existingRateIndex = rates[ratedId].findIndex((r) => r.raterId === ratesId);

  // Update the rate if the user has already rated
  if (existingRateIndex !== -1) {
    rates[ratedId][existingRateIndex].rate = rate;
  } else {
    rates[ratedId].push({ raterId: ratesId, rate });
  }

  const sum = rates[ratedId].reduce((acc, r) => acc + r.rate, 0);
  const length = rates[ratedId].length;
  const newRating = Math.round(sum / length);
  
  console.log(sum, length, sum/length);

  updateUserRating(ratedId, newRating);

  localStorage.setItem("rates", JSON.stringify(rates));
};

// Check if the user has already rated the other user
const userRated = (ratesId, ratedId) => {
  const rates = getRates();
  return rates[ratedId]?.some((r) => r.raterId === ratesId);
};

export { getRates, getUserRates, updateRate, userRated };
