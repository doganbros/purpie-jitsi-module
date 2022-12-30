import { useEffect, useRef } from "react";

const useAutoRecording = (store: any) => {
  const recordingInitiated = useRef<boolean>(false);
  const storeObserver = useRef<any>();

  const tryGetRecordingManager = () => {
    try {
      return store.getState()["features/base/conference"].conference
        .recordingManager;
    } catch {
      return undefined;
    }
  };

  const handleAutoRecording = () => {
    const startRecording = tryGetRecordingManager();
    if (startRecording && !recordingInitiated.current) {
      console.log("PURPIE_MODULE_LOG", "got start recording", {
        storeState: store.getState(),
        startRecording,
      });
      recordingInitiated.current = true;
      storeObserver.current();
      console.log("PURPIE_MODULE_LOG", "unsubbed correctly", {
        storeObserverCurrent: storeObserver.current,
      });
    }
  };
  useEffect(() => {
    if (!recordingInitiated.current) {
      console.log("PURPIE_MODULE_LOG", "started listening");
      storeObserver.current = store.subscribe(handleAutoRecording);
      return () => {
        console.log("PURPIE_MODULE_LOG", "unsubbing on return");
        storeObserver.current();
      };
    }
  }, []);
};

export const useInitEffects = (store: any) => {
  console.log("PURPIE_MODULE_LOG", "useInitEffects initiated");
  useAutoRecording(store);
  return null;
};
