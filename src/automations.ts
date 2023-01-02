const getHashParam = (param: string) => {
  try {
    const hash = window.location.hash;
    const params = hash.split("#")[1];

    if (!hash) {
      console.log("PURPIE_MODULE_LOG", "no hash parameter preset at the URL");
      return;
    }
    if (!params) {
      console.log("PURPIE_MODULE_LOG", "can't get parameter list");
      return;
    }
    const urlSearch = new URLSearchParams(params);
    const result = urlSearch.get(param);
    return result;
  } catch (err) {
    console.log("PURPIE_MODULE_LOG", `can't get ${param} value`, err);
    return null;
  }
};

const setupAutoRecording = (store: any) => {
  let storeObserver: any;

  const tryGetConference = () => {
    try {
      return store.getState()["features/base/conference"].conference;
    } catch {
      return undefined;
    }
  };

  const handleAutoRecording = () => {
    console.log("PURPIE_MODULE_LOG", "handleAutoRecording fired");

    const conference = tryGetConference();
    if (conference) {
      console.log("PURPIE_MODULE_LOG", "got conference", {
        storeState: store.getState(),
        conference,
      });
      storeObserver();
      conference.startRecording({
        mode: "STREAM",
        streamId: conference.options.name,
      });
    }
  };

  console.log("PURPIE_MODULE_LOG", "started listening");

  storeObserver = store.subscribe(handleAutoRecording);
};

export const initAutomations = (store: any) => {
  console.log("PURPIE_MODULE_LOG", "automations initiated");
  if (getHashParam("autoRecording") === "true") {
    setupAutoRecording(store);
  }
};
