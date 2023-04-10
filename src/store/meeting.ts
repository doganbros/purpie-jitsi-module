import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


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

export interface MeetingState {
  meetingInfo: null | ChannelMeetingInfo | UserMeetingInfo;
  isStreaming: Boolean,
  isRecording: Boolean,
}

const initialState: MeetingState = {
  meetingInfo: null,
  isStreaming: false,
  isRecording: false,
};

export const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    setMeetingInfo: (
      state,
      action: PayloadAction<ChannelMeetingInfo | UserMeetingInfo>
    ) => {
      state.meetingInfo = action.payload;
    },
  },
});

export const { setMeetingInfo } = meetingSlice.actions;

export default meetingSlice.reducer;
