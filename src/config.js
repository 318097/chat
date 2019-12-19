const BASE_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:7000"
    : "https://bubblegum-server.herokuapp.com";

const config = {
  SERVER_URL: `${BASE_URL}/api`,
  SOCKET_URL: `${BASE_URL}/chat`
};

module.exports = config;
