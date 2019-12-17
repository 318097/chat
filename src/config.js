const config = {
  SERVER_URL: process.env.REACT_APP_NODE_ENV === 'development' ?
    'http://localhost:7000/api' :
    'https://bubblegum-server.herokuapp.com/api',
};

module.exports = config;