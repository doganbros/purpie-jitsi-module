import {
  createElement,
  ReactElement,
} from "react";
import ReactDOM from "react-dom";
import MeetingBadge from "./MeetingBadge";
import PurpieLogo from "./PurpieLogo";

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
        var container = document.createElement("div")
        e[0].appendChild(container)
        replaceNodeWithReactComponent(
          container,
          createElement(PurpieLogo)
        );
      },
    },
  ];
};
