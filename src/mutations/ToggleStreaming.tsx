import React, { useEffect } from "react";
import { RootState, store } from "../store";
import { Provider, useSelector } from "react-redux";

interface ToggleStreamingProps {
  el: HTMLElement;
}

function ToggleStreaming({ el }: ToggleStreamingProps) {
  const { isStreaming } = useSelector((state: RootState) => state.meeting);

  useEffect(() => {
    const clickListener = () => {
      alert(isStreaming ? "It is Streaming" : "Not Streaming");
    };
    el.addEventListener("click", clickListener);
    return () => {
      el.removeEventListener("click", clickListener);
    };
  }, [isStreaming]);

  useEffect(() => {
    const label = el.querySelector("span");
    if (label) {
      label.innerHTML = isStreaming ? "Stop Streaming" : "Start Streaming";
    }
  }, [isStreaming]);

  return null;
}

export default (props: ToggleStreamingProps) => (
  <Provider store={store}>
    <ToggleStreaming {...props} />
  </Provider>
);
