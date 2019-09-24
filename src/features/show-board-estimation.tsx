import * as t from "io-ts";
import React from "dom-chef";
import { constant, constTrue, constFalse } from "fp-ts/lib/function";
import { Either, map as mapEither } from "fp-ts/lib/Either";
import * as Option from "fp-ts/lib/Option";
import * as Arr from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/pipeable";

import * as when from "../when";
import { FeatureDetails } from "../features";
import * as selectors from "../selectors";
import { query } from "../api";
import "./show-board-estimation.css";

const nullableNumberToEstimate = new t.Type(
  'nullableNumberToEstimate',
  (input: unknown): input is number => typeof input === 'number',
  (input, context) => typeof input === 'number' ? t.success(input) : input === null ? t.success(0) : t.failure(input, context),
  (input: number) => input === 0 ? null : input
);

const issueEstimate = t.type({
  id: t.string,
  number: t.number,
  estimate: nullableNumberToEstimate
});

type IssueEstimate = t.TypeOf<typeof issueEstimate>;

interface EffortProps {
  estimate: number;
}

const Effort = (props: EffortProps) =>
  ((
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
  ) as unknown) as HTMLDivElement;

const getEstimates = async (): Promise<Either<t.Errors, IssueEstimate[]>> => {
  try {
    const response = await query(`
issues {
  id,
  number,
  estimate
}
    `);

    return t.array(issueEstimate).decode(response.team.issues)
  } catch (e) {
    console.log(e)
    throw e;
  }
};

const attachEffort = (maybeEstimates: Either<t.Errors, IssueEstimate[]>) => (
  issueEl: Element
) => {
  console.log(maybeEstimates)
  pipe(
    maybeEstimates,
    mapEither(estimates => {
      pipe(
        Option.fromNullable(issueEl.childNodes[1]),
        Option.chain(children => Option.fromNullable(children.childNodes[1])),
        Option.chain(children => Option.fromNullable(children.childNodes[0])),
        Option.map(el => {
          pipe(
            Option.fromNullable(issueEl.getAttribute("href")),
            Option.chain(href => Option.fromNullable(href.match(/\d+$/))),
            Option.chain(Arr.head),
            Option.map(Number),
            Option.chain(issueNumber =>
              Option.fromNullable(estimates.find(e => e.number === issueNumber))
            ),
            Option.map(({ estimate }) => {
              const effort = Effort({ estimate });
              el.after(effort);
            })
          );
        })
      );
    })
  );
};

const doShowBoardEstimation = async () => {
  const issueEls = Array.from(document.querySelectorAll(selectors.CARD));
  console.log('doShowBoardEstimation', issueEls)
  const estimates = await getEstimates();
  pipe(
    issueEls,
    Arr.map(attachEffort(estimates))
  );
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
