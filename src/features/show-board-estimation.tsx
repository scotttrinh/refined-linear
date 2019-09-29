import { constant, constFalse, Lazy } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import { getLastSemigroup } from "fp-ts/lib/Semigroup";

import * as when from "../when";
import { FeatureDetails } from "../features";
import * as selectors from "../selectors";
import { select, selectAll } from "../utils";
import { isBoard } from "../page-detect";
import {
  IssueEstimate,
  getAll as getAllEstimates
} from "../queries/issue-estimate";
import * as getIssueNumber from "../utils/get-issue-number";
import { Effort } from "../components/Effort";

import "./show-board-estimation.css";

const groupIssueEstimatesBy = R.fromFoldableMap(
  getLastSemigroup<IssueEstimate>(),
  A.array
);

const attachEffort = (estimatesByNumber: Record<string, IssueEstimate>) => (
  issueEl: Element
) => {
  pipe(
    select("div:nth-child(2) > div:nth-child(2) > div:nth-child(1)", issueEl),
    O.map(firstEl => {
      const estimateForThisIssue = pipe(
        issueEl,
        getIssueNumber.fromCard,
        O.chain(issueNumber => R.lookup(String(issueNumber), estimatesByNumber))
      );

      pipe(
        estimateForThisIssue,
        O.map(({ estimate }) => {
          const maybeRenderEstimate = pipe(
            select("rl__effort__number", firstEl),
            O.fold(
              () => O.some(estimate), // No existing estimate element
              effortNumberEl =>
                effortNumberEl.textContent !== String(estimate)
                  ? O.some(estimate) // Estimate has changed
                  : O.none // Estimate exists and is unchanged
            )
          );

          pipe(
            maybeRenderEstimate,
            O.map(estimate => {
              const effort = Effort({ estimate });
              firstEl.replaceWith(effort);
            })
          );
        })
      );
    })
  );
};

const doShowBoardEstimation = async () => {
  const issueEls = selectAll(selectors.CARD);
  if (issueEls.length === 0) {
    return;
  }

  const maybeEstimates = await getAllEstimates();

  pipe(
    maybeEstimates,
    E.map(estimates => {
      const estimatesByNumber = groupIssueEstimatesBy(estimates, e => [
        String(e.number),
        e
      ]);
      pipe(
        issueEls,
        A.map(attachEffort(estimatesByNumber))
      );
    })
  );
};
const undo = constant(Promise.resolve());
const include = [isBoard];
const exclude = [constFalse];
const doWhen = (callback: Lazy<Promise<void>>): void => {
  when.boardUpdates(callback);
  when.locationChanges(callback);
};

const showBoardEstimation: FeatureDetails = {
  id: "show-board-estimation",
  when: doWhen,
  do: doShowBoardEstimation,
  undo,
  include,
  exclude
};

export default showBoardEstimation;
