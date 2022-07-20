import React, { FC, useEffect, useState } from "react";
import { Mutation, useMutations } from "./mutations";

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
  { selector, mountCallback, unmountCallback }: Mutation
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
  const mutationList = useMutations(storeState);
  useEffect(() => {
    const domObserver = new MutationObserver((mr) => {
      mutationList.forEach((mutation) => {
        filterRecord(mr, mutation);
      });
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

  return null;
};

export default OctopusJitsiModule;
