import { io } from "socket.io-client";

const host = "https://purpie.io";
const jwt = new URLSearchParams(window.location.search).get("jwt")
const authorization = `Bearer ${jwt}`;

const socket = io(host, {
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    authorization,
  },
});

export default socket;
