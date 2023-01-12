import { io } from "socket.io-client";

const PORT = 8081;
const HOST = "https://purpie.io";
const url = `${HOST}:${PORT}`;
const jwt = new URLSearchParams(window.location.search).get("jwt")
const authorization = `Bearer ${jwt}`;

const socket = io(url, {
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    authorization,
  },
});

export default socket;


