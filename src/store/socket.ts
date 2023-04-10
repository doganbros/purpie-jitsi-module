import { io, Socket } from "socket.io-client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const host = "http://localhost:8000";
const jwt = new URLSearchParams(window.location.search).get("jwt");
const authorization = `Bearer ${jwt}`;

const socket = io(host, {
  autoConnect: false,
  withCredentials: true,
  extraHeaders: {
    authorization,
  },
});

export interface ChannelMeetingInfo {
  type: "channel";
  description?: string;
  channel: {
    description?: string;
    name: string;
    photoURL?: string;
    public: boolean;
    zone: {
      name: string;
      subdomain: string;
      public: boolean;
      photoURL?: string;
      description?: string;
    };
  };
}
export interface UserMeetingInfo {
  type: "user";
  description?: string;
  user: {
    fullName: string;
    email: string;
    userName: string;
    photoURL?: string;
  };
}
export interface SocketState {
  socket: Socket;
  meetingInfo: null | ChannelMeetingInfo | UserMeetingInfo;
}

const initialState: SocketState = {
  socket,
  meetingInfo: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setMeetingInfo: (
      state,
      action: PayloadAction<ChannelMeetingInfo | UserMeetingInfo>
    ) => {
      console.log("MODULE_LOG", "setMeetingInfo triggered", {
        state,
        action,
      });
      state.meetingInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMeetingInfo } = socketSlice.actions;

socket.on("meeting_info", (v) => {
  setMeetingInfo(v);
  console.log("MODULE_LOG", "meeting info received", {
    meetingInfo: v,
    setMeetingInfo,
    socketSlice,
  });
});

socket.connect();

export default socketSlice.reducer;
