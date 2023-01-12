import React from "react";

const data = {
  zoneName: "Test Zone",
  channelName: "Test Channel",
  watermarkHref: "https://doganbros.com",
  watermarkAria: "Purpie Watermark, Link to the Purpie Test Zone",
  avatarBgColor: "#966AEA",
  avatarFgColor: "#99FF69",
};

const ChannelBadge = () => {
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
              {data.channelName}
            </div>
            <div style={{ fontSize: "16px", color: "#7D4CDB" }}>
              {data.zoneName}
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ChannelBadge;
