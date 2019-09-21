import React from "dom-chef";
import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import * as when from "../when";
import { FeatureDetails } from "../features";
import * as selectors from "../selectors";
import "./show-board-estimation.css";

interface EffortProps {
  estimate: number;
}

const Effort = (props: EffortProps) => (
  <div className="rl__effort__container">
    <div className="rl__effort__outline">
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
  </div>
) as unknown as HTMLDivElement;

const attachEffort = (issueEls: Element[]) => {
  issueEls.forEach((issueEl: Element) => {
    pipe(
      Option.fromNullable(issueEl.childNodes[1]),
      Option.chain(children => Option.fromNullable(children.childNodes[1])),
      Option.chain(children => Option.fromNullable(children.childNodes[0])),
      Option.map(el => {
        const effort = Effort({ estimate: 2 });
        el.after(effort);
      })
    );
  });
};

const doShowBoardEstimation = async () => {
  console.log("doShowBoardEstimation");
  const issueEls = Array.from(document.querySelectorAll(selectors.CARD));
  attachEffort(issueEls);
};
const undo = constant(Promise.resolve());
const include = [constTrue];
const exclude = [constFalse];

const showBoardEstimation: FeatureDetails = {
  id: "show-board-estimation",
  when: when.locationChanges,
  do: doShowBoardEstimation,
  undo,
  include,
  exclude
};

export default showBoardEstimation;
