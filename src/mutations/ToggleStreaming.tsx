import React, { useEffect } from "react";
import {
  jitsiStoreContext,
  moduleStoreContext,
  store as ModuleStore,
  useJitsiSelector,
  useModuleSelector,
  RootState,
} from "../store";
import { Provider } from "react-redux";

interface ToggleStreamingProps {
  el: HTMLElement;
  JitsiStore: any;
}

function ToggleStreaming({ el }: Omit<ToggleStreamingProps, "JitsiStore">) {
  const { meetingInfo } = useModuleSelector(
    (state: RootState) => state.meeting
  );

  const sessionDatas = useJitsiSelector(
    (state: any) => state["features/recording"]?.sessionDatas
  );

  const sessionId = sessionDatas?.find(
    (v: any) =>
      v.mode?.toLowerCase() === "stream" &&
      (v.status === "on" || v.status === "pending")
  )?.id;

  const isStreaming = Boolean(sessionId);
  const isRecording = Boolean(
    sessionDatas?.find(
      (v: any) =>
        v.mode?.toLowerCase() === "file" &&
        (v.status === "on" || v.status === "pending")
    )?.id
  );

  const conference = useJitsiSelector(
    (state: any) => state["features/base/conference"].conference
  );

  useEffect(() => {
    const clickListener = () => {
      if (isStreaming && conference.stopRecording) {
        conference.stopRecording(sessionId);
      }

      let uid = null;

      if (meetingInfo && "user" in meetingInfo) {
        uid = meetingInfo.user.id;
      }
      if (!isStreaming && conference.startRecording)
        conference.startRecording({
          mode: "STREAM",
          streamId: `rtmp://ingress.purpie.io/live/${conference.options.name}?uid=${uid}`,
        });
    };
    el.addEventListener("click", clickListener);
    return () => {
      el.removeEventListener("click", clickListener);
    };
  }, [isStreaming]);

  useEffect(() => {
    const label = el.querySelector("span");
    if (label) {
      label.innerHTML = isStreaming ? "Stop streaming" : "Start streaming";
    }
  }, [isStreaming]);

  useEffect(() => {
    if (isRecording) {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
    }
  }, [isRecording]);

  return null;
}
export default ({ JitsiStore, ...props }: ToggleStreamingProps) => (
  <Provider store={ModuleStore} context={moduleStoreContext}>
    <Provider store={JitsiStore} context={jitsiStoreContext}>
      <ToggleStreaming {...props} />
    </Provider>
  </Provider>
);
