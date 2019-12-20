const isLoggedIn = () => !!getToken();

const getToken = () => localStorage.getItem("chat-token");

const setToken = token => {
  localStorage.clear();
  localStorage.setItem("chat-token", token);
};

const setUser = user =>
  sessionStorage.setItem("chat-user", JSON.stringify(user));

const getUser = () => JSON.parse(sessionStorage.getItem("chat-user") || "{}");

module.exports = {
  isLoggedIn,
  getToken,
  setToken,
  setUser,
  getUser
};
