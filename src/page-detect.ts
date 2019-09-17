import userSettings from "./user-settings";
import { getActiveCycleNumber } from "./utils";

export const isIssueBoard = () => /\/board/.test(window.location.pathname);

export const isCycle = () => /\/cycle/.test(window.location.pathname);

export const isActiveCycle = () => {
  if (!isCycle()) {
    return false;
  }

  const cycleNumber = window.location.pathname.match(/\/cycle\/(\d+)/)![1];

  return cycleNumber === getActiveCycleNumber();
};

export const isBoard = () =>
  isIssueBoard() ||
  (isActiveCycle && Boolean(userSettings.get("showCyclePageBoard")));
