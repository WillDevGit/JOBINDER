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

// Update the rate of a user
const updateRate = (ratesId, ratedId, rate) => {
  const rates = getRates();

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

  // Atualiza o localStorage com os dados modificados
  localStorage.setItem("rates", JSON.stringify(rates));
};

// Check if the user has already rated the other user
const userRated = (ratesId, ratedId) => {
  const rates = getRates();
  return rates[ratedId]?.some((r) => r.raterId === ratesId);
};

export { getRates, getUserRates, updateRate, userRated };
