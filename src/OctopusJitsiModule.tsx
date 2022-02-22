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
  const [counter, setCounter] = useState(0);
  const [profileInputVisible, setProfileInputVisible] = useState(false);
  useEffect(() => {
    const domObserver = new MutationObserver((mr) => {
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

    return () => {
      domObserver.disconnect();
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
      <pre>
        {JSON.stringify(
          {
            "Mutation Count": counter,
            "Profile Input Visible?": profileInputVisible,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default OctopusJitsiModule;
