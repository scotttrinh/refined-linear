import React from "dom-chef";
import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";

import * as when from "../when";
import { FeatureDetails } from "../features";
import * as selectors from "../selectors";
import './show-board-estimation.css';

const Effort = () => (
  <div className='rl__effort__container'>
    <div className='rl__effort__outline'>
      <svg
        className='rl__effort__icon'
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 0C3.13401 1.68988e-07 0 3.13401 0 7C1.68988e-07 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C13.9956 3.13587 10.8641 0.00455 7 0ZM7 12.8333C3.77834 12.8333 1.16667 10.2217 1.16667 7C1.16667 3.77834 3.77834 1.16667 7 1.16667C10.2217 1.16667 12.8333 3.77834 12.8333 7C12.8298 10.2202 10.2202 12.8298 7 12.8333Z"
          fill="#BEC2C8"
        ></path>
        <path
          d="M9.99483 9.22252L7.29167 6.74394V3.79169C7.29167 3.46952 7.0305 3.20835 6.70833 3.20835C6.38617 3.20835 6.125 3.46952 6.125 3.79169V7.00002C6.12482 7.16368 6.1934 7.31989 6.314 7.43052L9.20675 10.0818C9.44534 10.2964 9.81179 10.2805 10.031 10.0462C10.2483 9.80868 10.2321 9.44007 9.99483 9.22252Z"
          fill="#BEC2C8"
        ></path>
      </svg>
      <span className='rl__effort__number'>
        2
      </span>
    </div>
  </div>
);

const attachEffort = (issueEls: Element[]) => {
  issueEls.forEach((issueEl: Element) => {
    pipe(
      Option.fromNullable(issueEl.childNodes[1]),
      Option.chain(children => Option.fromNullable(children.childNodes[1])),
      Option.chain(children => Option.fromNullable(children.childNodes[0])),
      Option.map(el => {
        const effort = Effort();
        el.after((effort as unknown) as Element)
      })
    );
  });
};

const doShowBoardEstimation = async () => {
  console.log("doShowBoardEstimation");
  const issueEls = Array.from(
    document.querySelectorAll(selectors.CARD)
  );
  attachEffort(issueEls);
};
const undo = constant(Promise.resolve());
const include = [constTrue];
const exclude = [constFalse];

const showBoardEstimation: FeatureDetails = {
  id: 'show-board-estimation',
  when: when.locationChanges,
  do: doShowBoardEstimation,
  undo,
  include,
  exclude
};

export default showBoardEstimation;
