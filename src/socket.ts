import { io } from "socket.io-client";
import { setMeetingInfo } from "./store/meeting";
import { store } from "./store";

const host = "https://purpie.io";
const jwt = new URLSearchParams(window.location.search).get("jwt");
const authorization = `Bearer ${jwt}`;

export const socket = io(host, {
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    authorization,
  },
});

export const initSocket = () => {
  socket.on("meeting_info", (v) => {
    store.dispatch(setMeetingInfo(v));
  });

  socket.connect();
};
