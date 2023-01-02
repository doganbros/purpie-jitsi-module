import React, { FC, useEffect } from "react";
import { initAutomations } from "./automations";
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

const PurpieJitsiModule: FC<{ store: any }> = ({ store }) => {
  const mutationList = useMutations(store);
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
    initAutomations(store);
    return () => {
      domObserver.disconnect();
    };
  }, []);

  return null;
};

export default PurpieJitsiModule;
