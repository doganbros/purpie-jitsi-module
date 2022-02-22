import React, { FC, useEffect, useState } from "react";

/*
  This function is used instead of querySelectorAll because
  node.querySelectorAll('.some-class') will not include parent node even if it
  matches the condition. Also node might not be a type of element, which won't
  have querySelectorAll method
*/
const nodeListSelector = (nl: NodeList, selector: string): Element[] => {
  const elementList: Element[] = [];
  nl.forEach((n) => {
    if (n.nodeType === Node.ELEMENT_NODE) {
      // TypeScript doesn't infer node type correctly after check
      const el = n as Element;
      if (el.matches(selector)) {
        elementList.push(el);
      }
      elementList.push.apply(
        elementList,
        Array.from(el.querySelectorAll(selector))
      );
    }
  });
  return elementList;
};

const filterRecord = (
  mr: MutationRecord[],
  selector: string,
  mountCallback?: (record: Element[]) => void,
  unmountCallback?: (record: Element[]) => void
) => {
  if (mountCallback) {
    mr.forEach((m) => {
      const el = nodeListSelector(m.addedNodes, selector);
      if (el.length > 0) {
        mountCallback(el);
      }
    });
  }
  if (unmountCallback) {
    mr.forEach((m) => {
      const el = nodeListSelector(m.removedNodes, selector);
      if (el.length > 0) {
        unmountCallback(el);
      }
    });
  }
};

const OctopusJitsiModule: FC<{ store: any }> = ({ store }) => {
  const [storeState, setStoreState] = useState<any>(store.getState());
  const [counter, setCounter] = useState(0);
  const [profileInputVisible, setProfileInputVisible] = useState(false);
  useEffect(() => {
    const domObserver = new MutationObserver((mr) => {
      // Dummy mutation observer actions
      filterRecord(
        mr,
        "#setDisplayName",
        (e) => {
          setProfileInputVisible(true);
          (e[0] as HTMLElement).style.padding = "20px";
        },
        () => {
          setProfileInputVisible(false);
        }
      );
      filterRecord(mr, ".mock-atlaskit-label", (el) => {
        el.forEach((e) => {
          (e as HTMLElement).style.background = "blue";
          e.addEventListener("click", function () {
            alert("Clicked on text on Settings Modal");
          });
        });
      });
      setCounter((prev) => prev + 1);
    });
    domObserver.observe(document.body, {
      subtree: true,
      childList: true,
    });
    const storeObserver = store.subscribe(() =>
      setStoreState(store.getState())
    );
    return () => {
      domObserver.disconnect();
      storeObserver();
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        backgroundColor: "#00000088",
        padding: "20px",
        color: "white",
        zIndex: "1000",
      }}
    >
      <div>
        <pre>
          {JSON.stringify(
            {
              "Mutation Count": counter,
              "Profile Input Visible?": profileInputVisible,
              "In meeting?": storeState["features/base/conference"].room
                ? "yes"
                : "no",
              "Setting - Hide self?":
                storeState["features/base/settings"].disableSelfView,
              ...(storeState["features/base/conference"].room
                ? { "Room name": storeState["features/base/conference"].room }
                : {}),
              ...(() => {
                const participants =
                  storeState["features/base/conference"].conference
                    ?.participants;
                const participantList = participants
                  ? Object.keys(participants).map((k) => {
                      return {
                        name: participants[k]._displayName,
                        id: participants[k]._id,
                        jid: participants[k]._jid,
                        role: participants[k]._role,
                      };
                    })
                  : null;
                return participantList
                  ? { "Participant list": participantList }
                  : {};
              })(),
            },
            null,
            2
          )}
        </pre>
      </div>
      <div>
        <button
          onClick={() => {
            store.dispatch({
              type: "SETTINGS_UPDATED",
              settings: {
                disableSelfView:
                  !storeState["features/base/settings"].disableSelfView,
              },
            });
          }}
        >
          Toggle self view
        </button>
      </div>
    </div>
  );
};

export default OctopusJitsiModule;
