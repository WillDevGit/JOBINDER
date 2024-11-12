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

// Get new matches ids
const getNewMatchesIds = (userLoggedId) => {
  if (!userLoggedId) userLoggedId = -1; // If user is not logged
  const newMatchesIds = JSON.parse(localStorage.getItem("newMatchesIds")) || {};
  return newMatchesIds[userLoggedId] || [];
};

// Insert new match id
const insertNewMatchId = (userLoggedId, newMatchId) => {
  if (!userLoggedId) userLoggedId = -1; // If user is not logged
  const allMatches = JSON.parse(localStorage.getItem("newMatchesIds")) || {};
  if (!allMatches[userLoggedId]) allMatches[userLoggedId] = [];
  allMatches[userLoggedId].push(newMatchId);
  localStorage.setItem("newMatchesIds", JSON.stringify(allMatches));
};

// Remove new match id
const deleteNewMatchId = (userLoggedId, newMatchId) => {
  if (!userLoggedId) userLoggedId = -1; // If user is not logged
  const allMatches = JSON.parse(localStorage.getItem("newMatchesIds")) || {};
  if (!allMatches[userLoggedId]) allMatches[userLoggedId] = [];
  allMatches[userLoggedId] = allMatches[userLoggedId].filter(
    (matchId) => matchId !== newMatchId
  );
  localStorage.setItem("newMatchesIds", JSON.stringify(allMatches));
};

export {
  getChatMessages,
  addChatMessage,
  getNewMatchesIds,
  insertNewMatchId,
  deleteNewMatchId,
};
