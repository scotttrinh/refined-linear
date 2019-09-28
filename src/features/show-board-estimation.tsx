import React from "dom-chef";
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
import "./show-board-estimation.css";
import { isBoard } from "../page-detect";
import {
  IssueEstimate,
  getAll as getAllEstimates
} from "../queries/issue-estimate";
import * as getIssueNumber from "../utils/get-issue-number";

const groupIssueEstimatesBy = R.fromFoldableMap(
  getLastSemigroup<IssueEstimate>(),
  A.array
);

interface EffortProps {
  estimate: number;
}

const Effort = (props: EffortProps) =>
  ((
    <div className="rl__effort__container">
      <svg
        className="rl__effort__icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7" r="6.5" stroke="#BEC2C8" fill="none" />
        <path
          d="M10 9.2L7.3 6.7v-3a.6.6 0 10-1.2 0V7c0 .2 0 .3.2.4l3 2.7a.6.6 0 00.7 0 .6.6 0 000-.9z"
          fill="#BEC2C8"
        />
      </svg>
      <span className="rl__effort__number">{props.estimate}</span>
    </div>
  ) as unknown) as HTMLDivElement;

const attachEffort = (estimatesByNumber: Record<string, IssueEstimate>) => (
  issueEl: Element
) => {
  pipe(
    O.fromNullable(
      issueEl.querySelector(
        "div:nth-child(2) > div:nth-child(2) > div:nth-child(1)"
      )
    ),
    O.map(overflowEl => {
      pipe(
        getIssueNumber.fromCard(issueEl),
        O.chain(issueNumber =>
          R.lookup(String(issueNumber), estimatesByNumber)
        ),
        O.map(({ estimate }) => {
          const effort = Effort({ estimate });
          overflowEl.replaceWith(effort);
        })
      );
    })
  );
};

const doShowBoardEstimation = async () => {
  const issueEls = Array.from(document.querySelectorAll(selectors.CARD));
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
