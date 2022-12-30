const setupAutoRecording = (store: any) => {
  let storeObserver: any;

  const tryGetRecordingManager = () => {
    try {
      return store.getState()["features/base/conference"].conference
        .recordingManager;
    } catch {
      return undefined;
    }
  };

  const handleAutoRecording = () => {
    console.log("PURPIE_MODULE_LOG", "handleAutoRecording fired");

    const recordingManager = tryGetRecordingManager();
    if (recordingManager) {
      console.log("PURPIE_MODULE_LOG", "got recording manager", {
        storeState: store.getState(),
        recordingManager: recordingManager,
      });
      storeObserver();
      console.log("PURPIE_MODULE_LOG", "unsubbed correctly", {
        storeObserverCurrent: storeObserver.current,
      });
    }
  };

  console.log("PURPIE_MODULE_LOG", "started listening");

  storeObserver = store.subscribe(handleAutoRecording);
};

export const setupStoreListeners = (store: any) => {
  console.log("PURPIE_MODULE_LOG", "setupListeners initiated");
  setupAutoRecording(store);
};
