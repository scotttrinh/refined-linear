import React from "dom-chef";
import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import * as Option from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { FeatureDetails } from "../features";

const Effort = () => (
  <div className="sc-bdVaJa sc-fHSTwm kTUyxO">
    <div className="sc-ebFjAB hQQhjm sc-esjQYD jyJHGQ sc-dqBHgY fJUoRH">
      <svg
        className="sc-jKVCRD bSRhFK"
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
      <span className="sc-bwzfXH sMVgl">2</span>
    </div>
  </div>
);

const updateIssue = (...args: any[]) => {
  console.log(args);
};

const observer = new MutationObserver(updateIssue);

const init = async () => {
  console.log("show-board-estimation");
  const boardEl = document.querySelector(".sc-hlILIN.hZbfKV");
  if (boardEl) {
    observer.observe(boardEl, { childList: true, subtree: true });
    const issueEls = Array.from(
      boardEl.querySelectorAll('a[data-react-beautiful-dnd-draggable="0"]')
    );
    for (const issueEl of issueEls) {
      pipe(
        Option.fromNullable(issueEl.querySelector(".sc-hdPSEv")),
        Option.map((el) => el.after(Effort() as unknown as Element))
      );
    }
  }
};
const deinit = constant(Promise.resolve());
const include = [constTrue];
const exclude = [constFalse];

const showBoardEstimation: FeatureDetails = {
  init,
  deinit,
  include,
  exclude
};

export default showBoardEstimation;
