const getToken = () => localStorage.getItem("chat-token");

const isLoggedIn = () => !!getToken();

const setToken = token => {
  localStorage.clear();
  localStorage.setItem("chat-token", token);
};

module.exports = {
  getToken,
  isLoggedIn,
  setToken
};
