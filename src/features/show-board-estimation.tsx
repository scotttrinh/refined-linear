import React from "dom-chef";
import { css } from "emotion";
import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import * as Option from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { FeatureDetails } from "../features";

const Effort = () => (
  <div
    className={css`
      display: flex;
      flex-grow: initial;
      flex-basis: initial;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      height: 22px;
      padding: 4px;
      border-radius: 4px;
      border: 1px solid rgb(48, 47, 55);
    `}
  >
    <div
      className={css`
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-right: 8px;
      `}
    >
      <svg
        className={css`
          width: 14px;
          height: 14px;
          margin-right: 6px;
          flex-shrink: 0;
          fill: rgb(150, 155, 160);
        `}
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
      <span
        className={css`
          font-style: normal;
          line-height: normal;
          font-weight: normal;
          color: rgb(150, 155, 160);
          font-size: 12px;
        `}
      >
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
      Option.map(el => el.after((Effort() as unknown) as Element))
    );
  });
};

const init = async () => {
  const issueEls = Array.from(
    document.querySelectorAll('a[data-react-beautiful-dnd-draggable="0"]')
  );
  attachEffort(issueEls);
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
