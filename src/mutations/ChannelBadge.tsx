import React, { useEffect, useState } from "react";
import socket from "../socket";

const data = {
  zoneName: "Test Zone",
  channelName: "Test Channel",
  watermarkHref: "https://doganbros.com",
  watermarkAria: "Purpie Watermark, Link to the Purpie Test Zone",
  avatarBgColor: "#966AEA",
  avatarFgColor: "#99FF69",
};

interface ChannelMeetingInfo {
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
interface UserMeetingInfo {
  type: "user";
  description?: string;
  user: {
    fullName: string;
    email: string;
    userName: string;
    photoURL?: string;
  };
}

const ChannelBadge = () => {
  const [meetingInfo, setMeetingInfo] = useState<
    ChannelMeetingInfo | UserMeetingInfo
  >();

  useEffect(() => {
    socket.on("meeting_info", (v) => {
      setMeetingInfo(v);
    });
    socket.connect();
  }, []);

  useEffect(() => {
    console.log("meeting info updated", { meetingInfo });
  }, [meetingInfo]);

  const channelName =
    meetingInfo?.type === "channel" ? meetingInfo?.channel?.name : null;

  const zoneName =
    meetingInfo?.type === "channel" ? meetingInfo?.channel?.name : null;

  const photoURL =
    meetingInfo?.type === "channel" ? meetingInfo?.channel?.photoURL : null;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "32px",
          top: "32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {photoURL ? (
          <img
            style={{
              objectFit: "contain",
              width: "60px",
              height: "60px",
              borderRadius: "60px",
            }}
            src="photoURL"
            width="60"
            height="60"
          ></img>
        ) : (
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "76px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "400",
              backgroundColor: data.avatarBgColor,
              color: data.avatarFgColor,
            }}
          >
            {data.channelName
              .split(" ")
              .map((c) => c[0])
              .join("")}
          </div>
        )}
        <a
          href={data.watermarkHref}
          aria-label={data.watermarkAria}
          style={{ display: "flex", textDecoration: "none" }}
        >
          <div
            style={{
              textAlign: "left",
              paddingLeft: "16px",
              lineHeight: 1.25,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "24px", color: "white" }}>
              {channelName || data.channelName}
            </div>
            <div style={{ fontSize: "16px", color: "#7D4CDB" }}>
              {zoneName || data.zoneName}
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ChannelBadge;
