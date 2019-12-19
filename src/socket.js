import openSocket from "socket.io-client";
import config from "./config";

const socket = openSocket.connect(config.SOCKET_URL);

const CONNECTION = "connection";
const CONNECT = "connect";
const USER_INFO = "user-info";
const MESSAGE = "message";
const DISCONNECT = "disconnect";
const NEW_MESSAGE = "new-message";

export {
  socket as default,
  CONNECTION,
  CONNECT,
  USER_INFO,
  MESSAGE,
  DISCONNECT,
  NEW_MESSAGE
};
