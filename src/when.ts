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
