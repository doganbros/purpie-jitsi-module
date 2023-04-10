import React, { useEffect } from "react";
import { RootState, store } from "../store";
import { Provider, useSelector } from "react-redux";

interface ToggleRecordingProps {
  el: HTMLElement;
}

function ToggleRecording({ el }: ToggleRecordingProps) {
  const { isRecording } = useSelector((state: RootState) => state.meeting);

  useEffect(() => {
    const clickListener = () => {
      alert(isRecording ? "It is recording" : "Not recording");
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

export default (props: ToggleRecordingProps) => (
  <Provider store={store}>
    <ToggleRecording {...props} />
  </Provider>
);
