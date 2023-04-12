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
  const sessionId = useJitsiSelector(
    (state: any) =>
      state["features/recording"]?.sessionDatas?.find(
        (v: any) => v.mode?.toLowerCase() === "file"
      )?.id
  );
  const isRecording = Boolean(sessionId);

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

  return null;
}
export default ({ JitsiStore, ...props }: ToggleRecordingProps) => (
  <Provider store={ModuleStore} context={moduleStoreContext}>
    <Provider store={JitsiStore} context={jitsiStoreContext}>
      <ToggleRecording {...props} />
    </Provider>
  </Provider>
);
