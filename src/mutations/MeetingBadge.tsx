import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../store";

const WATERMARK_HREF = "https://purpie.io";
const WATERMARK_ARIA = "Link to purpie.io";

const MeetingBadge = () => {
  const meetingInfo = useSelector(
    (state: RootState) => state.meeting.meetingInfo
  );

  const title =
    meetingInfo?.type === "channel"
      ? `◉ ${meetingInfo?.channel?.name}`
      : meetingInfo?.type === "user"
      ? meetingInfo.user.fullName
      : null;

  const subtitle =
    meetingInfo?.type === "channel"
      ? `▣ ${meetingInfo?.channel?.zone?.name}`
      : meetingInfo?.type === "user"
      ? `@${meetingInfo.user.userName}`
      : null;

  const photoURL =
    meetingInfo?.type === "channel"
      ? meetingInfo?.channel?.photoURL
      : meetingInfo?.type === "user"
      ? meetingInfo.user.photoURL
      : null;

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
            src={photoURL}
            width="60"
            height="60"
          ></img>
        ) : (
          title && (
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
                backgroundColor: "#966AEA",
                color: "#99FF69",
              }}
            >
              {title
                ?.replace(/[^a-zA-Z0-9 ]/g, "")
                .split(" ")
                .filter((_v, i: number) => i < 2)
                .map((v) => v && v[0].toUpperCase())
                .join("")}
            </div>
          )
        )}
        <a
          href={WATERMARK_HREF}
          aria-label={WATERMARK_ARIA}
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
            <div style={{ fontSize: "24px", color: "white" }}>{title}</div>
            <div style={{ fontSize: "16px", color: "#7D4CDB" }}>{subtitle}</div>
          </div>
        </a>
      </div>
    </>
  );
};

export default () => (
  <Provider store={store}>
    <MeetingBadge />
  </Provider>
);
