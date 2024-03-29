import { store } from "./store";
// TODO Move these to Initializations component
const getHashParam = (param: string) => {
  try {
    const hash = window.location.hash;
    const params = hash.split("#")[1];

    if (!hash || !params) {
      return;
    }

    const urlSearch = new URLSearchParams(params);
    const result = urlSearch.get(param);
    return result;
  } catch (err) {
    console.error("PURPIE_MODULE_ERROR", `can't get ${param} value`, err);
    return null;
  }
};

const setupAutoRecording = (JitsiStore: any, mode: "file" | "stream") => {
  let storeObserver: any;

  const tryGetConference = () => {
    try {
      return JitsiStore.getState()["features/base/conference"].conference;
    } catch {
      return undefined;
    }
  };

  const handleAutoRecording = () => {
    const conference = tryGetConference();
    if (conference) {
      // Unsubscribe
      storeObserver();
      if (mode === "file") {
        conference.startRecording({
          mode: "FILE",
        });
      } else if (mode === "stream") {
        // TODO pass purpie user id as uid
        const uid = null;
        conference.startRecording({
          mode: "STREAM",
          streamId: `rtmp://ingress.purpie.io/live/${conference.options.name}?uid=${uid}`,
        });
      }
    }
  };

  storeObserver = JitsiStore.subscribe(handleAutoRecording);
};

export const initAutomations = (JitsiStore: any) => {
  if (getHashParam("autoRecording") === "true") {
    setupAutoRecording(JitsiStore, "file");
  }
  if (getHashParam("autoStreaming") === "true") {
    setupAutoRecording(JitsiStore, "stream");
  }
};
