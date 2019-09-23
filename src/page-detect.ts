import { Lazy } from "fp-ts/lib/function";
import { queryByText } from "@testing-library/dom";

import * as selectors from "./selectors";

export const isIssueBoard: Lazy<Boolean> = () =>
  /\/board/.test(window.location.pathname);

export const isCycle: Lazy<Boolean> = () =>
  /\/cycle/.test(window.location.pathname);

export const isActiveCycle: Lazy<Boolean> = () =>
  isCycle() && Boolean(queryByText(document.body, /Active Cycle \d+/));

export const isBoard: Lazy<Boolean> = () =>
  isIssueBoard() ||
  Boolean(isActiveCycle && document.querySelector(selectors.CARD));
