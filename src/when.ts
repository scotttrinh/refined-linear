import { Lazy } from "fp-ts/lib/function";
import elementReady from "element-ready";

import * as selectors from "./selectors";

type CallbackFunction = Lazy<Promise<void>>;

export const domIsReady = async (callback: CallbackFunction): Promise<void> => {
  const hasLoaded = () =>
    document.readyState === "interactive" || document.readyState === "complete";

  if (hasLoaded()) {
    return callback();
  }

  return new Promise(resolve => {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        resolve(callback());
      },
      {
        capture: true,
        once: true,
        passive: true
      }
    );
  });
};

export const locationChanges = (callback: CallbackFunction): void => {
  callback();
  elementReady(selectors.RIGHT_PANE).then((rightPane?: Element) => {
    if (!rightPane) {
      return;
    }
    let previousLocation = window.location.href;

    const observer = new MutationObserver(() => {
      const newLocation = window.location.href;
      if (previousLocation === newLocation) {
        return;
      }

      previousLocation = newLocation;
      callback();
    });

    observer.observe(rightPane, { childList: true, subtree: true });
  });
};

function nodeIsElement(candidate: Node): candidate is Element {
  return candidate.nodeType === 1;
}

function didAddCard(mutations: MutationRecord[]): boolean {
  return mutations.some(
    mutation => {
      for (const [, added] of mutation.addedNodes.entries()) {
        if (nodeIsElement(added) && added.matches(selectors.CARD)) {
          return true;
        }
      }

      return false;
    }
  );
}

export const boardUpdates = (callback: CallbackFunction): void => {
  callback();
  elementReady(selectors.RIGHT_PANE).then((rightPane?: Element) => {
    if (!rightPane) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      console.log(mutations);
      if (didAddCard(mutations)) {
        callback();
      }
    });

    observer.observe(rightPane, { childList: true, subtree: true });
  });
}
