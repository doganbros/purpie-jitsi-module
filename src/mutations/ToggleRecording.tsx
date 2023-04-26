import React, { useEffect } from "react";
import {
  jitsiStoreContext,
  moduleStoreContext,
  store as ModuleStore,
  useJitsiSelector,
} from "../store";
import { Provider } from "react-redux";

interface ToggleRecordingProps {
  el: HTMLElement;
  JitsiStore: any;
}

function ToggleRecording({ el }: Omit<ToggleRecordingProps, "JitsiStore">) {
  const sessionDatas = useJitsiSelector(
    (state: any) => state["features/recording"]?.sessionDatas
  );

  const sessionId = sessionDatas?.find(
    (v: any) =>
      v.mode?.toLowerCase() === "file" &&
      (v.status === "on" || v.status === "pending")
  )?.id;

  const isRecording = Boolean(sessionId);
  const isStreaming = Boolean(
    sessionDatas?.find(
      (v: any) =>
        v.mode?.toLowerCase() === "stream" &&
        (v.status === "on" || v.status === "pending")
    )?.id
  );

  const conference = useJitsiSelector(
    (state: any) => state["features/base/conference"].conference
  );

  useEffect(() => {
    const clickListener = () => {
      if (isRecording && conference.stopRecording) {
        conference.stopRecording(sessionId);
      }
      if (!isRecording && conference.startRecording)
        conference.startRecording({
          mode: "FILE",
        });
    };
    el.addEventListener("click", clickListener);
    return () => {
      el.removeEventListener("click", clickListener);
    };
  }, [isRecording]);

  useEffect(() => {
    const label = el.querySelector("span");
    if (label) {
      label.innerHTML = isRecording ? "Stop recording" : "Start recording";
    }
  }, [isRecording]);

  useEffect(() => {
    if (isStreaming) {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
    }
  }, [isStreaming]);

  return null;
}
export default ({ JitsiStore, ...props }: ToggleRecordingProps) => (
  <Provider store={ModuleStore} context={moduleStoreContext}>
    <Provider store={JitsiStore} context={jitsiStoreContext}>
      <ToggleRecording {...props} />
    </Provider>
  </Provider>
);
