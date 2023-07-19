import {createElement, Fragment, ReactElement} from "react";
import ReactDOM from "react-dom";
import MeetingBadge from "./MeetingBadge";
import PurpieLogo from "./PurpieLogo";
import ToggleRecording from "./ToggleRecording";
import ToggleStreaming from "./ToggleStreaming";
import Initializations from "./Initializations";

export interface Mutation {
  selector: string;
  mountCallback?: (record: Element[]) => void;
  unmountCallback?: (record: Element[]) => void;
}

interface UseMutationsProps {
  store: any;
}

function replaceNodeWithReactComponent(
  element: HTMLElement,
  reactComponent: ReactElement<any, any>
) {
  const parent = document.createElement("div");
  ReactDOM.render(reactComponent, parent, () => {
    element.replaceWith(...Array.from(parent.childNodes));
  });
}

export const useMutations = ({ store }: UseMutationsProps): Mutation[] => {
  return [
    {
      selector: "#videospace a.leftwatermark",
      mountCallback: (e) => {
        replaceNodeWithReactComponent(
          e[0] as HTMLElement,
          createElement(MeetingBadge)
        );
      },
    },
    {
      selector: "#videospace",
      mountCallback: (e) => {
        const container = document.createElement("div");
        e[0].appendChild(container);
        replaceNodeWithReactComponent(
            container,
            createElement(
                Fragment,
                {},
                createElement(PurpieLogo),
                createElement(Initializations,  {JitsiStore: store})
            )
        );
      },
    },
    {
      selector:
        '[aria-label="More actions menu"] [aria-label="Toggle recording"]',
      mountCallback: (e) => {
        const el = e[0] as HTMLElement;
        const copy = el.cloneNode(true) as HTMLElement;
        copy.ariaLabel = "Toggle meeting recording";
        el.parentNode?.replaceChild(copy, el);
        const container = document.createElement("div");
        el.parentNode?.appendChild(container);
        replaceNodeWithReactComponent(
          container,
          createElement(ToggleRecording, { el: copy, JitsiStore: store })
        );
      },
    },
    {
      selector: '[aria-label="More actions menu"] [aria-label="Live Stream"]',
      mountCallback: (e) => {
        const el = e[0] as HTMLElement;
        const copy = el.cloneNode(true) as HTMLElement;
        copy.ariaLabel = "Live Stream Meeting";
        el.parentNode?.replaceChild(copy, el);
        const container = document.createElement("div");
        el.parentNode?.appendChild(container);
        replaceNodeWithReactComponent(
          container,
          createElement(ToggleStreaming, { el: copy, JitsiStore: store })
        );
      },
    },
  ];
};
